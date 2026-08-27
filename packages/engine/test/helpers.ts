/** Shared fixtures + a seeded PRNG, so a failing property test fails the same way twice. */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import type { Document } from '../src/generated/ir.ts';

export const repoFile = (relative: string) => fileURLToPath(new URL(`../../../${relative}`, import.meta.url));

export function loadSite(name: string): Document {
  return JSON.parse(readFileSync(repoFile(`corpus/sites/${name}`), 'utf8')) as Document;
}

/** mulberry32 — small, deterministic, good enough to shuffle op sequences. */
export function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const pick = <T>(random: () => number, items: T[]): T =>
  items[Math.floor(random() * items.length) % items.length];
