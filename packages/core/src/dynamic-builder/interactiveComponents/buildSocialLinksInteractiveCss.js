import getSocialNetworkRecords from './getSocialNetworkRecords.js';

const buildSocialLinksInteractiveCss = () => {
  const brandColorRules = getSocialNetworkRecords()
    .map(
      (networkRecord) =>
        `.db-social-link[data-db-network="${networkRecord.networkName}"] {\n  --db-social-brand: ${networkRecord.brandColor};\n}`,
    )
    .join('\n');
  return `
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
  width: 2.75rem;
  height: 2.75rem;
  border: 1px solid var(--db-color-line);
  border-radius: var(--db-radius-pill);
  background: var(--db-color-surface);
  color: var(--db-color-text-muted);
}
.db-social-link:hover {
  border-color: var(--db-color-brand);
  color: var(--db-color-brand);
}
.db-social-links li:has(> .db-social-link:not([href])) {
  display: none;
}
.db-social-links[data-db-icon-style="filled"] .db-social-link {
  background: var(--db-color-text);
  border-color: var(--db-color-text);
  color: var(--db-color-surface);
}
.db-social-links[data-db-icon-style="filled"] .db-social-link:hover {
  background: var(--db-color-brand);
  border-color: var(--db-color-brand);
  color: var(--db-color-brand-contrast);
}
.db-social-links[data-db-icon-style="brand"] .db-social-link {
  background: var(--db-social-brand, var(--db-color-brand));
  border-color: transparent;
  color: var(--db-social-contrast, #ffffff);
}
.db-social-links[data-db-icon-style="brand"] .db-social-link:hover {
  opacity: 0.85;
}
.db-social-link[data-db-network="snapchat"] {
  --db-social-contrast: #111111;
}
${brandColorRules}
`;
};

export default buildSocialLinksInteractiveCss;
