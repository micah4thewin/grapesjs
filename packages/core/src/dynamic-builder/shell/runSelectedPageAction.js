import runPagesMenuAction from './runPagesMenuAction.js';

const runSelectedPageAction = (editor, actionName) => {
  const selectedPage = editor.Pages && editor.Pages.getSelected && editor.Pages.getSelected();
  if (!selectedPage) return;
  runPagesMenuAction(editor, actionName, String(selectedPage.getId()));
};

export default runSelectedPageAction;
