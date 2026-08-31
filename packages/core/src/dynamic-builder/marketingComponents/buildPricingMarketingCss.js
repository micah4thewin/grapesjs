const buildPricingMarketingCss = () => `
.db-pricing {
  padding: var(--db-space-11, 6rem) var(--db-space-5, 1.5rem);
  background-color: var(--db-color-surface-alt, #f4f6fa);
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
  padding: var(--db-space-1, 0.25rem);
  background-color: var(--db-color-surface, #ffffff);
  border: 1px solid var(--db-color-line, #dfe3ea);
  border-radius: var(--db-radius-pill, 999px);
}
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
.db-pricing-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--db-space-6, 2rem);
  align-items: stretch;
  max-width: 72rem;
  margin: 0 auto;
}
.db-pricing-tier {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--db-space-4, 1rem);
  padding: var(--db-space-7, 2.5rem);
  background-color: var(--db-color-surface, #ffffff);
  border: 1px solid var(--db-color-line, #dfe3ea);
  border-radius: var(--db-radius-lg, 1rem);
}
.db-pricing-tier[data-db-featured='true'] {
  border-color: var(--db-color-brand, #4f46e5);
  box-shadow: var(--db-shadow-lg, 0 24px 48px -12px rgba(15, 23, 42, 0.18));
}
.db-pricing-tier[data-db-featured='true']::before {
  content: 'Most popular';
  position: absolute;
  top: -0.9rem;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.2rem 0.75rem;
  background-color: var(--db-color-brand, #4f46e5);
  color: var(--db-color-brand-contrast, #ffffff);
  border-radius: var(--db-radius-pill, 999px);
  font-size: var(--db-type-xs, 0.75rem);
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.db-pricing-tier-name { margin: 0; font-family: var(--db-font-display, inherit); font-size: var(--db-type-xl, 1.4rem); }
.db-pricing-tier-blurb { margin: 0; color: var(--db-color-text-muted, #5b6472); font-size: var(--db-type-sm, 0.9rem); }
.db-pricing-price { display: flex; align-items: baseline; gap: var(--db-space-1, 0.25rem); margin: 0; }
.db-pricing-price-value {
  font-family: var(--db-font-display, inherit);
  font-size: var(--db-type-3xl, 2.4rem);
  font-weight: 700;
}
.db-pricing-price-period { color: var(--db-color-text-muted, #5b6472); }
.db-pricing-features { display: flex; flex-direction: column; gap: var(--db-space-2, 0.5rem); margin: 0; padding: 0; list-style: none; }
.db-pricing-feature { display: flex; align-items: center; gap: var(--db-space-2, 0.5rem); line-height: 1.5; }
.db-pricing-check { display: inline-flex; flex: none; color: var(--db-color-success, #15803d); }
.db-pricing-cta { margin-top: auto; }
@media (max-width: 991.98px) {
  .db-pricing-grid { grid-template-columns: minmax(0, 1fr); max-width: 28rem; }
}
`;

export default buildPricingMarketingCss;
