import type { Note } from "./store.ts";

const HOUR = 60 * 60 * 1000;

/** The notes a new user starts with. */
export function sampleNotes(now: number): Note[] {
  return [
    {
      id: "groceries",
      title: "Groceries",
      body: "Oat milk\nEggs\nCoffee, the good one\nLemons\nSomething for Friday's dinner",
      pinned: true,
      updatedAt: now - 2 * 60 * 1000,
    },
    {
      id: "lisbon",
      title: "Trip to Lisbon",
      body: "Book a table at the place near the river.\n\nTram 28 early, before the crowds. Pastéis de nata in Belém, obviously.\n\nAsk Sam about the viewpoint they liked.",
      pinned: false,
      updatedAt: now - 3 * HOUR,
    },
    {
      id: "books",
      title: "Books to read",
      body: "The Left Hand of Darkness\nPiranesi\nA Psalm for the Wild-Built\nThe Dispossessed",
      pinned: false,
      updatedAt: now - 30 * HOUR,
    },
    {
      id: "welcome",
      title: "This note runs everywhere",
      body: "The list and this editor are one file each in packages/app, used by every app.\n\nTry editing this note, then reload. Your changes are saved on this device.",
      pinned: false,
      updatedAt: now - 72 * HOUR,
    },
  ];
}
