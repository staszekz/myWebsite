/**
 * Writes public/dist/firebase-config.js from .env / process.env so Web API keys
 * never live in tracked source or compiled main.js.
 */
const fs = require("fs");
const path = require("path");

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const raw = fs.readFileSync(filePath, "utf8");
  const out = {};
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    out[key] = val;
  }
  return out;
}

const root = path.join(__dirname, "..");
const distDir = path.join(root, "public", "dist");
const outFile = path.join(distDir, "firebase-config.js");

const fileEnv = loadEnvFile(path.join(root, ".env"));
const env = { ...fileEnv, ...process.env };

const keys = [
  "FIREBASE_WEB_API_KEY",
  "FIREBASE_WEB_AUTH_DOMAIN",
  "FIREBASE_WEB_PROJECT_ID",
  "FIREBASE_WEB_STORAGE_BUCKET",
  "FIREBASE_WEB_MESSAGING_SENDER_ID",
  "FIREBASE_WEB_APP_ID",
  "FIREBASE_WEB_MEASUREMENT_ID",
];

const missing = keys.filter((k) => !env[k] || String(env[k]).trim() === "");
if (missing.length) {
  console.error(
    "write-firebase-web-config: set these in .env (or env):",
    missing.join(", "),
  );
  process.exit(1);
}

const config = {
  apiKey: env.FIREBASE_WEB_API_KEY,
  authDomain: env.FIREBASE_WEB_AUTH_DOMAIN,
  projectId: env.FIREBASE_WEB_PROJECT_ID,
  storageBucket: env.FIREBASE_WEB_STORAGE_BUCKET,
  messagingSenderId: env.FIREBASE_WEB_MESSAGING_SENDER_ID,
  appId: env.FIREBASE_WEB_APP_ID,
  measurementId: env.FIREBASE_WEB_MEASUREMENT_ID,
};

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

const body = `window.__FIREBASE_WEB_CONFIG__ = ${JSON.stringify(config, null, 0)};\n`;
fs.writeFileSync(outFile, body, "utf8");
console.log("write-firebase-web-config: wrote", path.relative(root, outFile));
