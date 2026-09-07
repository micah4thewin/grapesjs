const buildQuoteContentCss = () => `
.db-quote {
  margin: 0 0 var(--db-space-6, 2rem);
  padding: var(--db-space-4, 1rem) var(--db-space-5, 1.5rem);
  border-left: 4px solid var(--db-color-brand, #4f46e5);
  border-radius: var(--db-radius-sm, 0.25rem);
  background: var(--db-color-surface-alt, #f4f6fa);
}
.db-quote-body {
  margin: 0;
  padding: 0;
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
.db-quote[data-db-hide-source='true'] .db-quote-cite {
  display: none;
}
.db-quote[data-db-quote='plain'] {
  padding: 0;
  border-left: 0;
  border-radius: 0;
  background: transparent;
}
.db-quote[data-db-quote='large'] {
  padding: var(--db-space-6, 2rem) var(--db-space-5, 1.5rem);
  border-left: 0;
  background: transparent;
  text-align: center;
}
.db-quote[data-db-quote='large'] .db-quote-text {
  font-size: var(--db-type-2xl, 1.75rem);
  line-height: 1.3;
  max-width: 34ch;
  margin-left: auto;
  margin-right: auto;
}
.db-quote[data-db-quote='large'] .db-quote-text::before {
  content: '\\201C';
  margin-right: 0.1em;
  color: var(--db-color-brand, #4f46e5);
}
`;

export default buildQuoteContentCss;
