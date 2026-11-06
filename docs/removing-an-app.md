# Keep only the apps you need

To remove an app:

1. Delete its folder in `apps/`.
2. Remove its script from the root `package.json`, and its filter from the `build` script.
3. In `packages/app/routes.config.ts`, remove it from `validFor`.
4. For Next.js or TanStack Start, also:
   - Remove its import from `routes.config.ts` and its `@mismo/*` dependency from `packages/app/package.json`.
   - In `packages/app/routes`, remove its page title option (`export const next` or `export const tanstack`) and the type import above it, from `index.tsx`, `settings.tsx` and `shortcuts.web.tsx`.

If you remove the native app, also:

- Delete the `*.native.*` files in `packages/app/routes` and `packages/app/src`.
- Delete `packages/app/tsconfig.native.json`, and its reference in `packages/app/tsconfig.json`.
- Remove the `native` entry from `types` in `routes.config.ts`.
- Remove `expo-router`, `react-native`, `react-native-safe-area-context` and `@react-native-async-storage/async-storage` from `packages/app/package.json`.

Keep `@mismo/expo` and `input: expo.input()` either way, because they read the routes folder's format.

Then run `pnpm install` and `pnpm typecheck`.
