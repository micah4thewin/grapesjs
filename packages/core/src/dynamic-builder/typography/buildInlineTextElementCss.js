const buildInlineTextElementCss = () => `
.db-section code,
.db-prose code {
  font-family: var(--db-font-mono, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace);
  font-size: max(0.875em, 0.75rem);
  background: var(--db-color-surface-alt, #f4f6fa);
  border: 1px solid var(--db-color-line, #dfe3ea);
  border-radius: var(--db-radius-sm, 0.25rem);
  padding: 0.1em 0.35em;
}
.db-section pre code,
.db-prose pre code {
  background: none;
  border: 0;
  border-radius: 0;
  padding: 0;
  font-size: max(0.9em, 0.75rem);
}
.db-section mark,
.db-prose mark {
  background: rgba(250, 204, 21, 0.45);
  color: inherit;
  padding: 0.05em 0.2em;
  border-radius: 0.2em;
}
.db-section small,
.db-prose small {
  font-size: max(0.85em, 0.75rem);
}
.db-section sub,
.db-section sup,
.db-prose sub,
.db-prose sup {
  font-size: max(0.72em, 0.75rem);
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}
.db-section sup,
.db-prose sup {
  top: -0.45em;
}
.db-section sub,
.db-prose sub {
  bottom: -0.2em;
}
`;

export default buildInlineTextElementCss;
