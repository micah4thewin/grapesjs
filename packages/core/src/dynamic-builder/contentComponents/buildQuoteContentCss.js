const buildQuoteContentCss = () => `
.db-quote {
  margin: 0 0 var(--db-space-6, 2rem);
  padding: var(--db-space-4, 1rem) var(--db-space-5, 1.5rem);
  border-left: 4px solid var(--db-color-brand, #4f46e5);
  border-radius: var(--db-radius-sm, 0.25rem);
  background: var(--db-color-surface-alt, #f4f6fa);
}
.db-quote-text {
  margin: 0 0 var(--db-space-3, 0.75rem);
  font-size: var(--db-type-lg, 1.2rem);
  font-style: italic;
  line-height: 1.5;
  color: var(--db-color-text, #111827);
  overflow-wrap: break-word;
}
.db-quote-cite {
  display: block;
  font-style: normal;
  font-size: max(var(--db-type-sm, 0.875rem), 0.75rem);
  line-height: 1.5;
  color: var(--db-color-text-muted, #5b6472);
}
.db-quote-cite::before {
  content: '\\2014\\00a0';
}
`;

export default buildQuoteContentCss;
