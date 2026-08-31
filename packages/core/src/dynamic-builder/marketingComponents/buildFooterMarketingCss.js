const buildFooterMarketingCss = () => `
.db-footer {
  padding: var(--db-space-10, 5rem) var(--db-space-5, 1.5rem) var(--db-space-6, 2rem);
  background-color: var(--db-color-text, #111827);
  color: var(--db-color-surface, #ffffff);
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
.db-footer-blurb { margin: 0; max-width: 26rem; line-height: 1.6; opacity: 0.75; }
.db-footer-heading {
  display: block;
  margin-bottom: var(--db-space-3, 0.75rem);
  font-size: var(--db-type-sm, 0.9rem);
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  opacity: 0.7;
}
.db-footer-list { display: flex; flex-direction: column; gap: var(--db-space-2, 0.5rem); margin: 0; padding: 0; list-style: none; }
.db-footer-link {
  color: inherit;
  opacity: 0.8;
  text-decoration: none;
  transition: opacity var(--db-motion-duration-fast, 120ms) var(--db-motion-ease, ease);
}
.db-footer-link:hover { opacity: 1; text-decoration: underline; }
.db-footer-link:focus-visible {
  outline: 2px solid var(--db-color-focus-ring, #6366f1);
  outline-offset: 2px;
}
.db-footer .db-social-link { border-color: rgba(255, 255, 255, 0.25); color: rgba(255, 255, 255, 0.8); }
.db-footer .db-social-link:hover { border-color: #ffffff; color: #ffffff; }
.db-footer-legal {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--db-space-4, 1rem);
  max-width: 72rem;
  margin: var(--db-space-8, 3rem) auto 0;
  padding-top: var(--db-space-5, 1.5rem);
  border-top: 1px solid rgba(255, 255, 255, 0.16);
}
.db-footer-copyright { font-size: var(--db-type-sm, 0.9rem); opacity: 0.7; }
.db-footer-legal-links { display: flex; gap: var(--db-space-4, 1rem); }
@media (max-width: 991.98px) {
  .db-footer-grid { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); }
  .db-footer-brand { grid-column: 1 / -1; }
}
@media (max-width: 767.98px) {
  .db-footer-grid { grid-template-columns: minmax(0, 1fr); }
  .db-footer-legal { flex-direction: column; align-items: flex-start; }
}
`;

export default buildFooterMarketingCss;
