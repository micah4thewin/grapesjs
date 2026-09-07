const getSiteManagerEditorCss = () => `
.gjs-db-sites { gap: var(--gjs-db-gap-4); }
.gjs-db-site-list { gap: var(--gjs-db-gap-2); }
.gjs-db-site-card {
  display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between;
  gap: var(--gjs-db-gap-2); padding: var(--gjs-db-gap-3); border-radius: var(--gjs-db-r-3);
  background-color: var(--gjs-db-sunken); box-shadow: var(--gjs-db-press-1);
}
.gjs-db-site-card-current { box-shadow: var(--gjs-db-press-1), inset 0 0 0 1px var(--gjs-db-focus); }
.gjs-db-site-summary { display: flex; flex-direction: column; gap: 2px; min-width: 12rem; flex: 1 1 12rem; }
.gjs-db-site-name {
  display: flex; align-items: center; gap: var(--gjs-db-gap-2); color: var(--gjs-db-fg);
  font-size: 0.95rem; font-weight: var(--gjs-db-w-bold); letter-spacing: -0.01em;
}
.gjs-db-site-actions { flex-wrap: wrap; justify-content: flex-end; }
.gjs-db-site-card .gjs-db-button { min-height: 32px; }
.gjs-db-site-row { flex-basis: 100%; flex-wrap: wrap; align-items: center; margin-top: var(--gjs-db-gap-2); }
.gjs-db-site-row .gjs-db-field-input { flex: 1 1 12rem; min-width: 10rem; }
.gjs-db-site-new { padding-top: var(--gjs-db-gap-2); border-top: 1px solid var(--gjs-db-line); }
@media (max-width: 640px) {
  .gjs-db-site-card { flex-direction: column; align-items: stretch; }
  .gjs-db-site-actions { justify-content: flex-start; }
}
`;

export default getSiteManagerEditorCss;
