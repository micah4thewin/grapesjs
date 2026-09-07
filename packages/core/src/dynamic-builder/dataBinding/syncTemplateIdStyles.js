import listComponentIdStyleRules from '../support/listComponentIdStyleRules.js';
import promoteIdStylesToClass from '../support/promoteIdStylesToClass.js';
import walkComponentTree from '../support/walkComponentTree.js';

const clearPromotedClassRules = (editor, generatedClassName) => {
  if (!editor.Css || !editor.Css.getRules) return;
  editor.Css.getRules('.' + generatedClassName).forEach((styleRule) => styleRule.setStyle({}));
};

const syncTemplateIdStyles = (editor, templateComponent) => {
  if (!templateComponent || !editor.Css) return;
  const runSync = () =>
    walkComponentTree(templateComponent, (currentComponent) => {
      const componentId = currentComponent && currentComponent.getId ? currentComponent.getId() : '';
      if (!componentId) return;
      const generatedClassName = 'db-rep-' + componentId;
      if (listComponentIdStyleRules(editor, componentId).length) {
        promoteIdStylesToClass(editor, currentComponent, generatedClassName);
        return;
      }
      const classList = currentComponent.getClasses ? currentComponent.getClasses() : [];
      if (classList.indexOf(generatedClassName) >= 0) clearPromotedClassRules(editor, generatedClassName);
    });
  const undoManager = editor.UndoManager;
  if (undoManager && typeof undoManager.skip === 'function') undoManager.skip(runSync);
  else runSync();
};

export default syncTemplateIdStyles;
