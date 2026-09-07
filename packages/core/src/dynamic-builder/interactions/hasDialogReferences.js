import getSiteCustomCodeRecord from '../exporter/getSiteCustomCodeRecord.js';
import walkComponentTree from '../support/walkComponentTree.js';

const dialogFunctionName = 'dbShowDialog';

const hasDialogReferences = (editor, page) => {
  const customCodeRecord = getSiteCustomCodeRecord(editor);
  if (!customCodeRecord.allowScripts) return false;
  const slotText = [customCodeRecord.headHtml, customCodeRecord.bodyStartHtml, customCodeRecord.bodyEndHtml].join('\n');
  if (slotText.indexOf(dialogFunctionName) >= 0) return true;
  const allPages = editor.Pages && editor.Pages.getAll ? editor.Pages.getAll() : [];
  const pageList = page ? [page] : allPages;
  return pageList.some((sitePage) => {
    const mainComponent = sitePage.getMainComponent ? sitePage.getMainComponent() : null;
    let referenceFound = false;
    walkComponentTree(mainComponent, (currentComponent) => {
      if (referenceFound || !currentComponent.get || currentComponent.get('type') !== 'db-custom-script') return;
      const scriptCode = String((currentComponent.getAttributes() || {}).scriptCode || '');
      if (scriptCode.indexOf(dialogFunctionName) >= 0) referenceFound = true;
    });
    return referenceFound;
  });
};

export default hasDialogReferences;
