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

/**
 * A typed content field — alt text, an image source, a list's row limit, a component's prop.
 *
 * These accept free input, and that is not a hole in the constraint: **content is not style**. A
 * page's words, its alt text and its data are the author's; what the token system closes off is
 * the appearance. The type still holds — a number field cannot produce a string, `required` is
 * enforced by the compiler, and every keystroke arrives as an op like anything else.
 */
export interface TextField {
  control: 'text';
  key: string;
  label: string;
  value?: string;
  multiline?: boolean;
  required?: boolean;
  placeholder?: string;
  help?: string;
  toOp(value: string): Op;
}

export interface NumberField {
  control: 'number';
  key: string;
  label: string;
  value?: number;
  min?: number;
  max?: number;
  toOp(value: number | null): Op;
}

export type Field = TokenField | ChoiceField | TextField | NumberField;

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

  const content = contentFields(doc, node);
  if (content.length) sections.push({ title: 'Content', fields: content });

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

/**
 * The typed half of the inspector — the answer to "where did the trait editor go".
 *
 * It did not go anywhere; it got types. An image's alt text is a required string the build checks,
 * its dimensions are integers, a list's source is one of the declared collections, and a component
 * instance's props come from that component's own declaration rather than from a bag of strings.
 */
function contentFields(doc: Document, node: Node): Field[] {
  const fields: Field[] = [];

  switch (node.kind) {
    case 'text':
    case 'heading': {
      if (node.bind) {
        // A bound node shows a record's value; editing it here would edit the template, not the
        // record, and silently for every row. That distinction is Stage E3's, and it is explicit.
        fields.push(readonly('bind', 'Bound to', node.bind, 'Edit the record, not the template.'));
        break;
      }
      fields.push({
        control: 'text',
        key: 'text',
        label: 'Text',
        multiline: node.kind === 'text',
        value: (node.spans ?? []).map((span) => span.text).join(''),
        toOp: (value) => ({ kind: 'setText', id: node.id, spans: [{ text: value }] }),
      });
      break;
    }

    case 'image': {
      fields.push({
        control: 'text',
        key: 'alt',
        label: 'Alt text',
        required: true,
        value: node.alt,
        placeholder: 'What the image shows',
        help: 'Required. The build fails without it, and again if it is a filename.',
        toOp: (value) => ({ kind: 'setField', id: node.id, key: 'alt', value }),
      });
      fields.push({
        control: 'text',
        key: 'src',
        label: 'Source',
        value: node.src,
        toOp: (value) => ({ kind: 'setField', id: node.id, key: 'src', value }),
      });
      fields.push(number(node, 'width', 'Width', node.width, 1));
      fields.push(number(node, 'height', 'Height', node.height, 1));
      break;
    }

    case 'list': {
      const collections = (doc.collections ?? []).map((collection) => collection.name);
      if (collections.length) {
        fields.push({
          control: 'choice',
          key: 'source',
          label: 'Repeats over',
          value: node.source,
          options: collections.map((name) => ({ value: name, label: name })),
          toOp: (value) => ({ kind: 'setField', id: node.id, key: 'source', value }),
        });
      }
      fields.push(number(node, 'limit', 'Show at most', node.limit, 1));
      break;
    }

    case 'instance': {
      const definition = (doc.components ?? []).find((component) => component.name === node.component);
      for (const prop of definition?.props ?? []) {
        const current = node.props?.[prop.name];
        if (prop.type === 'number') {
          fields.push({
            control: 'number',
            key: `prop:${prop.name}`,
            label: prop.name,
            value: current === undefined ? undefined : Number(current),
            toOp: (value) => setProp(node, prop.name, value === null ? null : String(value)),
          });
        } else if (prop.type === 'boolean') {
          fields.push({
            control: 'choice',
            key: `prop:${prop.name}`,
            label: prop.name,
            value: current,
            options: [
              { value: 'true', label: 'true' },
              { value: 'false', label: 'false' },
            ],
            toOp: (value) => setProp(node, prop.name, value === null ? null : String(value)),
          });
        } else {
          fields.push({
            control: 'text',
            key: `prop:${prop.name}`,
            label: prop.name,
            required: prop.required,
            value: current,
            toOp: (value) => setProp(node, prop.name, value),
          });
        }
      }
      break;
    }
  }

  return fields;
}

function setProp(node: Node, name: string, value: string | null): Op {
  const props = { ...(node.props ?? {}) };
  if (value === null || value === '') delete props[name];
  else props[name] = value;
  // Props travel as one field so a rename or a removal is a single, invertible op.
  return { kind: 'setField', id: node.id, key: 'props' as never, value: props };
}

function number(node: Node, key: string, label: string, value: number | undefined, min: number): NumberField {
  return {
    control: 'number',
    key,
    label,
    value,
    min,
    toOp: (next) => ({ kind: 'setField', id: node.id, key: key as never, value: next }),
  };
}

/** A value the panel shows but will not let you edit here, with the reason why. */
function readonly(key: string, label: string, value: string, help: string): TextField {
  return {
    control: 'text',
    key,
    label,
    value,
    help,
    toOp: () => ({ kind: 'setText', id: '', spans: [] }), // never called: the control renders disabled
  };
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
