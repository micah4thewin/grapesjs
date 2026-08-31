const buildContactMarketingCss = () => `
.db-contact { display: flex; flex-direction: column; gap: var(--db-space-4, 1rem); max-width: 26rem; }
.db-contact-title { margin: 0; font-family: var(--db-font-display, inherit); font-size: var(--db-type-xl, 1.4rem); }
.db-contact-address { display: flex; flex-direction: column; gap: var(--db-space-1, 0.25rem); font-style: normal; }
.db-contact-line { margin: 0; line-height: 1.6; }
.db-contact-link { color: var(--db-color-brand, #4f46e5); text-decoration: none; }
.db-contact-link:hover { text-decoration: underline; }
.db-contact-link:focus-visible {
  outline: 2px solid var(--db-color-focus-ring, #6366f1);
  outline-offset: 2px;
}
.db-contact-hours {
  display: flex;
  flex-direction: column;
  gap: var(--db-space-1, 0.25rem);
  margin: 0;
  padding: var(--db-space-4, 1rem) 0;
  border-top: 1px solid var(--db-color-line, #dfe3ea);
  border-bottom: 1px solid var(--db-color-line, #dfe3ea);
}
.db-contact-hours-row { display: flex; justify-content: space-between; gap: var(--db-space-4, 1rem); }
.db-contact-hours dt { font-weight: 600; }
.db-contact-hours dd { margin: 0; color: var(--db-color-text-muted, #5b6472); }
.db-contact-directions { align-self: flex-start; }
`;

export default buildContactMarketingCss;
