const buildLogoCloudMarketingCss = () => `
.db-logo-cloud {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: var(--db-space-7, 2.5rem);
  margin: 0;
  padding: 0;
  list-style: none;
}
.db-logo-cloud-item { display: flex; }
.db-logo-cloud-image {
  width: auto;
  height: 2.5rem;
  filter: grayscale(1);
  opacity: 0.65;
  transition:
    filter var(--db-motion-duration-base, 220ms) var(--db-motion-ease, ease),
    opacity var(--db-motion-duration-base, 220ms) var(--db-motion-ease, ease);
}
.db-logo-cloud-item:hover .db-logo-cloud-image,
.db-logo-cloud-item:focus-within .db-logo-cloud-image {
  filter: grayscale(0);
  opacity: 1;
}
@media (max-width: 767.98px) {
  .db-logo-cloud { gap: var(--db-space-5, 1.5rem); }
  .db-logo-cloud-image { height: 2rem; }
}
`;

export default buildLogoCloudMarketingCss;
