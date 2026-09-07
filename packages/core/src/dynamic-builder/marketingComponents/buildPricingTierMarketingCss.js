const buildPricingTierMarketingCss = () => `
.db-pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
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
  width: 100%;
  max-width: 30rem;
  justify-self: center;
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
  content: attr(data-db-badge);
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
  white-space: nowrap;
}
.db-pricing-tier[data-db-featured='true'][data-db-badge='']::before { display: none; }
.db-pricing-tier-name { margin: 0; font-family: var(--db-font-display, inherit); font-size: var(--db-type-xl, 1.4rem); }
.db-pricing-tier-blurb { margin: 0; color: var(--db-color-text-muted, #5b6472); font-size: var(--db-type-sm, 0.9rem); }
.db-pricing-price { display: flex; flex-wrap: wrap; align-items: baseline; gap: var(--db-space-1, 0.25rem); margin: 0; }
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
@media (max-width: 767.98px) {
  .db-pricing-grid { grid-template-columns: minmax(0, 1fr); max-width: 30rem; }
}
`;

export default buildPricingTierMarketingCss;
