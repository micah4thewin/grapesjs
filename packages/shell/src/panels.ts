/**
 * Stage D2 — property panels that cannot express an off-token value.
 *
 * The panels are derived from the IR schema and the document's own token set, not hand-written per
 * node type, so a schema change moves the panels with it. Every control produces an **op**; there
 * is no code path from a panel to a style string. That is the whole difference between this and a
 * style manager: not that raw CSS is discouraged, but that the panel has no way to say it.
 *
 * Raw values live behind `expertDrawer`, which writes `style.escape` — the counted exit hatch that
 * the design-debt panel reports on.
 */

import { tokens, type Document, type Node, type Op, type Style } from '@lattice/engine';

export interface TokenField {
  control: 'token';
  key: keyof Style;
  label: string;
  group: 'color' | 'space' | 'type' | 'radius';
  value?: string;
  options: { ref: string; label: string }[];
  toOp(ref: string | null): Op;
}

export interface ChoiceField {
  control: 'choice';
  key: string;
  label: string;
  value?: string | number;
  options: { value: string | number; label: string }[];
  toOp(value: string | number | null): Op;
}

export type Field = TokenField | ChoiceField;

export interface PanelSection {
  title: string;
  fields: Field[];
}

const LABELS: Partial<Record<keyof Style, string>> = {
  bg: 'Background',
  fg: 'Text colour',
  pad: 'Padding',
  gap: 'Gap',
  radius: 'Corner radius',
  type: 'Type role',
  maxWidth: 'Max width',
};

/** Which style fields each node kind exposes. A heading has no gap; a grid has no type role. */
const STYLE_FIELDS: Record<string, (keyof Style)[]> = {
  section: ['bg', 'fg', 'pad', 'maxWidth'],
  stack: ['bg', 'fg', 'pad', 'gap', 'radius'],
  grid: ['bg', 'pad', 'gap'],
  frame: ['bg', 'pad', 'radius'],
  list: ['gap'],
  text: ['fg', 'type'],
  heading: ['fg', 'type'],
  image: ['radius'],
  instance: [],
};

const GROUP_OF: Record<string, TokenField['group']> = {
  bg: 'color',
  fg: 'color',
  pad: 'space',
  gap: 'space',
  maxWidth: 'space',
  radius: 'radius',
  type: 'type',
};

function tokenField(doc: Document, node: Node, key: keyof Style): TokenField {
  const group = GROUP_OF[key];
  return {
    control: 'token',
    key,
    label: LABELS[key] ?? key,
    group,
    value: node.style?.[key] as string | undefined,
    options: tokens.listTokens(doc, group).map((entry) => ({ ref: entry.ref, label: entry.name })),
    // The only value this control can produce is one of the refs above, or nothing at all.
    toOp: (ref) => ({ kind: 'setStyle', id: node.id, key, value: ref }),
  };
}

/** The panel for one node: what this node type can be told, and nothing else. */
export function panelForNode(doc: Document, nodeId: string): PanelSection[] {
  const node = doc.nodes[nodeId];
  if (!node) return [];
  const sections: PanelSection[] = [];

  const styleFields = (STYLE_FIELDS[node.kind] ?? []).map((key) => tokenField(doc, node, key));
  if (styleFields.length) sections.push({ title: 'Style', fields: styleFields });

  const layout: Field[] = [];
  if (node.kind === 'stack' || node.kind === 'section') {
    layout.push(
      choice(node, 'align', 'Align', ['start', 'center', 'end', 'stretch'], node.style?.align, (value) => ({
        kind: 'setStyle',
        id: node.id,
        key: 'align',
        value,
      })),
    );
    layout.push(
      choice(node, 'justify', 'Justify', ['start', 'center', 'end', 'between'], node.style?.justify, (value) => ({
        kind: 'setStyle',
        id: node.id,
        key: 'justify',
        value,
      })),
    );
  }
  if (node.kind === 'grid') {
    layout.push(
      choice(node, 'cols', 'Columns', [1, 2, 3, 4, 6, 8, 12], node.cols, (value) => ({
        kind: 'setField',
        id: node.id,
        key: 'cols',
        value,
      })),
    );
  }
  if (node.kind === 'heading') {
    layout.push(
      choice(node, 'level', 'Level', [1, 2, 3, 4, 5, 6], node.level, (value) => ({
        kind: 'setField',
        id: node.id,
        key: 'level',
        value,
      })),
    );
  }
  if (node.kind === 'section') {
    layout.push(
      choice(
        node,
        'tag',
        'Landmark',
        ['div', 'section', 'article', 'header', 'footer', 'nav', 'main', 'aside'],
        node.tag,
        (value) => ({
          kind: 'setField',
          id: node.id,
          key: 'tag',
          value,
        }),
      ),
    );
  }
  if (layout.length) sections.push({ title: 'Layout', fields: layout });

  if (node.place) {
    sections.push({
      title: 'Placement',
      fields: [
        choice(node, 'col', 'Column', range(1, 12), node.place.col, (value) => ({
          kind: 'setPlace',
          id: node.id,
          place: { ...node.place!, col: Number(value) },
        })),
        choice(node, 'span', 'Span', range(1, 12), node.place.span, (value) => ({
          kind: 'setPlace',
          id: node.id,
          place: { ...node.place!, span: Number(value) },
        })),
      ],
    });
  }

  return sections;
}

function choice(
  node: Node,
  key: string,
  label: string,
  options: (string | number)[],
  value: string | number | undefined,
  toOp: (value: string | number | null) => Op,
): ChoiceField {
  return {
    control: 'choice',
    key,
    label,
    value,
    options: options.map((option) => ({ value: option, label: String(option) })),
    toOp,
  };
}

const range = (from: number, to: number) => Array.from({ length: to - from + 1 }, (_, i) => from + i);

/**
 * The expert drawer (Level 3+). This is the only function in the shell that can produce a raw
 * declaration, it is deliberately awkward to reach, and everything it writes is counted.
 */
export function expertDrawer(doc: Document, nodeId: string) {
  const node = doc.nodes[nodeId];
  return {
    escapes: Object.entries(node?.style?.escape ?? {}).map(([property, value]) => ({ property, value })),
    setEscape(property: string, value: string | null): Op {
      const escape = { ...(node?.style?.escape ?? {}) };
      if (value === null) delete escape[property];
      else escape[property] = value;
      return { kind: 'setStyle', id: nodeId, key: 'escape', value: Object.keys(escape).length ? escape : null };
    },
  };
}

/** What the design-debt panel shows: every raw declaration in the document, and where it is. */
export function designDebt(doc: Document) {
  const entries = tokens.designDebt(doc);
  return { count: entries.length, entries };
}
