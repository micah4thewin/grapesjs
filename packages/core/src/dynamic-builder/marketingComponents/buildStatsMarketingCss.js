const buildStatsMarketingCss = () => `
.db-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(9rem, 1fr));
  gap: var(--db-space-6, 2rem);
  text-align: center;
}
.db-stat { display: flex; flex-direction: column; gap: var(--db-space-1, 0.25rem); }
.db-stat-value {
  font-family: var(--db-font-display, inherit);
  font-size: var(--db-type-3xl, 2.4rem);
  font-weight: 700;
  color: var(--db-color-brand, #4f46e5);
  font-variant-numeric: tabular-nums;
}
.db-stat-label { color: var(--db-color-text-muted, #5b6472); font-size: var(--db-type-sm, 0.9rem); }
@media (max-width: 767.98px) {
  .db-stats { gap: var(--db-space-5, 1.5rem); }
}
`;

export default buildStatsMarketingCss;
