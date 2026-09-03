import parseFlowRecords from './parseFlowRecords.js';
import walkComponentTree from '../support/walkComponentTree.js';

const hasDialogActions = (editor, page) => {
  const allPages = editor.Pages && editor.Pages.getAll ? editor.Pages.getAll() : [];
  const pageList = page ? [page] : allPages;
  return pageList.some((sitePage) => {
    const mainComponent = sitePage.getMainComponent ? sitePage.getMainComponent() : null;
    let dialogFound = false;
    walkComponentTree(mainComponent, (currentComponent) => {
      if (dialogFound || !currentComponent.getAttributes) return;
      const flowRecords = parseFlowRecords(currentComponent.getAttributes()['data-db-flows']);
      if (flowRecords.some((flowRecord) => flowRecord.actions.some((action) => action.type === 'alert'))) {
        dialogFound = true;
      }
    });
    return dialogFound;
  });
};

export default hasDialogActions;
