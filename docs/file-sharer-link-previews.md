# File sharer link previews

Share links of the form `https://<host>/share/<id>` show a preview in iMessage, Discord, Slack and similar apps. The preview image is a deliberately blurred, low-resolution thumbnail of the upload, so readable text or detail doesn't leak into a chat preview.

## How it works

1. A user uploads a file on `/file-sharer/`. The browser posts it straight to the private `dumbphoneapps-user-space` bucket with a presigned POST.
2. The page then calls `/one-offs/acknowledge-presigned-post-success`. That route (`acknowledge_presigned_post_success_route` in `lambda/dumbphoneapps-monolith/dumbphoneapps/one_offs.py`) calls `generate_thumbnail`, which:
   - downloads the upload to `/tmp`
   - runs ffmpeg to take the first frame, center-crop it to 1200:630, shrink it to 120x63 and blur it back up to a 1200x630 JPEG (about 50KB; JPEG suits blurred photos far better than PNG, which came out around 1MB)
   - writes the result to the public site bucket at `thumbs/<id>.jpg`
   - if anything fails, copies `defaults/not-available.jpg` there instead
3. Share links point at `/share/<id>`. A CloudFront Function (`cloudfront/functions/file-sharer.js`) answers those requests itself. It returns the file viewer page with `og:image` set to `https://<host>/thumbs/<id>.jpg`. Link-preview scrapers read those tags, and browsers load the file as usual.

Old `/fs/?id=<id>` links still work, but have no per-file preview.

## Prerequisites

This doc assumes the base app is already deployed:

- The `dumbphoneapps-prod` Lambda (Python 3.12, **arm64**) behind API Gateway.
- The private uploads bucket and the IAM user whose keys are in the Lambda's `PRESIGNED_AWS_ACCESS_KEY_ID` and `PRESIGNED_AWS_SECRET_ACCESS_KEY` env vars.
- The public site bucket, served by one CloudFront distribution per domain. Today those are `www.dumbphoneapps.com` and `dpa.elliscode.com`, which share one bucket.

S3 bucket names are global, so a new account usually needs different names. If yours differ, update these first:

| Where | What |
|---|---|
| `lambda/dumbphoneapps-monolith/dumbphoneapps/one_offs.py` | `USER_SPACE_BUCKET`, `PUBLIC_BUCKET` |
| `release.sh` | the `s3://...` sync target |
| the commands and policies below | every bucket name |

## 1. Not-available image

The repo includes `s3/defaults/not-available.jpg`, a 1200x630 JPEG (2400x1260 also works). `release.sh s` uploads it to `defaults/not-available.jpg` in the public bucket. It must be in the bucket before the first upload whose thumbnail fails.

## 2. ffmpeg Lambda layer

The Lambda has no image libraries, so a static ffmpeg binary is shipped as a layer. Layer contents are unpacked into `/opt`, so `bin/ffmpeg` in the zip ends up at `/opt/bin/ffmpeg`. That's the `FFMPEG_PATH` constant in `one_offs.py`.

Use the build that matches the Lambda's architecture: `arm64` here, or `amd64` for an x86_64 function.

```sh
cd ~/Downloads
curl -fLO https://johnvansickle.com/ffmpeg/releases/ffmpeg-release-arm64-static.tar.xz
tar xf ffmpeg-release-arm64-static.tar.xz
mkdir -p ffmpeg-layer/bin
cp ffmpeg-*-arm64-static/ffmpeg ffmpeg-layer/bin/
chmod 755 ffmpeg-layer/bin/ffmpeg
cd ffmpeg-layer && zip -r ../ffmpeg-layer.zip bin && cd ..
ls -la ffmpeg-layer.zip   # expect ~25MB; a few hundred bytes means the cp failed
```

The zip is over the console's 10MB direct-upload limit, so stage it in S3. Don't use the public site bucket for this, because `release.sh` deletes anything it doesn't know about there.

```sh
aws s3 cp ffmpeg-layer.zip s3://dumbphoneapps-user-space/layers/ffmpeg-layer.zip

aws lambda publish-layer-version --layer-name ffmpeg \
  --content S3Bucket=dumbphoneapps-user-space,S3Key=layers/ffmpeg-layer.zip \
  --compatible-runtimes python3.12 --compatible-architectures arm64 \
  --query LayerVersionArn --output text
```

Note the ARN this prints, e.g. `arn:aws:lambda:us-east-1:<ACCOUNT_ID>:layer:ffmpeg:1`. After that, `layers/ffmpeg-layer.zip` can be deleted, because the published layer keeps its own copy.

> These static builds can't resolve DNS hostnames, a side effect of statically linking glibc. That's why `generate_thumbnail` downloads the file with boto3 and passes ffmpeg a local path. Never give ffmpeg an S3 URL directly. If you do, it fails with `Failed to resolve hostname` and every thumbnail becomes the fallback image.

## 3. Lambda configuration

Attach the layer, and give ffmpeg enough time and CPU. Lambda CPU scales with memory. `--layers` replaces the whole list, so check for existing layers first and include them:

```sh
aws lambda get-function-configuration --function-name dumbphoneapps-prod \
  --query '{arch:Architectures, layers:Layers[].Arn}'

aws lambda update-function-configuration --function-name dumbphoneapps-prod \
  --layers arn:aws:lambda:us-east-1:<ACCOUNT_ID>:layer:ffmpeg:1 \
  --timeout 25 --memory-size 1024
```

Keep the timeout under 29 seconds, the API Gateway REST integration limit. Uploads are downloaded into `/tmp`, which is 512MB by default. Raise the function's ephemeral storage if you allow larger uploads.

## 4. IAM

**Lambda execution role.** Add this inline policy, for example named `file-sharer-thumbnails`. You can find the role name on the function's **Configuration → Permissions** tab.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "WriteFileSharerThumbnails",
      "Effect": "Allow",
      "Action": ["s3:PutObject", "s3:GetObject"],
      "Resource": "arn:aws:s3:::daniel-townsend-dumbphoneapps/thumbs/*"
    },
    {
      "Sid": "ReadThumbnailDefaults",
      "Effect": "Allow",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::daniel-townsend-dumbphoneapps/defaults/*"
    }
  ]
}
```

`copy_object` needs read access on the source and write access on the destination, which is why `defaults/*` is included.

**Presigned IAM user.** The thumbnail code downloads the upload with the presigned credentials, not the Lambda role. That user needs `s3:GetObject` on `arn:aws:s3:::dumbphoneapps-user-space/*`, which it already has if `/fs/` pages can load files.

## 5. Thumbnail expiry

Uploads expire after 7 days (`expiration_time` in the acknowledge route), so thumbnails should too. `put-bucket-lifecycle-configuration` **replaces** every rule on the bucket, so check for existing rules first:

```sh
aws s3api get-bucket-lifecycle-configuration --bucket daniel-townsend-dumbphoneapps
```

If that returns `NoSuchLifecycleConfiguration`:

```sh
aws s3api put-bucket-lifecycle-configuration --bucket daniel-townsend-dumbphoneapps \
  --lifecycle-configuration '{"Rules":[{"ID":"expire-file-sharer-thumbs","Status":"Enabled","Filter":{"Prefix":"thumbs/"},"Expiration":{"Days":7}}]}'
```

If the bucket already has rules, add this one to the existing `Rules` array and put the whole set back.

## 6. CloudFront Function

In **CloudFront → Functions → Create function**:

1. Name it `dumbphoneapps-share-page` and choose runtime **cloudfront-js-2.0**.
2. Paste in `cloudfront/functions/file-sharer.js` and **Save**.
3. On the **Test** tab, set the URL path to `/share/<a real upload id>`. Optionally add a header `host` = `www.dumbphoneapps.com`; without it the function falls back to `dpa.elliscode.com`. **Run test** should return a 200 with the `og:` tags in the body. A path like `/share/../x` should return 404.
4. **Publish**. Behaviors can only use the published version.

The function contains a copy of `s3/fs/index.html`. When you change one, update the other.

## 7. CloudFront behavior (each distribution)

On **every** distribution that serves the site, go to **Behaviors → Create behavior** and set:

| Setting | Value |
|---|---|
| Path pattern | `/share/*` |
| Origin | the same S3 origin as the Default behavior |
| Viewer protocol policy | Redirect HTTP to HTTPS |
| Allowed HTTP methods | GET, HEAD |
| Cache policy | CachingDisabled |
| Function associations | Viewer request → CloudFront Functions → `dumbphoneapps-share-page` |

Make sure `/share/*` sits above Default in precedence. The function builds its URLs from the Host header, so one function serves every domain. `/thumbs/*` and `/defaults/*` are served by the Default behavior and need no changes.

## 8. Deploy

```sh
sh release.sh ls
```

This uploads `defaults/not-available.jpg` and the file-sharer page, which now generates `/share/` links, and deploys the Lambda. The sync in `release.sh` excludes `thumbs/*`. Without that exclude, `--delete` would wipe every thumbnail on each release.

## 9. Verify

1. Upload a photo and a video on `/file-sharer/`.
2. In the `/aws/lambda/dumbphoneapps-prod` logs, look for `Created thumbnail thumbs/<id>.jpg`.
3. Open `https://<host>/thumbs/<id>.jpg`. It should be a blurred 1200x630 image.
4. Open `https://<host>/share/<id>`. The file should display, the same as on `/fs/?id=<id>`.
5. Paste the share link into iMessage or Discord, or into opengraph.xyz, and check the preview.
6. Run `sh release.sh s` again and confirm the thumbnail URL still loads.

Repeat steps 4 and 5 on each domain.

## Troubleshooting

| Symptom | Cause |
|---|---|
| The preview shows the not-available image | The fallback ran. Check the logs for `ffmpeg failed for <id>` (ffmpeg's error output is included) or `Could not download or run ffmpeg`. You can confirm a fallback by comparing ETags: `curl -sI https://<host>/thumbs/<id>.jpg` and `curl -sI https://<host>/defaults/not-available.jpg` will match. |
| `Failed to resolve hostname` in the ffmpeg error | ffmpeg was given a URL. See the DNS note in step 2. |
| `Could not download or run ffmpeg` | The layer is missing, the binary is at the wrong path (it must be `/opt/bin/ffmpeg`), or the build doesn't match the function's architecture. |
| The function test fails with `cannot get property "value" of undefined` | An older copy of the function that requires a Host header. Paste in the current file. |
| `/share/<id>` returns 404 | The ID doesn't match `^[A-Za-z0-9]{10}\.(jpg\|jpeg\|png\|gif\|3gp\|mp4\|mov)$`, or the `/share/*` behavior is missing on that distribution. |
| A preview still shows an old image | Chat apps cache previews per URL, and thumbnails are served as immutable. Test with a fresh upload. |

## Tuning the blur

`THUMBNAIL_FILTER` in `one_offs.py` controls how much survives. Large text can still be readable at 120x63. For less detail, either:

- shrink further, e.g. `scale=48:25:flags=area`
- append `,gblur=sigma=12` after the upscale

Changes only affect new uploads.

## Changing the thumbnail format

The CloudFront Function hardcodes the thumbnail path (`/thumbs/<id>.jpg`), and CloudFront Functions can't make network requests, so it can't check whether a file exists and fall back to another name. If you change the format or path, existing uploads' share pages will point at images that don't exist until you backfill them.

Thumbnails were originally PNGs, which came out at up to about 1MB each. The switch to JPEG went in this order:

1. Change the Lambda to write the new format, and add the matching `defaults/not-available.*` image.
2. Deploy with `sh release.sh ls`, upload a test file, and confirm the new file appears under `thumbs/`.
3. Run [scripts/backfill-thumbnails-png-to-jpg.sh](scripts/backfill-thumbnails-png-to-jpg.sh). For every `thumbs/<id>.png` it downloads the file, re-encodes it locally with ffmpeg and uploads `thumbs/<id>.jpg`. It needs a configured AWS CLI and a local ffmpeg. Run it with `bash`, not `zsh`. The old `.png` files are left in place, and the lifecycle rule removes them within 7 days.
4. Update the CloudFront Function's `imageUrl`, then save and publish it.

A fresh setup doesn't need the script, because thumbnails are JPEG from the start. Keep it as a template for any future format change: adjust the extensions and the ffmpeg flags.
