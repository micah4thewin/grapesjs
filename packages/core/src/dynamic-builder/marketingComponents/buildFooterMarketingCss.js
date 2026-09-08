const buildFooterMarketingCss = () => `
.db-footer {
  padding: var(--db-space-10, 5rem) var(--db-space-5, 1.5rem) var(--db-space-6, 2rem);
  background-color: var(--db-color-surface, #ffffff);
  color: var(--db-color-text, #111827);
}
.db-footer-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr) minmax(0, 1fr);
  gap: var(--db-space-8, 3rem);
  max-width: 72rem;
  margin: 0 auto;
}
.db-footer-brand { display: flex; flex-direction: column; align-items: flex-start; gap: var(--db-space-3, 0.75rem); }
.db-footer-logo { font-family: var(--db-font-display, inherit); font-size: var(--db-type-xl, 1.4rem); font-weight: 700; }
.db-footer-blurb { margin: 0; max-width: 26rem; line-height: 1.6; color: var(--db-color-text-muted, #5b6472); }
.db-footer-heading {
  display: block;
  margin-bottom: var(--db-space-2, 0.5rem);
  font-size: var(--db-type-sm, 0.9rem);
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--db-color-text-muted, #5b6472);
}
.db-footer-list { display: flex; flex-direction: column; margin: 0; padding: 0; list-style: none; }
.db-footer-link {
  display: inline-flex;
  align-items: center;
  min-height: 2.75rem;
  padding: var(--db-space-1, 0.25rem) 0;
  color: inherit;
  opacity: 0.85;
  text-decoration: none;
  transition: opacity var(--db-motion-duration-fast, 120ms) var(--db-motion-ease, ease);
}
.db-footer-link:hover { opacity: 1; text-decoration: underline; }
.db-footer-link:focus-visible {
  outline: 2px solid var(--db-color-focus-ring, #6366f1);
  outline-offset: 2px;
}
.db-footer-legal {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--db-space-4, 1rem);
  max-width: 72rem;
  margin: var(--db-space-8, 3rem) auto 0;
  padding-top: var(--db-space-4, 1rem);
  border-top: 1px solid var(--db-color-line, #dfe3ea);
}
.db-footer-copyright { font-size: var(--db-type-sm, 0.9rem); color: var(--db-color-text-muted, #5b6472); }
.db-footer-legal-links { display: flex; flex-wrap: wrap; gap: var(--db-space-4, 1rem); }
.db-footer-legal-links .db-footer-link { font-size: var(--db-type-sm, 0.9rem); }
.db-footer-newsletter { display: flex; flex-direction: column; gap: var(--db-space-3, 0.75rem); }
.db-footer-newsletter .db-footer-blurb { max-width: 22rem; }
.db-footer[data-db-footer="newsletter"] .db-footer-grid {
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr) minmax(0, 0.8fr) minmax(0, 1.3fr);
}
.db-footer[data-db-footer="simple"] { padding-top: var(--db-space-7, 2.5rem); }
.db-footer[data-db-footer="simple"] .db-footer-grid {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--db-space-5, 1.5rem) var(--db-space-8, 3rem);
}
.db-footer[data-db-footer="simple"] .db-footer-blurb,
.db-footer[data-db-footer="simple"] .db-footer-heading,
.db-footer[data-db-footer="centered"] .db-footer-heading { display: none; }
.db-footer[data-db-footer="simple"] .db-footer-brand { flex-direction: row; align-items: center; gap: var(--db-space-5, 1.5rem); }
.db-footer[data-db-footer="simple"] .db-footer-list,
.db-footer[data-db-footer="centered"] .db-footer-list {
  flex-direction: row;
  flex-wrap: wrap;
  gap: var(--db-space-1, 0.25rem) var(--db-space-5, 1.5rem);
}
.db-footer[data-db-footer="simple"] .db-footer-legal { margin-top: var(--db-space-5, 1.5rem); }
.db-footer[data-db-footer="centered"] .db-footer-grid {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--db-space-5, 1.5rem);
  text-align: center;
}
.db-footer[data-db-footer="centered"] .db-footer-brand { align-items: center; }
.db-footer[data-db-footer="centered"] .db-footer-list { justify-content: center; }
.db-footer[data-db-footer="centered"] .db-footer-legal { flex-direction: column; align-items: center; text-align: center; }
@media (max-width: 991.98px) {
  .db-footer[data-db-footer="newsletter"] .db-footer-grid { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); }
  .db-footer[data-db-footer="newsletter"] .db-footer-newsletter { grid-column: 1 / -1; }
  .db-footer[data-db-footer="simple"] .db-footer-grid { flex-direction: column; align-items: flex-start; }
  .db-footer-grid { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); }
  .db-footer-brand { grid-column: 1 / -1; }
}
@media (max-width: 767.98px) {
  .db-footer { padding: var(--db-space-8, 3rem) var(--db-space-4, 1rem) var(--db-space-5, 1.5rem); }
  .db-footer-grid { grid-template-columns: minmax(0, 1fr); }
  .db-footer-legal { flex-direction: column; align-items: flex-start; }
}
`;

export default buildFooterMarketingCss;
