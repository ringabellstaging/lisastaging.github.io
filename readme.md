# Oaktime Staging

A home staging company serving Toronto and the GTA.

## Local development

The active website is in `next-app`. Run these commands from the repository root:

```sh
npm run setup
npm run dev
```

`npm run setup` installs the application's dependencies and is only needed on the first run or after dependency changes. Open the **Local** URL printed in the terminal; Next.js chooses another port if port 3000 is already in use. Stop the server with Ctrl+C.

Root commands forward to `next-app`. You can also run `npm run build`, `npm start`, `npm run lint`, and `npm test` here. Extra arguments are forwarded, for example `npm run dev -- --port 3100`.

Vercel's Root Directory remains `next-app`. See [application and deployment instructions](next-app/README.md) for email setup, content editing and SEO configuration. The legacy Jekyll files at the repository root are retained for reference.
