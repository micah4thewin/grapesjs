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
  font-size: 0.72rem;
  padding: var(--gjs-db-gap-2);
}
.gjs-trt-trait {
  padding: var(--gjs-db-gap-1) 0;
  font-size: 0.78rem;
  color: var(--gjs-db-muted);
  border: none;
}
.gjs-trt-trait .gjs-label {
  color: var(--gjs-db-muted);
  font-size: 0.72rem;
}
.gjs-label-wrp {
  color: var(--gjs-db-muted);
}
.gjs-trait-category {
  border: none;
}
.gjs-trait-category .gjs-title {
  background-color: transparent;
  border-bottom: 1px solid var(--gjs-db-line);
  color: var(--gjs-db-faint);
  font-size: 0.68rem;
  font-weight: var(--gjs-db-w-bold);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  padding: var(--gjs-db-gap-3) var(--gjs-db-gap-2);
  transition:
    color var(--gjs-db-dur-1) var(--gjs-db-ease-soft),
    background-color var(--gjs-db-dur-1) var(--gjs-db-ease-soft);
}
.gjs-trait-category .gjs-title:hover {
  color: var(--gjs-db-fg);
  background-color: var(--gjs-db-hover);
}
.gjs-trait-category .gjs-caret-icon {
  color: var(--gjs-db-faint);
}
`;

export default buildTraitManagerCss;
