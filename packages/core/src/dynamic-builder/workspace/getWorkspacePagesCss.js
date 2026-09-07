const getWorkspacePagesCss = () => `
.gjs-db-page-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin: 0;
  padding: var(--gjs-db-gap-2) var(--gjs-db-gap-3);
  list-style: none;
}
.gjs-db-page-row {
  display: flex;
  align-items: center;
  gap: var(--gjs-db-gap-2);
  width: 100%;
  min-height: var(--gjs-db-tap);
  padding: var(--gjs-db-gap-1) var(--gjs-db-gap-2);
  border: none;
  border-radius: var(--gjs-db-r-1);
  background-color: transparent;
  color: var(--gjs-db-muted);
  font-family: var(--gjs-db-font-ui);
  font-size: var(--gjs-db-fs-3);
  text-align: left;
  cursor: pointer;
  transition:
    color var(--gjs-db-dur-1) var(--gjs-db-ease-soft),
    background-color var(--gjs-db-dur-1) var(--gjs-db-ease-soft);
}
.gjs-db-page-row:hover {
  color: var(--gjs-db-fg);
  background-color: var(--gjs-db-hover);
}
.gjs-db-page-row[aria-current='true'] {
  color: var(--gjs-db-fg);
  background-color: var(--gjs-db-accent-soft);
  font-weight: var(--gjs-db-w-medium);
}
.gjs-db-page-row svg {
  flex: 0 0 auto;
  color: var(--gjs-db-faint);
}
.gjs-db-page-row[aria-current='true'] svg {
  color: var(--gjs-db-accent);
}
.gjs-db-page-name {
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.gjs-db-page-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--gjs-db-gap-2);
  padding: var(--gjs-db-gap-2) var(--gjs-db-gap-3) 0;
  border-top: 1px solid var(--gjs-db-line-soft);
  margin-top: var(--gjs-db-gap-2);
}
.gjs-db-page-tag {
  flex: 0 0 auto;
  padding: 1px 6px;
  border-radius: var(--gjs-db-r-pill);
  background-color: var(--gjs-db-sunken);
  color: var(--gjs-db-faint);
  font-size: var(--gjs-db-fs-1);
}
`;

export default getWorkspacePagesCss;
