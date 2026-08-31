const buildPrimitiveListsReportsCss = () => `
.gjs-db-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1px;
  font-family: var(--gjs-db-font-ui);
}
.gjs-db-list-item {
  display: flex;
  align-items: center;
  gap: var(--gjs-db-gap-2);
  padding: 0.45em var(--gjs-db-gap-2);
  border-radius: var(--gjs-db-r-1);
  font-size: 0.8rem;
  color: var(--gjs-db-muted);
  transition:
    background-color var(--gjs-db-dur-1) var(--gjs-db-ease-soft),
    color var(--gjs-db-dur-1) var(--gjs-db-ease-soft);
}
.gjs-db-list-item:hover {
  background-color: var(--gjs-db-hover);
  color: var(--gjs-db-fg);
}
.gjs-db-report {
  display: flex;
  flex-direction: column;
  gap: var(--gjs-db-gap-3);
  font-family: var(--gjs-db-font-ui);
  font-size: 0.8rem;
  color: var(--gjs-db-muted);
}
.gjs-db-report-group {
  display: flex;
  flex-direction: column;
  gap: var(--gjs-db-gap-2);
  padding: var(--gjs-db-gap-3);
  border-radius: var(--gjs-db-r-3);
  background-color: var(--gjs-db-sunken);
  box-shadow: var(--gjs-db-press-1);
}
.gjs-db-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 0.14em 0.62em;
  border-radius: var(--gjs-db-r-pill);
  background-color: var(--gjs-db-panel);
  box-shadow: var(--gjs-db-lift-1);
  color: var(--gjs-db-muted);
  font-family: var(--gjs-db-font-ui);
  font-size: 0.66rem;
  font-weight: var(--gjs-db-w-bold);
  text-transform: uppercase;
  letter-spacing: 0.07em;
  white-space: nowrap;
}
.gjs-db-badge-success {
  color: var(--gjs-db-success);
}
.gjs-db-badge-warning {
  color: var(--gjs-db-warning);
}
.gjs-db-badge-error {
  color: var(--gjs-db-error);
}
`;

export default buildPrimitiveListsReportsCss;
