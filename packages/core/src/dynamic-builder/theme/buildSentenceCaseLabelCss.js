const buildSentenceCaseLabelCss = () => `
.gjs-editor-cont .gjs-db-style-scope-label,
.gjs-editor-cont .gjs-db-seo-preview-heading,
.gjs-editor-cont .gjs-db-code-language,
.gjs-editor-cont .gjs-db-icon-group-title,
.gjs-editor-cont .gjs-db-menu-section-title,
.gjs-editor-cont .gjs-db-palette-group,
.gjs-editor-cont .gjs-db-section-eyebrow,
.gjs-editor-cont .gjs-device-label {
  text-transform: none;
  letter-spacing: 0;
  font-size: var(--gjs-db-fs-2);
  font-weight: var(--gjs-db-w-medium);
}
.gjs-editor-cont .gjs-db-style-scope-label,
.gjs-editor-cont .gjs-db-menu-section-title,
.gjs-editor-cont .gjs-db-palette-group {
  color: var(--gjs-db-faint);
}
`;

export default buildSentenceCaseLabelCss;
