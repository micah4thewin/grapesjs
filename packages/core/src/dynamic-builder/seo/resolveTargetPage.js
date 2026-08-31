const resolveTargetPage = (editor, page) =>
  page || (editor.Pages && editor.Pages.getSelected && editor.Pages.getSelected()) || null;

export default resolveTargetPage;
