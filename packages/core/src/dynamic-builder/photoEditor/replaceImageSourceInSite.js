import isEditorLive from '../support/isEditorLive.js';
import walkComponentTree from '../support/walkComponentTree.js';

const replaceComponentSource = (componentModel, previousSource, nextSource) => {
  const attributeRecord = componentModel.getAttributes ? componentModel.getAttributes() : {};
  const usesAttribute = String(attributeRecord.src || '') === previousSource;
  const usesProperty = String((componentModel.get && componentModel.get('src')) || '') === previousSource;
  if (!usesAttribute && !usesProperty) return 0;
  if (usesAttribute && componentModel.addAttributes) componentModel.addAttributes({ src: nextSource });
  if (usesProperty && componentModel.set) componentModel.set('src', nextSource);
  return 1;
};

const replaceImageSourceInSite = (editor, previousSource, nextSource) => {
  if (!isEditorLive(editor) || !previousSource || !nextSource || previousSource === nextSource) return 0;
  const pageManager = editor.Pages;
  const pageModels = pageManager && pageManager.getAll ? pageManager.getAll() : [];
  let changedCount = 0;
  pageModels.forEach((pageModel) => {
    const rootComponent = pageModel.getMainComponent ? pageModel.getMainComponent() : null;
    walkComponentTree(rootComponent, (componentModel) => {
      changedCount += replaceComponentSource(componentModel, previousSource, nextSource);
    });
  });
  return changedCount;
};

export default replaceImageSourceInSite;
