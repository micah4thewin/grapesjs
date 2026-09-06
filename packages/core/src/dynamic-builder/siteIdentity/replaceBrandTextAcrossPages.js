import isTextLeafComponent from './isTextLeafComponent.js';
import walkComponentTree from '../support/walkComponentTree.js';

const replaceBrandTextAcrossPages = (editor, previousName, nextName) => {
  if (!nextName || previousName === nextName) return 0;
  let replacedCount = 0;
  const pageList = editor.Pages && editor.Pages.getAll ? editor.Pages.getAll() : [];
  pageList.forEach((sitePage) => {
    walkComponentTree(sitePage.getMainComponent ? sitePage.getMainComponent() : null, (currentComponent) => {
      if (!currentComponent.getInnerHTML || !isTextLeafComponent(currentComponent)) return;
      const innerText = String(currentComponent.getInnerHTML() || '');
      if (!innerText || innerText.indexOf(previousName) < 0) return;
      currentComponent.components(innerText.split(previousName).join(nextName));
      replacedCount += 1;
    });
  });
  return replacedCount;
};

export default replaceBrandTextAcrossPages;
