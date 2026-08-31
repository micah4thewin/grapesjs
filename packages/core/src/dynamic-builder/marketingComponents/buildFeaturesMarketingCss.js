const buildFeaturesMarketingCss = () => `
.db-features { display: grid; gap: var(--db-space-6, 2rem); }
.db-features[data-db-columns='2'] { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.db-features[data-db-columns='3'] { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.db-features[data-db-columns='4'] { grid-template-columns: repeat(4, minmax(0, 1fr)); }
.db-feature-card {
  display: flex;
  flex-direction: column;
  gap: var(--db-space-3, 0.75rem);
  padding: var(--db-space-6, 2rem);
  background-color: var(--db-color-surface, #ffffff);
  border: 1px solid var(--db-color-line, #dfe3ea);
  border-radius: var(--db-radius-lg, 1rem);
  transition:
    transform var(--db-motion-duration-base, 220ms) var(--db-motion-ease, ease),
    box-shadow var(--db-motion-duration-base, 220ms) var(--db-motion-ease, ease);
}
.db-feature-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--db-shadow-md, 0 8px 20px -6px rgba(15, 23, 42, 0.12));
}
.db-feature-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: var(--db-radius-md, 0.5rem);
  background-color: var(--db-color-surface-alt, #f4f6fa);
  color: var(--db-color-brand, #4f46e5);
}
.db-feature-title { margin: 0; font-family: var(--db-font-display, inherit); font-size: var(--db-type-lg, 1.2rem); }
.db-feature-text { margin: 0; color: var(--db-color-text-muted, #5b6472); line-height: 1.6; }
@media (max-width: 991.98px) {
  .db-features[data-db-columns='3'],
  .db-features[data-db-columns='4'] {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 767.98px) {
  .db-features[data-db-columns='2'],
  .db-features[data-db-columns='3'],
  .db-features[data-db-columns='4'] {
    grid-template-columns: minmax(0, 1fr);
  }
}
@media (prefers-reduced-motion: reduce) {
  .db-feature-card:hover { transform: none; }
}
`;

export default buildFeaturesMarketingCss;
