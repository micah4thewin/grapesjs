const getWorkspaceInspectorBodyCss = () => `
.gjs-db-ws-inspector .gjs-traits-cs,
.gjs-db-ws-inspector .gjs-traits-c,
.gjs-db-ws-inspector .gjs-sm-properties,
.gjs-db-ws-inspector .gjs-clm-tags,
.gjs-db-ws-inspector .gjs-trait-category .gjs-title,
.gjs-db-ws-inspector .gjs-sm-sector-title {
  padding-left: var(--gjs-db-gap-2);
  padding-right: var(--gjs-db-gap-2);
}
.gjs-db-ws-inspector .gjs-trt-trait {
  padding-left: 0;
  padding-right: 0;
}
.gjs-db-inspector-empty {
  margin: var(--gjs-db-gap-5) var(--gjs-db-gap-4);
  padding: var(--gjs-db-gap-4);
  border: none;
  border-radius: var(--gjs-db-r-3);
  background-color: var(--gjs-db-sunken);
  box-shadow: var(--gjs-db-press-1);
  color: var(--gjs-db-faint);
  font-size: var(--gjs-db-fs-2);
  line-height: var(--gjs-db-lh);
  text-align: center;
}
.gjs-db-ws-inspector[data-db-has-selection='1'] .gjs-db-inspector-empty {
  display: none;
}
.gjs-db-ws-inspector[data-db-has-selection='0'] .gjs-db-inspector-body > .gjs-db-inspector-group {
  display: none;
}
.gjs-db-ws-inspector .gjs-trt-header,
.gjs-db-ws-inspector .gjs-sm-header,
.gjs-db-ws-inspector .gjs-traits-label,
.gjs-db-ws-inspector .gjs-sm-sector:last-child {
  border-bottom: none;
}
.gjs-db-ws-inspector .gjs-traits-label {
  display: none;
}
.gjs-db-ws-inspector .gjs-one-bg:not(.gjs-block),
.gjs-db-ws-dock .gjs-one-bg:not(.gjs-block) {
  background-color: transparent;
}
.gjs-db-ws-inspector .gjs-sm-sector:last-child,
.gjs-db-ws-inspector .gjs-trait-category:last-child .gjs-title {
  border-bottom: none;
}
`;

export default getWorkspaceInspectorBodyCss;
