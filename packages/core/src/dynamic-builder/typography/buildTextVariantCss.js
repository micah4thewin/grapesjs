const buildTextVariantCss = () => `
.db-lead {
  font-size: var(--db-type-lg, 1.2rem);
  line-height: 1.6;
  color: var(--db-color-text-muted, #5b6472);
  max-width: 60ch;
}
.db-small {
  font-size: max(var(--db-type-sm, 0.875rem), 0.75rem);
  line-height: 1.55;
}
.db-eyebrow {
  display: inline-block;
  font-size: max(var(--db-type-xs, 0.78rem), 0.75rem);
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--db-color-brand, #4f46e5);
  margin: 0 0 0.75em;
}
`;

export default buildTextVariantCss;
