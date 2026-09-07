const isEditorUsable = (editor) =>
  !!(editor && editor.Components && editor.Pages && typeof editor.getProjectData === 'function');

export default isEditorUsable;
