/**
 * Stage D1 — tokens as first-class engine state.
 *
 * Tokens live in the IR (they have since B1), so a token edit is an op like any other: undoable,
 * multiplayer-safe, and visible in the same history as the layout change it was made for. This
 * module is the vocabulary the token panel speaks; resolution to concrete values is the compiler's
 * job, and `resolve` here exists only for the canvas's own overlays.
 */

import type { ColorToken, Document, SpaceToken, TypeToken } from './generated/ir.ts';
import type { Op, TokenGroup, TokenValue } from './ops.ts';

export interface TokenEntry {
  ref: string;
  group: TokenGroup;
  name: string;
  value: TokenValue;
}

export function listTokens(doc: Document, group: TokenGroup): TokenEntry[] {
  const entries = Object.entries((doc.tokens[group] ?? {}) as Record<string, TokenValue>);
  return entries
    .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
    .map(([name, value]) => ({ ref: `${group}.${name}`, group, name, value }));
}

export function setToken(group: TokenGroup, name: string, value: TokenValue): Op {
  return { kind: 'setToken', group, name, value };
}

export function removeToken(group: TokenGroup, name: string): Op {
  return { kind: 'setToken', group, name, value: null };
}

/** Nodes that reference a token — what the panel shows before letting anyone delete one. */
export function usages(doc: Document, ref: string): string[] {
  const out: string[] = [];
  for (const [id, node] of Object.entries(doc.nodes)) {
    const style = node.style;
    if (!style) continue;
    if ([style.bg, style.fg, style.pad, style.gap, style.radius, style.type, style.maxWidth].includes(ref))
      out.push(id);
  }
  return out.sort();
}

export function resolveColor(doc: Document, ref: string | undefined): string | undefined {
  return pick<ColorToken>(doc, 'color', ref)?.value;
}

export function resolveSpace(doc: Document, ref: string | undefined): number | undefined {
  return pick<SpaceToken>(doc, 'space', ref)?.px ?? pick<SpaceToken>(doc, 'radius', ref)?.px;
}

export function resolveType(doc: Document, ref: string | undefined): TypeToken | undefined {
  return pick<TypeToken>(doc, 'type', ref);
}

function pick<T extends TokenValue>(doc: Document, group: TokenGroup, ref: string | undefined): T | undefined {
  if (!ref) return undefined;
  const [prefix, name] = ref.split('.');
  if (prefix !== group || !name) return undefined;
  return (doc.tokens[group] as Record<string, T> | undefined)?.[name];
}

/** Design debt, as the panel counts it: every raw declaration that escaped the token system. */
export function designDebt(doc: Document): { node: string; property: string; value: string }[] {
  const out: { node: string; property: string; value: string }[] = [];
  for (const [id, node] of Object.entries(doc.nodes)) {
    for (const [property, value] of Object.entries(node.style?.escape ?? {})) {
      out.push({ node: id, property, value });
    }
  }
  return out.sort((a, b) => (a.node < b.node ? -1 : a.node > b.node ? 1 : a.property < b.property ? -1 : 1));
}
