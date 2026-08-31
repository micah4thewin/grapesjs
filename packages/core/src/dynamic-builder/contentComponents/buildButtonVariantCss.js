const buildButtonVariantCss = () => `
.db-button[data-db-variant='primary'] {
  background: var(--db-color-brand, #4f46e5);
  border-color: var(--db-color-brand, #4f46e5);
  color: var(--db-color-brand-contrast, #ffffff);
}
.db-button[data-db-variant='primary']:hover {
  box-shadow: var(--db-shadow-md, 0 8px 20px -6px rgba(15, 23, 42, 0.35));
}
.db-button[data-db-variant='primary']:active {
  box-shadow: var(--db-shadow-sm, 0 1px 2px 0 rgba(15, 23, 42, 0.2));
  transform: translateY(1px);
}
.db-button[data-db-variant='secondary'] {
  background: var(--db-color-surface-alt, #f4f6fa);
  border-color: var(--db-color-line, #dfe3ea);
  color: var(--db-color-text, #111827);
}
.db-button[data-db-variant='secondary']:hover {
  border-color: var(--db-color-text-muted, #5b6472);
  box-shadow: var(--db-shadow-sm, 0 1px 2px 0 rgba(15, 23, 42, 0.2));
}
.db-button[data-db-variant='secondary']:active {
  box-shadow: none;
  transform: translateY(1px);
}
.db-button[data-db-variant='outline'] {
  background: transparent;
  border-color: var(--db-color-brand, #4f46e5);
  color: var(--db-color-brand, #4f46e5);
}
.db-button[data-db-variant='outline']:hover {
  background: var(--db-color-surface-alt, #f4f6fa);
}
.db-button[data-db-variant='outline']:active {
  transform: translateY(1px);
}
.db-button[data-db-variant='ghost'] {
  background: transparent;
  border-color: transparent;
  color: var(--db-color-brand, #4f46e5);
}
.db-button[data-db-variant='ghost']:hover {
  background: var(--db-color-surface-alt, #f4f6fa);
}
.db-button[data-db-variant='ghost']:active {
  transform: translateY(1px);
}
.db-button[data-db-variant='danger'] {
  background: var(--db-color-danger, #b91c1c);
  border-color: var(--db-color-danger, #b91c1c);
  color: var(--db-color-brand-contrast, #ffffff);
}
.db-button[data-db-variant='danger']:hover {
  box-shadow: var(--db-shadow-md, 0 8px 20px -6px rgba(15, 23, 42, 0.35));
}
.db-button[data-db-variant='danger']:active {
  box-shadow: var(--db-shadow-sm, 0 1px 2px 0 rgba(15, 23, 42, 0.2));
  transform: translateY(1px);
}
`;

export default buildButtonVariantCss;
