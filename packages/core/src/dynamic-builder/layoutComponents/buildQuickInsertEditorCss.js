const buildQuickInsertEditorCss = () => `
.gjs-db-quick-insert {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(112px, 1fr));
  gap: 8px;
}
.gjs-db-quick-insert-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 68px;
  padding: 10px 8px;
  text-align: center;
}
`;

export default buildQuickInsertEditorCss;
