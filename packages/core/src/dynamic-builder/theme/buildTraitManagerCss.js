import buildTraitRowLayoutCss from './buildTraitRowLayoutCss.js';

const buildTraitManagerCss = () => `
.gjs-trt-traits,
.gjs-traits-c,
.gjs-traits-cs {
  padding: var(--gjs-db-gap-2);
  font-family: var(--gjs-db-font-ui);
}
.gjs-trt-header,
.gjs-traits-label {
  background-color: transparent;
  border-bottom: 1px solid var(--gjs-db-line);
  color: var(--gjs-db-faint);
  font-size: 0.78rem;
  padding: var(--gjs-db-gap-2);
}
.gjs-trt-header {
  padding: var(--gjs-db-gap-4) var(--gjs-db-gap-3);
  border: 1px dashed var(--gjs-db-line);
  border-radius: var(--gjs-db-r-2);
  color: var(--gjs-db-muted);
  font-size: 0.8rem;
  line-height: 1.5;
  text-align: center;
}
.gjs-trt-trait {
  font-size: 0.78rem;
  color: var(--gjs-db-muted);
  border: none;
}
.gjs-trt-trait .gjs-label {
  color: var(--gjs-db-muted);
  font-size: 0.78rem;
}
.gjs-label-wrp {
  color: var(--gjs-db-muted);
}
.gjs-trait-category {
  border: none;
}
.gjs-trait-category .gjs-title {
  background-color: transparent;
  border-bottom: 1px solid var(--gjs-db-line-soft);
  color: var(--gjs-db-fg);
  font-size: var(--gjs-db-fs-3);
  font-weight: var(--gjs-db-w-bold);
  letter-spacing: 0;
  padding: var(--gjs-db-gap-3) var(--gjs-db-gap-2);
  transition:
    color var(--gjs-db-dur-1) var(--gjs-db-ease-soft),
    background-color var(--gjs-db-dur-1) var(--gjs-db-ease-soft);
}
.gjs-trait-category .gjs-title:hover {
  color: var(--gjs-db-fg);
  background-color: var(--gjs-db-hover);
}
.gjs-trait-category.gjs-open .gjs-title {
  color: var(--gjs-db-fg);
}
.gjs-trait-category .gjs-caret-icon {
  color: var(--gjs-db-faint);
}
.gjs-trait-category + .gjs-trait-category {
  margin-top: var(--gjs-db-gap-2);
}
${buildTraitRowLayoutCss()}
`;

export default buildTraitManagerCss;
