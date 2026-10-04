// CloudFront Function (viewer request, JS runtime 2.0) for the /share/* behavior.
//
// Serves https://<host>/share/<id> as the file viewer page with per-file Open
// Graph tags, so link previews show the blurred thumbnail at /thumbs/<id>.jpg.
//
// The page body below is a copy of s3/fs/index.html -- keep the two in sync.
// Differences: the og/twitter meta tags, and dataId is injected instead of
// being read from the ?id= query parameter. Template literals inside the page
// script are escaped as \${...} so they reach the browser untouched.

var ID_PATTERN = /^[A-Za-z0-9]{10}\.(jpg|jpeg|png|gif|3gp|mp4|mov)$/;
var VIDEO_EXTENSIONS = ["3gp", "mp4", "mov"];

function notFound() {
  return {
    statusCode: 404,
    statusDescription: "Not Found",
    headers: { "content-type": { value: "text/plain; charset=utf-8" } },
    body: "Not found",
  };
}

function handler(event) {
  var request = event.request;
  var id = request.uri.replace(/^\/share\//, "").replace(/\/$/, "");

  // The id is inlined into the HTML below, so only exact upload ids pass
  if (!ID_PATTERN.test(id)) {
    return notFound();
  }

  // Real viewer requests always have a host header, the console test event doesn't
  var host = request.headers.host ? request.headers.host.value : "dpa.elliscode.com";
  var extension = id.substring(id.lastIndexOf(".") + 1);
  var title = VIDEO_EXTENSIONS.includes(extension) ? "Shared video" : "Shared photo";
  var pageUrl = `https://${host}/share/${id}`;
  var imageUrl = `https://${host}/thumbs/${id}.jpg`;

  var body = `<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>File Sharer</title>
    <meta property="og:title" content="${title}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${pageUrl}" />
    <meta property="og:image" content="${imageUrl}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content="${imageUrl}" />
    <link rel="stylesheet" href="../css/stylesheet.css?v=027" />
    <link rel="stylesheet" href="../css/loader.css?v=027" />
    <link rel="icon" type="image/png" href="../img/share.favicon.png?v=027" />
    <style>
      .video {
        width: 100%;
      }
      .image {
        width: 100%;
      }
    </style>
  </head>

  <body>
    <div>
      <b><a href="../index.html">Home</a></b> &gt; <b><a href="../file-sharer/index.html">file-sharer</a></b> &gt; <b>file-viewer</b>
    </div>

    <div style="display: none" class="logout">
      <button onclick="logOut(event)">Log out</button>
    </div>

    <script src="../js/utils.js?v=027"></script>
    <script src="../js/env.js"></script>
    <script>
const dataId = "${id}";

function loadFile(id) {
  let url = API_DOMAIN + "/one-offs/generate-presigned-get";
  xmlHttp = new XMLHttpRequest();
  xmlHttp.open("POST", url, true); // false for synchronous request
  xmlHttp.withCredentials = true;
  xmlHttp.onload = handlePresignedUrl;
  xmlHttp.send(JSON.stringify({ id: id }));
}

function handlePresignedUrl(event) {
  let xmlHttp = event.target;
  let responseJson = JSON.parse(xmlHttp.responseText);

  const link = document.createElement("a");
  link.href = responseJson.download_url;
  link.download = true;
  link.innerText = "Download";
  document.body.appendChild(link);

  const hr = document.createElement("hr");
  document.body.appendChild(hr);

  if (
    dataId.endsWith("3gp") ||
    dataId.endsWith("mp4") ||
    dataId.endsWith("mov")
  ) {
    let type = undefined;
    if (dataId.endsWith("3gp")) {
      type = "3gpp";
    } else if (dataId.endsWith("mp4")) {
      type = "mp4";
    } else if (dataId.endsWith("mov")) {
      type = "quicktime";
    }
    let element = document.createElement("video");
    element.classList.add("video");
    element.controls = true;
    element.src = responseJson.url;
    element.type = \`video/\${type}\`;
    element.playsInline = true;
    element.muted = true;
    element.autoplay = true;
    element.style.display = 'none';
    element.oncanplay=function() {
      element.style.maxWidth = \`\${element.videoWidth}px\`;
      element.style.display = 'block';
    }
    document.body.appendChild(element);
  } else {
    let element = document.createElement("img");
    element.classList.add("image");
    element.src = responseJson.url;
    element.style.display = 'none';
    element.onload=function() {
      element.style.maxWidth = \`\${element.naturalWidth}px\`;
      element.style.display = 'block';
    }
    document.body.appendChild(element);
  }
}

loadFile(dataId);
    </script>
  </body>
</html>
`;

  return {
    statusCode: 200,
    statusDescription: "OK",
    headers: {
      "content-type": { value: "text/html; charset=utf-8" },
      "cache-control": { value: "public, max-age=300" },
    },
    body: body,
  };
}
