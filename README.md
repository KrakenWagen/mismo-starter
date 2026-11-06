# mismo starter

Write your screens once, and run them in a native app and on the web. Each app keeps its own router, thanks to [mismo](https://mismo.dev).

The demo is a small notes app: a sidebar on wide screens, tabs and native screens on phones, and the same routes and editor everywhere.

```
apps
├── native                # Expo app
├── next                  # Next.js app
└── tanstack              # TanStack Start app
packages
└── app                   # Shared by every app: most of your work happens here
    ├── routes                # Your routes and screens
    ├── src                   # Shared UI and data
    └── routes.config.ts      # Which routers your routes run on
```

## What mismo gives you

- **One set of screens:** a file in `packages/app/routes` runs in every app.
- **Your choice of router:** Expo Router on native, and Next.js or TanStack Start on the web. mismo generates each app's route files for you.
- **Typed links:** misspell a route or forget a param, and `pnpm typecheck` fails.
- **Platform splits when you need them:** `settings.web.tsx` and `settings.native.tsx` are both `/settings`: one exports notes as a download, the other through the share sheet.

## Quick start

You need Node 22.18+ and pnpm 10+.

```sh
pnpm dlx degit KrakenWagen/mismo-starter my-app  # Copy the starter
cd my-app
pnpm install                                     # Install dependencies
pnpm dev                                         # Start every app
```

Your apps are now running:

- **Next.js:** http://localhost:3000
- **TanStack Start:** http://localhost:3001
- **Expo:** the bundler is on port 8081. To open the app on a phone or simulator, stop `pnpm dev` and run `pnpm native`, which needs the usual [Expo setup](https://docs.expo.dev/get-started/set-up-your-environment/).

## Make your first change

Open the note list, `packages/app/src/ui/NoteList.tsx`, and change its heading:

```diff
- <html.h1 style={styles.title}>Notes</html.h1>
+ <html.h1 style={styles.title}>My notes</html.h1>
```

All apps update, because they share this screen.

## Learn more

- [Keep only the apps you need](docs/removing-an-app.md)
- [mismo docs](https://mismo.dev)

## License

MIT
