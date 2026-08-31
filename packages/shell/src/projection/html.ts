/**
 * A parser for compiler-emitted HTML — and nothing else.
 *
 * This is not a general HTML parser and must never become one. The only HTML it accepts is the
 * output of `crates/compiler/src/emit.rs`: well-formed, generated, and closed-world. General
 * parsing of arbitrary HTML happens in exactly one place in Lattice, the migration importer, where
 * its output is reviewable IR rather than live document state.
 */

export interface Element {
  tag: string;
  attrs: Record<string, string>;
  children: (Element | string)[];
}

const VOID_TAGS = new Set(['img', 'br', 'meta', 'link', 'input', 'hr']);

export class HtmlParseError extends Error {}

/** Parse the `<body>` of a compiler-emitted page into an element tree. */
export function parseBody(html: string): Element[] {
  const start = html.indexOf('<body>');
  const end = html.lastIndexOf('</body>');
  if (start < 0 || end < 0) throw new HtmlParseError('page has no body');
  return parseFragment(html.slice(start + '<body>'.length, end).trim());
}

export function parseFragment(source: string): Element[] {
  const roots: Element[] = [];
  const stack: Element[] = [];
  let index = 0;

  const push = (child: Element | string) => {
    if (typeof child === 'string' && !child) return;
    const parent = stack[stack.length - 1];
    if (parent) parent.children.push(child);
    else if (typeof child !== 'string') roots.push(child);
  };

  while (index < source.length) {
    const next = source.indexOf('<', index);
    if (next < 0) {
      push(decode(source.slice(index)));
      break;
    }
    if (next > index) push(decode(source.slice(index, next)));

    if (source.startsWith('</', next)) {
      const close = source.indexOf('>', next);
      if (close < 0) throw new HtmlParseError('unterminated closing tag');
      const tag = source.slice(next + 2, close).trim();
      const open = stack.pop();
      if (!open || open.tag !== tag)
        throw new HtmlParseError(`closing </${tag}> does not match <${open?.tag ?? 'nothing'}>`);
      index = close + 1;
      continue;
    }

    const close = findTagEnd(source, next);
    const raw = source.slice(next + 1, close);
    const [tag, ...rest] = raw.split(/\s+(?=[a-zA-Z-]+=|$)/);
    const element: Element = { tag: tag.replace(/\/$/, ''), attrs: parseAttrs(rest.join(' ')), children: [] };
    push(element);
    if (!VOID_TAGS.has(element.tag) && !raw.endsWith('/')) stack.push(element);
    index = close + 1;
  }

  if (stack.length) throw new HtmlParseError(`unclosed <${stack[stack.length - 1].tag}>`);
  return roots;
}

function findTagEnd(source: string, start: number): number {
  let quote: string | null = null;
  for (let i = start + 1; i < source.length; i++) {
    const char = source[i];
    if (quote) {
      if (char === quote) quote = null;
    } else if (char === '"' || char === "'") {
      quote = char;
    } else if (char === '>') {
      return i;
    }
  }
  throw new HtmlParseError('unterminated tag');
}

function parseAttrs(source: string): Record<string, string> {
  const attrs: Record<string, string> = {};
  const pattern = /([a-zA-Z-][a-zA-Z0-9-]*)(?:="([^"]*)")?/g;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(source))) {
    if (!match[0].trim()) continue;
    attrs[match[1]] = decode(match[2] ?? '');
  }
  return attrs;
}

function decode(text: string): string {
  return text
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

function encodeText(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function encodeAttr(text: string): string {
  return encodeText(text).replace(/"/g, '&quot;');
}

/** Serialize back to exactly the bytes the compiler emitted — the parser's proof it lost nothing. */
export function serialize(nodes: (Element | string)[]): string {
  return nodes
    .map((node) => {
      if (typeof node === 'string') return encodeText(node);
      const attrs = Object.entries(node.attrs)
        .map(([key, value]) => (value === '' ? ` ${key}` : ` ${key}="${encodeAttr(value)}"`))
        .join('');
      if (VOID_TAGS.has(node.tag)) return `<${node.tag}${attrs}>`;
      return `<${node.tag}${attrs}>${serialize(node.children)}</${node.tag}>`;
    })
    .join('');
}
