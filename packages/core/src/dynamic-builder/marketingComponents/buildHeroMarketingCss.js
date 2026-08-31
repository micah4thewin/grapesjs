const buildHeroMarketingCss = () => `
.db-hero {
  position: relative;
  padding: var(--db-space-11, 6rem) var(--db-space-5, 1.5rem);
  background-color: var(--db-color-surface, #ffffff);
  color: var(--db-color-text, #111827);
}
.db-hero[data-db-theme='light'] { background-color: var(--db-color-surface-alt, #f4f6fa); }
.db-hero[data-db-theme='dark'] {
  background-color: var(--db-color-text, #111827);
  color: var(--db-color-surface, #ffffff);
}
.db-hero[data-db-theme='brand'] {
  background-color: var(--db-color-brand, #4f46e5);
  color: var(--db-color-brand-contrast, #ffffff);
}
.db-hero-inner {
  display: grid;
  gap: var(--db-space-8, 3rem);
  align-items: center;
  max-width: 72rem;
  margin: 0 auto;
}
.db-hero[data-db-hero='split-media-right'] .db-hero-inner,
.db-hero[data-db-hero='split-media-left'] .db-hero-inner {
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
}
.db-hero[data-db-hero='split-media-left'] .db-hero-media { order: -1; }
.db-hero[data-db-hero='centered'] .db-hero-inner {
  grid-template-columns: minmax(0, 1fr);
  justify-items: center;
  text-align: center;
  max-width: 56rem;
}
.db-hero[data-db-hero='centered'] .db-hero-lead { margin-left: auto; margin-right: auto; }
.db-hero[data-db-hero='centered'] .db-button-group { justify-content: center; }
.db-hero-eyebrow {
  display: inline-block;
  margin-bottom: var(--db-space-3, 0.75rem);
  font-size: var(--db-type-sm, 0.9rem);
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--db-color-accent, #0ea5e9);
}
.db-hero[data-db-theme='dark'] .db-hero-eyebrow,
.db-hero[data-db-theme='brand'] .db-hero-eyebrow {
  color: inherit;
  opacity: 0.85;
}
.db-hero-title {
  margin: 0 0 var(--db-space-4, 1rem);
  font-family: var(--db-font-display, inherit);
  font-size: var(--db-type-4xl, 3rem);
  line-height: 1.08;
  letter-spacing: -0.02em;
}
.db-hero-lead {
  margin: 0 0 var(--db-space-6, 2rem);
  max-width: 38rem;
  font-size: var(--db-type-lg, 1.2rem);
  line-height: 1.6;
  color: var(--db-color-text-muted, #5b6472);
}
.db-hero[data-db-theme='dark'] .db-hero-lead,
.db-hero[data-db-theme='brand'] .db-hero-lead {
  color: inherit;
  opacity: 0.82;
}
.db-hero-media { margin: 0; width: 100%; }
.db-hero-image {
  display: block;
  width: 100%;
  height: auto;
  border-radius: var(--db-radius-lg, 1rem);
  box-shadow: var(--db-shadow-lg, 0 24px 48px -12px rgba(15, 23, 42, 0.18));
}
@media (max-width: 991.98px) {
  .db-hero[data-db-hero='split-media-right'] .db-hero-inner,
  .db-hero[data-db-hero='split-media-left'] .db-hero-inner {
    grid-template-columns: minmax(0, 1fr);
  }
  .db-hero[data-db-hero='split-media-left'] .db-hero-media { order: 0; }
}
@media (max-width: 767.98px) {
  .db-hero { padding: var(--db-space-9, 4rem) var(--db-space-4, 1rem); }
}
`;

export default buildHeroMarketingCss;
