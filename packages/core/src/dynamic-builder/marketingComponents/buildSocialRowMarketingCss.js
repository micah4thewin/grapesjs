const buildSocialRowMarketingCss = () => `
.db-social-row { display: flex; align-items: center; gap: var(--db-space-2, 0.5rem); }
.db-social-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid var(--db-color-line, #dfe3ea);
  border-radius: var(--db-radius-pill, 999px);
  color: var(--db-color-text-muted, #5b6472);
  background-color: transparent;
  transition:
    color var(--db-motion-duration-fast, 120ms) var(--db-motion-ease, ease),
    border-color var(--db-motion-duration-fast, 120ms) var(--db-motion-ease, ease);
}
.db-social-link:hover {
  color: var(--db-color-brand, #4f46e5);
  border-color: var(--db-color-brand, #4f46e5);
}
.db-social-link:focus-visible {
  outline: 2px solid var(--db-color-focus-ring, #6366f1);
  outline-offset: 2px;
}
`;

export default buildSocialRowMarketingCss;
