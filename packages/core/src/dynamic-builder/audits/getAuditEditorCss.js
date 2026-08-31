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
.gjs-db-audit-clean {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
}
.gjs-db-audit-empty {
  margin: 0;
}
.gjs-db-audit-report .gjs-db-button svg {
  vertical-align: -2px;
  margin-right: 4px;
}
`;

export default getAuditEditorCss;
