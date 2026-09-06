const getSiteIdentityEditorCss = () => `
.gjs-db-identity-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--gjs-db-gap-3); }
.gjs-db-identity-logo-row, .gjs-db-identity-color-row { display: flex; align-items: center; flex-wrap: wrap; gap: var(--gjs-db-gap-2); }
.gjs-db-identity-logo {
  display: inline-flex; align-items: center; justify-content: center; width: 52px; height: 52px; overflow: hidden;
  border-radius: var(--gjs-db-r-2); background: var(--gjs-db-sunken); box-shadow: var(--gjs-db-press-1); color: var(--gjs-db-muted);
}
.gjs-db-identity-logo img { width: 100%; height: 100%; object-fit: contain; }
.gjs-db-identity-color-row input[type='color'] {
  width: 44px; height: 32px; padding: 2px; border: 1px solid var(--gjs-db-line); border-radius: var(--gjs-db-r-2); background: transparent; cursor: pointer;
}
.gjs-db-identity-swatches { display: flex; gap: 6px; margin-bottom: var(--gjs-db-gap-2); }
.gjs-db-identity-swatch { width: 28px; height: 28px; border-radius: 50%; border: 1px solid rgba(0, 0, 0, 0.12); }
.gjs-db-identity-preview {
  display: grid; gap: 6px; justify-items: start; padding: var(--gjs-db-gap-4); border: 1px solid; border-radius: var(--gjs-db-r-3);
  font-family: var(--gjs-db-font-ui);
}
.gjs-db-identity-preview strong { font-size: 1.15rem; letter-spacing: -0.01em; }
.gjs-db-identity-preview-button { display: inline-block; margin-top: 4px; padding: 0.45em 1.1em; border-radius: 999px; font-size: 0.8rem; font-weight: 600; }
@media (max-width: 640px) { .gjs-db-identity-grid { grid-template-columns: 1fr; } }
`;

export default getSiteIdentityEditorCss;
