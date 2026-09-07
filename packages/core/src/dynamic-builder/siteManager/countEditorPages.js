const countEditorPages = (editor) => {
  const pagesModule = editor && editor.Pages;
  const pageRecords = pagesModule && typeof pagesModule.getAll === 'function' ? pagesModule.getAll() : [];
  return pageRecords.length;
};

export default countEditorPages;
