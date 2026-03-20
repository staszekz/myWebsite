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

## Build and Verify

```bash
# Compile frontend TS + CSS assets
npm run build

# Full verification (typecheck, css build, functions lint/build)
npm run verify
```

## Cloud Functions configuration (new Firebase params/secrets)

Functions use Firebase params/secrets:

- secret: `SENDGRID_API_KEY`
- params: `SENDGRID_TEMPLATE_ID`, `SENDGRID_TEMPLATE_TO_SENDER`

Set them before deploy:

```bash
firebase functions:secrets:set SENDGRID_API_KEY
firebase functions:params:set SENDGRID_TEMPLATE_ID
firebase functions:params:set SENDGRID_TEMPLATE_TO_SENDER
```

For local emulator/tests, keep matching values in `functions/.env`.

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
