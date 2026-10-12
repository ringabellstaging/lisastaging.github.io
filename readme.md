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

To judge browsing speed, use a production preview instead of development mode:

```sh
npm run build
npm start -- --port 3102
```

Then open `http://localhost:3102`. Rebuild after changing code. Development mode uses Turbopack but still compiles routes on demand; its first page visits can be much slower. Dev output (`next-app/.next-dev`) and production output (`next-app/.next`) are separate, so previewing a build does not overwrite the development server's files.

Vercel's Root Directory remains `next-app`. See [application and deployment instructions](next-app/README.md) for email setup, content editing and SEO configuration. The legacy Jekyll files at the repository root are retained for reference.
