const getFontLibraryEditorCss = () => `
.gjs-db-font-panes { display: grid; grid-template-columns: 1fr 1fr; gap: var(--gjs-db-gap-4); }
.gjs-db-font-pane .gjs-db-icon-group-title { display: flex; justify-content: space-between; align-items: baseline; }
.gjs-db-font-pane .gjs-db-icon-group-title span { text-transform: none; letter-spacing: 0; color: var(--gjs-db-accent); font-weight: var(--gjs-db-w-medium); }
.gjs-db-font-list { display: grid; gap: var(--gjs-db-gap-2); max-height: 46vh; overflow-y: auto; padding-right: 4px; }
.gjs-db-font-card {
  display: grid; gap: 4px; padding: var(--gjs-db-gap-3); text-align: left; border: 1px solid var(--gjs-db-line);
  border-radius: var(--gjs-db-r-2); background: var(--gjs-db-panel); color: var(--gjs-db-fg); cursor: pointer;
  transition: border-color var(--gjs-db-dur-1) var(--gjs-db-ease-soft), background-color var(--gjs-db-dur-1) var(--gjs-db-ease-soft);
}
.gjs-db-font-card:hover { background: var(--gjs-db-hover); border-color: var(--gjs-db-accent-soft); }
.gjs-db-font-card-active { border-color: var(--gjs-db-accent); background: var(--gjs-db-accent-soft); }
.gjs-db-font-sample { font-size: 1.35rem; line-height: 1.2; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.gjs-db-font-name { display: flex; justify-content: space-between; gap: var(--gjs-db-gap-2); font-family: var(--gjs-db-font-ui); font-size: 0.72rem; font-weight: var(--gjs-db-w-medium); }
.gjs-db-font-name em { font-style: normal; font-weight: var(--gjs-db-w-normal); color: var(--gjs-db-faint); text-align: right; }
@media (max-width: 760px) { .gjs-db-font-panes { grid-template-columns: 1fr; } .gjs-db-font-list { max-height: 30vh; } }
`;

export default getFontLibraryEditorCss;
