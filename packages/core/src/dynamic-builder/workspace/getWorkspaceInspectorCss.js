const getWorkspaceInspectorCss = () => `
.gjs-db-inspector-head {
  flex: 0 0 auto;
  padding: var(--gjs-db-gap-4) var(--gjs-db-gap-4) var(--gjs-db-gap-3);
  border-bottom: 1px solid var(--gjs-db-line);
}
.gjs-db-inspector-eyebrow {
  display: block;
  font-size: var(--gjs-db-fs-1);
  color: var(--gjs-db-faint);
  margin-bottom: 2px;
}
.gjs-db-inspector-title {
  margin: 0;
  font-size: var(--gjs-db-fs-4);
  font-weight: var(--gjs-db-w-bold);
  line-height: var(--gjs-db-lh-tight);
  color: var(--gjs-db-fg);
  overflow-wrap: anywhere;
}
.gjs-db-inspector-body {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  padding-bottom: var(--gjs-db-gap-6);
}
.gjs-db-inspector-group + .gjs-db-inspector-group {
  border-top: 1px solid var(--gjs-db-line);
}
.gjs-db-group-head {
  display: flex;
  align-items: center;
  gap: var(--gjs-db-gap-2);
  width: 100%;
  min-height: var(--gjs-db-tap);
  padding: var(--gjs-db-gap-3) var(--gjs-db-gap-4);
  border: none;
  background-color: transparent;
  color: var(--gjs-db-fg);
  font-family: var(--gjs-db-font-ui);
  font-size: var(--gjs-db-fs-3);
  font-weight: var(--gjs-db-w-bold);
  text-align: left;
  cursor: pointer;
  transition: background-color var(--gjs-db-dur-1) var(--gjs-db-ease-soft);
}
.gjs-db-group-head:hover {
  background-color: var(--gjs-db-hover);
}
.gjs-db-group-caret {
  flex: 0 0 auto;
  display: inline-flex;
  color: var(--gjs-db-faint);
  transition: transform var(--gjs-db-dur-2) var(--gjs-db-ease);
}
.gjs-db-inspector-group[data-db-open='1'] .gjs-db-group-caret {
  transform: rotate(90deg);
}
.gjs-db-group-body {
  padding: 0 var(--gjs-db-gap-3) var(--gjs-db-gap-3);
}
.gjs-db-inspector-group[data-db-open='0'] .gjs-db-group-body {
  display: none;
}
.gjs-db-inspector-empty {
  margin: var(--gjs-db-gap-5) var(--gjs-db-gap-4);
  padding: var(--gjs-db-gap-4);
  border: 1px dashed var(--gjs-db-line);
  border-radius: var(--gjs-db-r-2);
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
`;

export default getWorkspaceInspectorCss;
