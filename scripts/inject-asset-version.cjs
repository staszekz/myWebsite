/**
 * Appends content hashes to static asset URLs in public HTML so Firebase/CDN
 * and browsers fetch fresh CSS/JS after each build.
 */
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const publicDir = path.join(__dirname, "..", "public");

function shortHash(filePath) {
  const buf = fs.readFileSync(filePath);
  return crypto.createHash("sha256").update(buf).digest("hex").slice(0, 12);
}

const cssPath = path.join(publicDir, "css", "style.css");
const jsPath = path.join(publicDir, "dist", "main.js");

if (!fs.existsSync(cssPath)) {
  console.error("inject-asset-version: missing", cssPath);
  process.exit(1);
}

const cssV = shortHash(cssPath);
const jsV = fs.existsSync(jsPath) ? shortHash(jsPath) : null;

function patchHtml(relativePath) {
  const fp = path.join(publicDir, relativePath);
  if (!fs.existsSync(fp)) {
    return;
  }
  let html = fs.readFileSync(fp, "utf8");

  html = html.replace(
    /href=(["'])css\/style\.css(?:\?[^"']*)?\1/g,
    `href=$1css/style.css?v=${cssV}$1`,
  );

  if (jsV) {
    html = html.replace(
      /src=\.\/dist\/main\.js(?:\?[^"'>\s]*)?/g,
      `src=./dist/main.js?v=${jsV}`,
    );
  }

  fs.writeFileSync(fp, html);
}

patchHtml("index.html");
patchHtml("blog.html");

console.log(
  `inject-asset-version: css?v=${cssV}${jsV ? ` main.js?v=${jsV}` : ""}`,
);
