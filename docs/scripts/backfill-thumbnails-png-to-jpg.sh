#!/bin/bash
# One-off migration: converts existing thumbs/*.png in the public bucket to thumbs/*.jpg
# Only needed when switching from PNG to JPEG thumbnails, not on a fresh setup.
# See docs/file-sharer-link-previews.md, "Changing the thumbnail format".
#
# Needs a configured AWS CLI and a local ffmpeg (e.g. brew install ffmpeg).
# Safe to rerun, it overwrites the .jpg files and leaves the .png files alone.
# Run with bash, not zsh: bash docs/scripts/backfill-thumbnails-png-to-jpg.sh
B=daniel-townsend-dumbphoneapps
mkdir -p /tmp/thumbs && cd /tmp/thumbs

keys=$(aws s3api list-objects-v2 --bucket $B --prefix thumbs/ \
  --query "Contents[?ends_with(Key, '.png')].Key" --output text)

if [ -z "$keys" ] || [ "$keys" = "None" ]; then
  echo "No .png thumbnails to convert"; exit 0
fi

for key in $keys; do
  name=$(basename "$key" .png)        # e.g. ANZbAkT98V.3gp
  aws s3 cp "s3://$B/$key" "$name.png" --only-show-errors
  ffmpeg -y -loglevel error -i "$name.png" -q:v 5 "$name.jpg"
  aws s3 cp "$name.jpg" "s3://$B/thumbs/$name.jpg" --only-show-errors \
    --content-type image/jpeg --cache-control "public, max-age=604800, immutable"
  echo "converted $key -> thumbs/$name.jpg ($(wc -c < "$name.jpg") bytes)"
done
