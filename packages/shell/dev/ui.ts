/**
 * The shell's chrome: structure tree, block palette, inspector, design-debt panel, budget meter.
 *
 * Every control here produces an **op**. There is no colour picker, no CSS box, and no text input
 * for a length — the inspector is generated from the IR schema and the document's own token set
 * (`panelForNode`), so an off-token value is not something a person can type here. Raw values live
 * behind the expert drawer and are counted in the debt panel.
 */

import type { Document, Node, Op } from '@lattice/engine';
import { tokens } from '@lattice/engine';
import { designDebt, panelForNode, type Field } from '../src/panels.ts';

export interface ShellHooks {
  document(): Document;
  selected(): string | null;
  activeRoute(): string;
  apply(ops: Op[], reason: string): void;
  select(nodeId: string): void;
  setRoute(path: string): void;
  insertBlock(name: string): void;
  routeBytes(): { html: number; css: number; js: number; images?: number } | null;
}

const el = <K extends keyof HTMLElementTagNameMap>(tag: K, className?: string, text?: string) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};

const LABELS: Record<string, string> = {
  section: 'section',
  stack: 'stack',
  grid: 'grid',
  frame: 'frame',
  list: 'list',
  text: 'text',
  heading: 'heading',
  image: 'image',
  instance: 'component',
};

/** What a node is called in the tree: its own words where it has them, its kind where it does not. */
function labelOf(node: Node): string {
  if (node.spans?.length)
    return node.spans
      .map((span) => span.text)
      .join('')
      .slice(0, 40);
  if (node.bind) return `{${node.bind}}`;
  if (node.alt) return node.alt.slice(0, 40);
  if (node.source) return `each ${node.source}`;
  return node.id;
}

export class Shell {
  #hooks: ShellHooks;

  constructor(hooks: ShellHooks) {
    this.#hooks = hooks;
  }

  render(): void {
    this.#renderRoutes();
    this.#renderTree();
    this.#renderBlocks();
    this.#renderInspector();
    this.#renderDebt();
    this.#renderMeter();
  }

  #renderRoutes(): void {
    const host = document.getElementById('routes')!;
    host.replaceChildren();
    const active = this.#hooks.activeRoute();
    for (const route of this.#hooks.document().routes) {
      const button = el('button', 'route', route.path);
      button.setAttribute('aria-current', String(route.path === active));
      button.title = route.title;
      button.onclick = () => this.#hooks.setRoute(route.path);
      host.append(button);
    }
    document.getElementById('site-name')!.textContent = this.#hooks.document().name;
  }

  #renderTree(): void {
    const host = document.getElementById('tree')!;
    host.replaceChildren();
    const doc = this.#hooks.document();
    const route = doc.routes.find((r) => r.path === this.#hooks.activeRoute()) ?? doc.routes[0];
    const selected = this.#hooks.selected();

    const walk = (id: string, depth: number, seen: Set<string>) => {
      if (seen.has(id)) return;
      seen.add(id);
      const node = doc.nodes[id];
      if (!node) return;
      const row = el('button', 'node');
      row.style.paddingLeft = `${6 + depth * 12}px`;
      row.setAttribute('aria-selected', String(id === selected));
      row.append(el('span', 'kind', LABELS[node.kind] ?? node.kind), el('span', 'label', labelOf(node)));
      row.onclick = () => this.#hooks.select(id);
      host.append(row);
      for (const child of node.children ?? []) walk(child, depth + 1, seen);
    };
    walk(route.root, 0, new Set());
  }

  #renderBlocks(): void {
    const host = document.getElementById('blocks')!;
    if (host.childElementCount) return; // static palette; nothing to re-render
    for (const name of ['Heading', 'Paragraph', 'Card', 'Two-up grid']) {
      const button = el('button', 'block', name);
      button.onclick = () => this.#hooks.insertBlock(name);
      host.append(button);
    }
  }

  #renderInspector(): void {
    const host = document.getElementById('inspector')!;
    const idLabel = document.getElementById('selected-id')!;
    const selected = this.#hooks.selected();
    host.replaceChildren();
    idLabel.textContent = selected ?? '';

    if (!selected) {
      host.append(el('p', 'empty', 'Select something on the canvas.'));
      return;
    }
    const doc = this.#hooks.document();
    const sections = panelForNode(doc, selected);
    if (!sections.length) {
      host.append(el('p', 'empty', 'This node type has nothing to set.'));
      return;
    }

    for (const section of sections) {
      host.append(el('div', 'section-title', section.title));
      for (const field of section.fields) host.append(this.#renderField(doc, field));
    }
  }

  #renderField(doc: Document, field: Field): HTMLElement {
    const wrapper = el('div', 'field');
    const label = el('div', 'label');
    label.append(el('span', undefined, field.label), el('span', 'value', String(field.value ?? '—')));
    wrapper.append(label);

    const options = el('div', 'options');
    const entries: { key: string; label: string; pressed: boolean; swatch?: string; apply: () => Op }[] =
      field.control === 'token'
        ? field.options.map((option) => ({
            key: option.ref,
            label: option.label,
            pressed: field.value === option.ref,
            swatch: field.group === 'color' ? tokens.resolveColor(doc, option.ref) : undefined,
            apply: () => field.toOp(option.ref),
          }))
        : field.options.map((option) => ({
            key: String(option.value),
            label: option.label,
            pressed: field.value === option.value,
            apply: () => field.toOp(option.value),
          }));

    for (const entry of entries) {
      const chip = el('button', 'chip');
      if (entry.swatch) {
        const swatch = el('span', 'swatch');
        swatch.style.background = entry.swatch;
        chip.append(swatch);
      }
      chip.append(document.createTextNode(entry.label));
      chip.setAttribute('aria-pressed', String(entry.pressed));
      chip.onclick = () => this.#hooks.apply([entry.apply()], `panel:${field.key}`);
      options.append(chip);
    }

    // Clearing is an op too — it sets the field back to the system default, not to a raw value.
    if (field.control === 'token' && field.value) {
      const clear = el('button', 'chip', 'clear');
      clear.onclick = () => this.#hooks.apply([field.toOp(null)], `panel:${field.key}`);
      options.append(clear);
    }
    wrapper.append(options);
    return wrapper;
  }

  #renderDebt(): void {
    const host = document.getElementById('debt')!;
    const debt = designDebt(this.#hooks.document());
    host.replaceChildren();
    const count = el('div', `count ${debt.count ? 'some' : 'zero'}`, String(debt.count));
    host.append(count);
    host.append(
      el(
        'p',
        undefined,
        debt.count
          ? 'raw declarations that escaped the token system'
          : 'no raw declarations — every style on this site is a token reference',
      ),
    );
    if (debt.count) {
      const list = el('ul');
      for (const entry of debt.entries.slice(0, 6)) {
        list.append(el('li', undefined, `${entry.node}: ${entry.property}: ${entry.value}`));
      }
      host.append(list);
    }
  }

  #renderMeter(): void {
    const meter = document.getElementById('meter')!;
    const bytes = this.#hooks.routeBytes();
    if (!bytes) {
      meter.textContent = 'budget —';
      return;
    }
    const kb = (bytes.html + bytes.css + bytes.js + (bytes.images ?? 0)) / 1024;
    const budget = 500;
    meter.textContent = `${kb.toFixed(1)}KB / ${budget}KB · html ${(bytes.html / 1024).toFixed(1)} · css ${(bytes.css / 1024).toFixed(1)}`;
    meter.classList.toggle('tight', kb > budget * 0.8);
  }
}

/** The block palette's fragments: IR, never HTML (Stage C3.4). */
export const BLOCKS: Record<string, { root: string; nodes: Node[] }> = {
  Heading: {
    root: 'b-heading',
    nodes: [
      {
        id: 'b-heading',
        kind: 'heading',
        level: 2,
        spans: [{ text: 'New heading' }],
        style: { type: 'type.h2', fg: 'color.fg' },
      },
    ],
  },
  Paragraph: {
    root: 'b-text',
    nodes: [
      {
        id: 'b-text',
        kind: 'text',
        spans: [{ text: 'New paragraph. Every style on it is a token reference.' }],
        style: { type: 'type.body', fg: 'color.muted' },
      },
    ],
  },
  Card: {
    root: 'b-card',
    nodes: [
      {
        id: 'b-card',
        kind: 'stack',
        place: { col: 1, span: 4 },
        style: { bg: 'color.surface', pad: 'space.5', gap: 'space.2', radius: 'radius.md' },
        children: ['b-card-h', 'b-card-b'],
      },
      {
        id: 'b-card-h',
        kind: 'heading',
        level: 2,
        spans: [{ text: 'Card' }],
        style: { type: 'type.h3', fg: 'color.fg' },
      },
      {
        id: 'b-card-b',
        kind: 'text',
        spans: [{ text: 'A card from the palette.' }],
        style: { type: 'type.body', fg: 'color.muted' },
      },
    ],
  },
  'Two-up grid': {
    root: 'b-grid',
    nodes: [
      { id: 'b-grid', kind: 'grid', cols: 12, style: { gap: 'space.5' }, children: ['b-grid-a', 'b-grid-b'] },
      {
        id: 'b-grid-a',
        kind: 'text',
        place: { col: 1, span: 6 },
        spans: [{ text: 'Left half.' }],
        style: { type: 'type.body', fg: 'color.fg' },
      },
      {
        id: 'b-grid-b',
        kind: 'text',
        place: { col: 7, span: 6 },
        spans: [{ text: 'Right half.' }],
        style: { type: 'type.body', fg: 'color.fg' },
      },
    ],
  },
};
