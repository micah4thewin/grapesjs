import buildButtonVariantSelector from './buildButtonVariantSelector.js';

const filledVariantCss = (variantName, colorToken, colorFallback) => `
${buildButtonVariantSelector(variantName)} {
  background: var(${colorToken}, ${colorFallback});
  border-color: var(${colorToken}, ${colorFallback});
  color: var(--db-color-brand-contrast, #ffffff);
}
${buildButtonVariantSelector(variantName, ':hover')} {
  box-shadow: var(--db-shadow-md, 0 8px 20px -6px rgba(15, 23, 42, 0.35));
  filter: brightness(1.06);
}
${buildButtonVariantSelector(variantName, ':active')} {
  box-shadow: var(--db-shadow-sm, 0 1px 2px 0 rgba(15, 23, 42, 0.2));
  filter: none;
}`;

const buildButtonVariantCss = () => `
${filledVariantCss('primary', '--db-color-brand', '#4f46e5')}
${filledVariantCss('danger', '--db-color-danger', '#b91c1c')}
${buildButtonVariantSelector('secondary')} {
  background: var(--db-color-surface-alt, #f4f6fa);
  border-color: var(--db-color-line, #dfe3ea);
  color: var(--db-color-text, #111827);
}
${buildButtonVariantSelector('secondary', ':hover')} {
  border-color: var(--db-color-text-muted, #5b6472);
  box-shadow: var(--db-shadow-sm, 0 1px 2px 0 rgba(15, 23, 42, 0.2));
}
${buildButtonVariantSelector('outline')} {
  background: transparent;
  border-color: var(--db-color-brand, #4f46e5);
  color: var(--db-color-brand, #4f46e5);
}
${buildButtonVariantSelector('outline', ':hover')} {
  background: var(--db-color-surface-alt, #f4f6fa);
}
${buildButtonVariantSelector('ghost')} {
  background: transparent;
  border-color: transparent;
  color: var(--db-color-brand, #4f46e5);
}
${buildButtonVariantSelector('ghost', ':hover')} {
  background: var(--db-color-surface-alt, #f4f6fa);
}
${buildButtonVariantSelector('link')} {
  min-height: 0;
  min-width: 0;
  padding: 0.25em 0;
  border-color: transparent;
  border-radius: 0;
  background: transparent;
  color: var(--db-color-brand, #4f46e5);
  text-decoration: underline;
  text-underline-offset: 0.2em;
  text-decoration-thickness: 1px;
}
${buildButtonVariantSelector('link', ':hover')} {
  text-decoration-thickness: 2px;
}
`;

export default buildButtonVariantCss;
