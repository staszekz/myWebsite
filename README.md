# myWebsite

Personal portfolio website built with static HTML, SCSS, and TypeScript, with Firebase Hosting + Firestore + Cloud Functions for contact form processing.

## Stack

- Frontend: `public/index.html`, `main.ts`, `scss/*`
- Backend: Firebase Functions in `functions/src/index.ts`
- Email delivery: SendGrid dynamic templates

## Requirements

- Node.js 20+
- Firebase CLI

## Install

```bash
npm install
npm --prefix functions install
```

## Firebase Web SDK (hosting / `main.ts`)

Do not commit API keys. Root `.env` (gitignored) must define:

- `FIREBASE_WEB_API_KEY`
- `FIREBASE_WEB_AUTH_DOMAIN`
- `FIREBASE_WEB_PROJECT_ID`
- `FIREBASE_WEB_STORAGE_BUCKET`
- `FIREBASE_WEB_MESSAGING_SENDER_ID`
- `FIREBASE_WEB_APP_ID`
- `FIREBASE_WEB_MEASUREMENT_ID`

`npm run build` runs `scripts/write-firebase-web-config.cjs`, which writes `public/dist/firebase-config.js` (also gitignored). That file is loaded before `main.js` in `public/index.html`.

If a browser key was ever pushed to GitHub, rotate it in [Google Cloud Console](https://console.cloud.google.com/apis/credentials) and update `FIREBASE_WEB_API_KEY` locally; restrict the key by HTTP referrer to your hosting domain.

## Build and Verify

```bash
# Compile frontend TS + CSS assets
npm run build

# Full verification (typecheck, css build, functions lint/build)
npm run verify
```

After `npm run build`, HTML gets **cache-busting** query strings on `css/style.css` and `dist/main.js` (see `scripts/inject-asset-version.cjs`). Always run full `npm run build` before `firebase deploy --only hosting` so production pulls fresh CSS/JS.

## Cloud Functions configuration (new Firebase params/secrets)

Functions use Firebase params/secrets:

- secret: `SENDGRID_API_KEY`
- params: `SENDGRID_TEMPLATE_ID`, `SENDGRID_TEMPLATE_TO_SENDER`

Set the API key as a secret:

```bash
firebase functions:secrets:set SENDGRID_API_KEY
```

Put template IDs in `functions/.env` (not committed) for deploy analysis:

```env
SENDGRID_TEMPLATE_ID=...
SENDGRID_TEMPLATE_TO_SENDER=...
```

For local emulator/tests, use the same `functions/.env` file.

## Deploy

```bash
firebase deploy
```

## CI

GitHub Actions pipeline is available in `.github/workflows/ci.yml` and runs:

- root install (`npm ci`)
- `npm run verify`

## Astro decision gate

Use this gate before a rewrite:

- Choose **Astro migration** when:
  - you plan regular blog publishing,
  - you want content collections and cleaner page/component structure.
- Keep **incremental static architecture** when:
  - site is mostly portfolio with occasional updates,
  - you want lowest maintenance and fastest delivery.
