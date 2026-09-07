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
.db-logo-cloud-item { display: flex; flex: none; }
.db-logo-cloud-link { display: inline-flex; align-items: center; min-height: 2.75rem; }
.db-logo-cloud-link:focus-visible {
  outline: 2px solid var(--db-color-focus-ring, #6366f1);
  outline-offset: 4px;
  border-radius: var(--db-radius-sm, 0.25rem);
}
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
.db-logo-cloud-item:focus-within .db-logo-cloud-image,
.db-logo-cloud[data-db-logo-color='always'] .db-logo-cloud-image {
  filter: grayscale(0);
  opacity: 1;
}
.db-logo-cloud[data-db-logo-color='grey'] .db-logo-cloud-image { filter: grayscale(1); opacity: 0.65; }
.db-logo-cloud[data-db-marquee='true'] {
  flex-wrap: nowrap;
  justify-content: flex-start;
  overflow: hidden;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
}
.db-logo-cloud[data-db-marquee-active='true'] > .db-logo-cloud-item {
  animation: db-logo-marquee var(--db-marquee-duration, 30s) linear infinite;
}
.db-logo-cloud[data-db-marquee-active='true']:hover > .db-logo-cloud-item { animation-play-state: paused; }
@keyframes db-logo-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(var(--db-marquee-shift, -100%)); }
}
@media (max-width: 767.98px) {
  .db-logo-cloud { gap: var(--db-space-5, 1.5rem); }
  .db-logo-cloud-image { height: 2rem; }
}
@media (prefers-reduced-motion: reduce) {
  .db-logo-cloud[data-db-marquee-active='true'] > .db-logo-cloud-item { animation: none; }
}
`;

export default buildLogoCloudMarketingCss;
