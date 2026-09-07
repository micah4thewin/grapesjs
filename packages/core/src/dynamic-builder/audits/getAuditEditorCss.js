const getAuditEditorCss = () => `
.gjs-db-audit-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
}
.gjs-db-audit-counts {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}
.gjs-db-audit-report .gjs-db-button,
.gjs-db-audit-report .gjs-db-field-input {
  min-height: 36px;
}
.gjs-db-audit-scope {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 36px;
  cursor: pointer;
}
.gjs-db-audit-group-head {
  display: flex;
  align-items: center;
  gap: 10px;
}
.gjs-db-audit-group-head .gjs-db-section-title {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-right: auto;
}
.gjs-db-audit-meta {
  display: block;
  font-size: 0.75rem;
  margin-top: -6px;
}
.gjs-db-audit-page-head {
  font-weight: 600;
  margin: 10px 0 4px;
}
.gjs-db-audit-finding {
  align-items: flex-start;
}
.gjs-db-audit-finding .gjs-db-badge {
  flex: 0 0 auto;
  margin-top: 2px;
}
.gjs-db-audit-finding-body {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}
.gjs-db-audit-finding-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 4px;
}
.gjs-db-audit-report .gjs-db-audit-finding-actions .gjs-db-button {
  min-height: 32px;
  padding: 0.3em 0.8em;
}
.gjs-db-audit-clean {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
}
.gjs-db-audit-empty {
  margin: 0;
}
.gjs-db-preflight-footer {
  justify-content: flex-end;
}
.gjs-db-audit-report .gjs-db-button svg {
  vertical-align: -2px;
  margin-right: 4px;
}
`;

export default getAuditEditorCss;
