import applyBindingPreviewInElement from './applyBindingPreviewInElement.js';
import attachRepeaterPreviewNode from './attachRepeaterPreviewNode.js';
import buildRepeaterEmptyStateElement from './buildRepeaterEmptyStateElement.js';
import expandRepeaterElement from './expandRepeaterElement.js';
import findRepeaterTemplateComponent from './findRepeaterTemplateComponent.js';
import getDataSourceRegistry from './getDataSourceRegistry.js';
import listSelectedElements from './listSelectedElements.js';
import removeRepeaterPreviewNodes from './removeRepeaterPreviewNodes.js';
import resolveRepeaterItems from './resolveRepeaterItems.js';
import resolveRepeaterSettings from './resolveRepeaterSettings.js';
import syncTemplateIdStyles from './syncTemplateIdStyles.js';

const renderRepeaterPreview = (editor, repeaterComponent) => {
  const editorModel = editor.getModel();
  const hostElement = repeaterComponent && repeaterComponent.getEl ? repeaterComponent.getEl() : null;
  if (!hostElement || !hostElement.ownerDocument || editorModel.get('dbRepeaterRenderBusy')) return;
  editorModel.set('dbRepeaterRenderBusy', true);
  try {
    removeRepeaterPreviewNodes(hostElement);
    const registryRecord = getDataSourceRegistry(editor);
    const settings = resolveRepeaterSettings(repeaterComponent.getAttributes());
    const templateComponent = findRepeaterTemplateComponent(repeaterComponent);
    syncTemplateIdStyles(editor, templateComponent);
    const sourceItems = templateComponent ? resolveRepeaterItems(registryRecord, settings) : [];
    if (!templateComponent || !sourceItems.length) {
      const emptyElement = buildRepeaterEmptyStateElement(
        editor,
        repeaterComponent,
        hostElement,
        settings,
        Boolean(templateComponent),
      );
      if (emptyElement) hostElement.appendChild(emptyElement);
    } else {
      const stageElement = hostElement.ownerDocument.createElement('div');
      stageElement.innerHTML = repeaterComponent.toHTML();
      const stageRepeater = stageElement.firstElementChild;
      if (stageRepeater) {
        expandRepeaterElement(registryRecord, stageRepeater, { startIndex: 1 });
        Array.from(stageRepeater.children).forEach((itemElement, itemIndex) =>
          attachRepeaterPreviewNode(editor, hostElement, itemElement, templateComponent, itemIndex + 2),
        );
      }
    }
    applyBindingPreviewInElement(editor, hostElement, { skipElements: listSelectedElements(editor) });
  } finally {
    editorModel.set('dbRepeaterRenderBusy', false);
  }
};

export default renderRepeaterPreview;
