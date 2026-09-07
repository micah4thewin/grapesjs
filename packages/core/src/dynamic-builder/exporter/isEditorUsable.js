const isEditorUsable = (editor) =>
  !!(editor && editor.Components && editor.Pages && typeof editor.getHtml === 'function');

export default isEditorUsable;
