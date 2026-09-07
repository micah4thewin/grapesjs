const buildTraitRowLayoutCss = () => `
.gjs-traits-cs,
.gjs-trait-categories,
.gjs-traits-c {
  display: flex;
  flex-direction: column;
}
.gjs-traits-empty-c {
  order: -1;
}
.gjs-trt-trait {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 4px;
  padding: var(--gjs-db-gap-2) var(--gjs-db-gap-1);
}
.gjs-trt-trait .gjs-label-wrp {
  width: 100%;
  min-width: 0;
}
.gjs-trt-trait .gjs-label {
  overflow: visible;
  white-space: normal;
  text-overflow: clip;
  line-height: 1.35;
}
.gjs-trt-trait .gjs-field-wrp {
  width: 100%;
  min-width: 0;
}
.gjs-trt-trait .gjs-field-wrp > .gjs-field,
.gjs-trt-trait .gjs-field-wrp > select,
.gjs-trt-trait .gjs-field-wrp > input,
.gjs-trt-trait .gjs-field-wrp > textarea {
  width: 100%;
  box-sizing: border-box;
}
.gjs-trt-trait .gjs-field-select select {
  min-height: 32px;
}
.gjs-trt-trait .gjs-field input:not([type='range']):not([type='checkbox']) {
  min-height: 30px;
}
.gjs-trt-trait--checkbox {
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  min-height: 36px;
}
.gjs-trt-trait--checkbox .gjs-label-wrp {
  flex: 1 1 auto;
  width: auto;
}
.gjs-trt-trait--checkbox .gjs-field-wrp {
  flex: 0 0 auto;
  width: auto;
}
.gjs-trt-trait--checkbox .gjs-field-checkbox {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: var(--gjs-db-r-2);
}
.gjs-trt-trait--checkbox .gjs-chk-icon {
  height: 13px;
  width: 6px;
  margin: 0 0 3px;
}
.gjs-trt-trait--button .gjs-field-wrp,
.gjs-trt-trait--button .gjs-btn-prim {
  width: 100%;
}
.gjs-trt-trait .gjs-btn-prim {
  min-height: 32px;
}
`;

export default buildTraitRowLayoutCss;
