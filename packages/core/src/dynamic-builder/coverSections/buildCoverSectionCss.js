const buildCoverSectionCss = () => `
.db-cover {
  position: relative;
  display: grid;
  align-items: center;
  justify-items: center;
  min-height: 85vh;
  min-height: 85svh;
  padding: var(--db-space-9, 4rem) var(--db-space-5, 1.5rem);
  overflow: hidden;
  isolation: isolate;
  color: #ffffff;
  background: var(--db-color-text, #111827);
}
.db-cover[data-db-cover-height='100vh'] { min-height: 100vh; min-height: 100svh; }
.db-cover[data-db-cover-height='60vh'] { min-height: 60vh; min-height: 60svh; }
.db-cover[data-db-cover-height='auto'] { min-height: 0; }
.db-cover-media {
  position: absolute;
  inset: 0;
  z-index: -2;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  will-change: transform;
}
.db-cover-overlay {
  position: absolute;
  inset: 0;
  z-index: -1;
  background: rgba(8, 10, 14, calc(var(--db-cover-overlay, 45) / 100));
}
.db-cover-inner {
  width: 100%;
  max-width: 64rem;
  margin: 0;
  padding: 0;
  text-align: center;
  text-wrap: balance;
}
.db-cover-inner .db-heading,
.db-cover-inner .db-text,
.db-cover-inner h1,
.db-cover-inner p {
  color: inherit;
}
.db-cover-inner .db-text[data-db-variant='eyebrow'] { color: rgba(255, 255, 255, 0.82); }
.db-cover-inner .db-text[data-db-variant='lead'] { color: rgba(255, 255, 255, 0.86); max-width: 40rem; margin-inline: auto; }
.db-cover-inner .db-button-group { justify-content: center; }
.db-cover[data-db-align='left'],
.db-cover[data-db-align='left-middle'] { justify-items: start; }
.db-cover[data-db-align='left'] { align-items: end; }
.db-cover[data-db-align='left'] .db-cover-inner,
.db-cover[data-db-align='left-middle'] .db-cover-inner { text-align: left; max-width: 72rem; }
.db-cover[data-db-align='left'] .db-cover-inner .db-text[data-db-variant='lead'],
.db-cover[data-db-align='left-middle'] .db-cover-inner .db-text[data-db-variant='lead'] { margin-inline: 0; }
.db-cover[data-db-align='left'] .db-button-group,
.db-cover[data-db-align='left-middle'] .db-button-group { justify-content: flex-start; }
.db-cover-inner .db-button[data-db-variant='ghost'] {
  color: #ffffff;
  border-color: rgba(255, 255, 255, 0.6);
}
@media (max-width: 767px) {
  .db-cover { padding: var(--db-space-8, 3rem) var(--db-space-4, 1rem); }
  .db-cover[data-db-cover-height='100vh'] { min-height: 92svh; }
}
@media (prefers-reduced-motion: reduce) {
  .db-cover-media { transform: none !important; }
}
`;

export default buildCoverSectionCss;
