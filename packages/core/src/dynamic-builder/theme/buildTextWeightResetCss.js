// GrapesJS core sets `font-weight: lighter` on modals, trait rows, block cards,
// style sectors and layers. That resolves to weight 100, and on any machine whose
// UI font ships a thin face the secondary text renders as hairlines that are
// nearly invisible on dark panels. Pin every one of those surfaces back to the
// theme's normal weight so colour and size are what carry the hierarchy.
const buildTextWeightResetCss = () => `
.gjs-mdl-dialog,
.gjs-editor-cont .gjs-mdl-dialog,
.gjs-editor-cont .gjs-mdl-content,
.gjs-editor-cont .gjs-trt-header,
.gjs-editor-cont .gjs-traits-label,
.gjs-editor-cont .gjs-trt-trait,
.gjs-editor-cont .gjs-trt-traits,
.gjs-editor-cont .gjs-block,
.gjs-editor-cont .gjs-sm-header,
.gjs-editor-cont .gjs-sm-sector,
.gjs-editor-cont .gjs-sm-properties,
.gjs-editor-cont .gjs-layer,
.gjs-editor-cont .gjs-clm-tags,
.gjs-editor-cont .gjs-am-assets-cont,
.gjs-editor-cont .gjs-db-form,
.gjs-editor-cont .gjs-db-muted,
.gjs-editor-cont .gjs-db-field-help {
  font-weight: var(--gjs-db-w-normal);
}
.gjs-mdl-dialog,
.gjs-editor-cont .gjs-mdl-dialog {
  text-shadow: none;
}
`;

export default buildTextWeightResetCss;
