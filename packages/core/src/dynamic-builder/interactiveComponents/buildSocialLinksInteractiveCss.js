const buildSocialLinksInteractiveCss = () => `
.db-social-links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--db-space-2);
  margin: 0;
  padding: 0;
  list-style: none;
}
.db-social-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid var(--db-color-line);
  border-radius: var(--db-radius-pill);
  background: var(--db-color-surface);
  color: var(--db-color-text-muted);
}
.db-social-link:hover {
  border-color: var(--db-color-brand);
  color: var(--db-color-brand);
}
`;

export default buildSocialLinksInteractiveCss;
