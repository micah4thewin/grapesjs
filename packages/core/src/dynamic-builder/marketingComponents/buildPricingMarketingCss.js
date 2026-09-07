const buildPricingMarketingCss = () => `
.db-pricing {
  padding: var(--db-space-11, 6rem) var(--db-space-5, 1.5rem);
  background-color: var(--db-color-surface, #ffffff);
  color: var(--db-color-text, #111827);
}
.db-pricing-header { max-width: 40rem; margin: 0 auto var(--db-space-8, 3rem); text-align: center; }
.db-pricing-title {
  margin: 0 0 var(--db-space-3, 0.75rem);
  font-family: var(--db-font-display, inherit);
  font-size: var(--db-type-3xl, 2.4rem);
}
.db-pricing-subtitle { margin: 0 0 var(--db-space-5, 1.5rem); color: var(--db-color-text-muted, #5b6472); }
.db-pricing-toggle {
  display: inline-flex;
  align-items: center;
  padding: var(--db-space-1, 0.25rem);
  background-color: var(--db-color-surface-alt, #f4f6fa);
  border: 1px solid var(--db-color-line, #dfe3ea);
  border-radius: var(--db-radius-pill, 999px);
}
.db-pricing[data-db-billing-toggle='false'] .db-pricing-toggle { display: none; }
.db-pricing-toggle-button {
  min-height: 44px;
  padding: var(--db-space-2, 0.5rem) var(--db-space-5, 1.5rem);
  border: 0;
  border-radius: var(--db-radius-pill, 999px);
  background-color: transparent;
  color: var(--db-color-text-muted, #5b6472);
  font: inherit;
  font-weight: 600;
  cursor: pointer;
  transition:
    background-color var(--db-motion-duration-fast, 120ms) var(--db-motion-ease, ease),
    color var(--db-motion-duration-fast, 120ms) var(--db-motion-ease, ease);
}
.db-pricing-toggle-button:hover { color: var(--db-color-text, #111827); }
.db-pricing-toggle-button:focus-visible {
  outline: 2px solid var(--db-color-focus-ring, #6366f1);
  outline-offset: 2px;
}
.db-pricing-toggle-button[aria-pressed='true'] {
  background-color: var(--db-color-brand, #4f46e5);
  color: var(--db-color-brand-contrast, #ffffff);
}
.db-pricing-save {
  display: inline-flex;
  align-items: center;
  margin: 0 var(--db-space-2, 0.5rem) 0 var(--db-space-1, 0.25rem);
  padding: 0.2rem 0.7rem;
  border-radius: var(--db-radius-pill, 999px);
  background-color: var(--db-color-brand, #4f46e5);
  color: var(--db-color-brand-contrast, #ffffff);
  font-size: var(--db-type-xs, 0.75rem);
  font-weight: 700;
  letter-spacing: 0.04em;
  white-space: nowrap;
}
.db-pricing-save:empty { display: none; }
@media (max-width: 767.98px) {
  .db-pricing { padding: var(--db-space-9, 4rem) var(--db-space-4, 1rem); }
  .db-pricing-toggle-button { padding-left: var(--db-space-4, 1rem); padding-right: var(--db-space-4, 1rem); }
}
`;

export default buildPricingMarketingCss;
