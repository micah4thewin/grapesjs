const buildTextContentCss = () => `
.db-text {
  margin: 0 0 var(--db-space-4, 1rem);
  font-size: var(--db-type-base, 1rem);
  line-height: 1.65;
  color: var(--db-color-text, #111827);
  overflow-wrap: break-word;
}
.db-text[data-db-variant='lead'] {
  font-size: var(--db-type-lg, 1.2rem);
  line-height: 1.6;
  color: var(--db-color-text-muted, #5b6472);
  max-width: 60ch;
}
.db-text[data-db-variant='small'] {
  font-size: max(var(--db-type-sm, 0.875rem), 0.75rem);
  line-height: 1.55;
}
.db-text[data-db-variant='caption'] {
  font-size: max(var(--db-type-xs, 0.78rem), 0.75rem);
  line-height: 1.5;
  letter-spacing: 0.02em;
  color: var(--db-color-text-muted, #5b6472);
}
.db-text[data-db-variant='eyebrow'] {
  display: block;
  margin: 0 0 var(--db-space-3, 0.75rem);
  font-size: max(var(--db-type-xs, 0.78rem), 0.75rem);
  font-weight: 600;
  line-height: 1.4;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--db-color-brand, #4f46e5);
}
`;

export default buildTextContentCss;
