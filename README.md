# mismo starter

[Website](https://mismo.dev) · [Docs](https://mismo.dev/docs/introduction) · [mismo on GitHub](https://github.com/KrakenWagen/mismo)

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
    ├── src
    │   ├── notes                 # The demo: delete it when you're ready
    │   └── ui                    # The app's frame and basics: keep these
    └── routes.config.ts      # Which routers your routes run on
```

## What mismo gives you

- **One set of screens:** a file in `packages/app/routes` runs in every app.
- **Your choice of router:** Expo Router on native, and Next.js or TanStack Start on the web. mismo generates each app's route files for you.
- **Typed links:** misspell a route or forget a param, and `pnpm typecheck` fails.
- **Tailwind everywhere:** `<html.div className="flex p-4">` from [`@mismo/ui`](https://www.npmjs.com/package/@mismo/ui), with nothing added to your web bundle.
- **Platform files when you need them:** `_layout.web.tsx` and `_layout.native.tsx` give each platform its own navigation, and `shortcuts.web.tsx` is a route only the web has. Most screens stay shared.

## Quick start

You need Node 22.18+ and pnpm 10+.

```sh
pnpm create mismo my-app  # Pick your apps
cd my-app
pnpm install              # Install dependencies
pnpm dev                  # Start every app
```

Your apps are now running:

- **Next.js:** http://localhost:3000
- **TanStack Start:** http://localhost:3001
- **Expo:** the bundler is on port 8081. To open the app on a phone or simulator, stop `pnpm dev` and run `pnpm native`, which needs the usual [Expo setup](https://docs.expo.dev/get-started/set-up-your-environment/).

## Make your first change

Open the note list, `packages/app/src/notes/components/NoteList.tsx`, and change its heading:

```diff
- <html.h1 style={styles.title}>Mismo Notes</html.h1>
+ <html.h1 style={styles.title}>My notes</html.h1>
```

All apps update, because they share this screen.

## Replace the demo

The demo lives in `packages/app/src/notes`, and nothing in `src/ui` depends on it. When you're ready to build your own app, in `packages/app`:

1. Delete `src/notes`, `routes/(app)/notes` and `routes/(app)/(tabs)/settings.tsx`.
2. Rewrite `routes/(app)/(tabs)/index.tsx` as your home screen.
3. In the `_layout` files in `routes/(app)`, remove what uses notes: the imports, `NotesProvider`, the hooks, the `sidebar` and `overlay` props, and the routes and links to the pages you deleted.
4. Change or delete `routes/(app)/(tabs)/shortcuts.web.tsx`, which lists the demo's shortcuts.

Then run `pnpm typecheck`, which points out anything you missed.

## Learn more

- [Keep only the apps you need](docs/removing-an-app.md)
- [mismo docs](https://mismo.dev/docs/introduction)
- [mismo on GitHub](https://github.com/KrakenWagen/mismo)

## License

MIT
