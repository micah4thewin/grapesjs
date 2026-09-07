const buildFormEditorCss = () => `
.gjs-db-form-destination,
.gjs-db-page-url {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.gjs-db-form-destination [hidden],
.gjs-db-page-url [hidden] {
  display: none;
}
.gjs-db-form-destination .gjs-db-badge {
  align-self: flex-start;
}
.gjs-db-option-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.gjs-db-option-row {
  display: grid;
  grid-template-columns: auto minmax(0, 1.4fr) minmax(0, 1fr) auto auto auto;
  align-items: center;
  gap: 4px;
}
.gjs-db-option-row .gjs-db-field-input {
  min-width: 0;
}
.gjs-db-option-default {
  width: 16px;
  height: 16px;
  margin: 0 2px;
}
.gjs-db-form-destination-custom {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 6px;
}
.gjs-db-kv-section {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.gjs-db-kv-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) auto;
  gap: 4px;
  align-items: center;
}
.gjs-db-add-field-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
  margin-top: 12px;
}
.gjs-db-add-field-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  min-height: 64px;
  padding: 10px 12px;
  text-align: left;
  white-space: normal;
}
.gjs-db-add-field-card span {
  font-size: 0.78rem;
  font-weight: 400;
}
`;

export default buildFormEditorCss;
