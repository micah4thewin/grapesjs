const buildCardMarketingCss = () => `
.db-card {
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: var(--db-color-surface, #ffffff);
  border: 1px solid var(--db-color-line, #dfe3ea);
  border-radius: var(--db-radius-lg, 1rem);
  transition:
    transform var(--db-motion-duration-base, 220ms) var(--db-motion-ease, ease),
    box-shadow var(--db-motion-duration-base, 220ms) var(--db-motion-ease, ease);
}
.db-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--db-shadow-md, 0 8px 20px -6px rgba(15, 23, 42, 0.12));
}
.db-card:focus-within {
  outline: 2px solid var(--db-color-focus-ring, #6366f1);
  outline-offset: 2px;
}
.db-card-image {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 10;
  object-fit: cover;
}
.db-card-body {
  display: flex;
  flex-direction: column;
  gap: var(--db-space-3, 0.75rem);
  padding: var(--db-space-6, 2rem);
}
.db-card-title { margin: 0; font-family: var(--db-font-display, inherit); font-size: var(--db-type-lg, 1.2rem); }
.db-card-text { margin: 0; color: var(--db-color-text-muted, #5b6472); line-height: 1.6; }
.db-card-link {
  display: inline-flex;
  align-items: center;
  gap: var(--db-space-2, 0.5rem);
  font-weight: 600;
  color: var(--db-color-brand, #4f46e5);
  text-decoration: none;
}
.db-card-link:hover { text-decoration: underline; }
.db-stretched-link::after { content: ''; position: absolute; inset: 0; }
.db-card[data-db-variant='horizontal'] { flex-direction: row; align-items: stretch; }
.db-card[data-db-variant='horizontal'] .db-card-image {
  width: 40%;
  height: auto;
  aspect-ratio: auto;
  object-fit: cover;
}
.db-card[data-db-variant='featured'] {
  border-color: var(--db-color-brand, #4f46e5);
  box-shadow: var(--db-shadow-md, 0 8px 20px -6px rgba(15, 23, 42, 0.12));
}
@media (max-width: 767.98px) {
  .db-card[data-db-variant='horizontal'] { flex-direction: column; }
  .db-card[data-db-variant='horizontal'] .db-card-image { width: 100%; aspect-ratio: 16 / 10; }
}
@media (prefers-reduced-motion: reduce) {
  .db-card:hover { transform: none; }
}
`;

export default buildCardMarketingCss;
