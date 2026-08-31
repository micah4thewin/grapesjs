const buildCalloutContentCss = () => `
.db-callout {
  display: flex;
  align-items: flex-start;
  gap: var(--db-space-3, 0.75rem);
  margin: 0 0 var(--db-space-5, 1.5rem);
  padding: var(--db-space-4, 1rem) var(--db-space-5, 1.5rem);
  background: var(--db-color-surface-alt, #f4f6fa);
  border-left: 4px solid var(--db-color-brand, #4f46e5);
  border-radius: var(--db-radius-md, 0.5rem);
  color: var(--db-color-text, #111827);
}
.db-callout-icon {
  display: inline-flex;
  flex: 0 0 auto;
  margin-top: 0.1em;
  color: var(--db-color-brand, #4f46e5);
}
.db-callout-glyph {
  display: none;
  line-height: 0;
}
.db-callout[data-db-variant='info'] .db-callout-glyph[data-db-glyph='info'] {
  display: inline-flex;
}
.db-callout[data-db-variant='success'] {
  border-left-color: var(--db-color-success, #15803d);
}
.db-callout[data-db-variant='success'] .db-callout-icon {
  color: var(--db-color-success, #15803d);
}
.db-callout[data-db-variant='success'] .db-callout-glyph[data-db-glyph='success'] {
  display: inline-flex;
}
.db-callout[data-db-variant='warning'] {
  border-left-color: var(--db-color-warning, #b45309);
}
.db-callout[data-db-variant='warning'] .db-callout-icon {
  color: var(--db-color-warning, #b45309);
}
.db-callout[data-db-variant='warning'] .db-callout-glyph[data-db-glyph='warning'] {
  display: inline-flex;
}
.db-callout[data-db-variant='error'] {
  border-left-color: var(--db-color-danger, #b91c1c);
}
.db-callout[data-db-variant='error'] .db-callout-icon {
  color: var(--db-color-danger, #b91c1c);
}
.db-callout[data-db-variant='error'] .db-callout-glyph[data-db-glyph='error'] {
  display: inline-flex;
}
.db-callout-content {
  flex: 1 1 auto;
  min-width: 0;
}
.db-callout-title {
  margin: 0 0 var(--db-space-1, 0.25rem);
  font-weight: 600;
  font-size: var(--db-type-base, 1rem);
  line-height: 1.4;
  color: var(--db-color-text, #111827);
}
.db-callout-body {
  margin: 0;
  font-size: max(var(--db-type-sm, 0.875rem), 0.75rem);
  line-height: 1.6;
  color: var(--db-color-text, #111827);
}
`;

export default buildCalloutContentCss;
