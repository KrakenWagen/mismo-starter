export type Note = { id: string; title: string; body: string };

export const notes: Note[] = [
  {
    id: "shared-screens",
    title: "One screen, every app",
    body: "This note and the list before it come from one file each, in packages/app/routes. Change one and every app updates.",
  },
  {
    id: "typed-links",
    title: "Links that can't break",
    body: "Links are checked against your routes. Misspell a path or forget a param, and the typecheck fails.",
  },
  {
    id: "your-router",
    title: "Each app keeps its router",
    body: "Expo Router runs on the phone. Next.js or TanStack Start runs on the web. They render the same screens.",
  },
];
