import applyLimitOffsetToItems from './applyLimitOffsetToItems.js';
import buildRepeaterEmptyStateMarkup from './buildRepeaterEmptyStateMarkup.js';
import getDataSourceRegistry from './getDataSourceRegistry.js';
import parseWholeNumberValue from './parseWholeNumberValue.js';
import replaceBindingTokensInText from './replaceBindingTokensInText.js';
import resolveSourceItems from './resolveSourceItems.js';

const renderRepeaterPreview = (editor, repeaterComponent) => {
  const editorModel = editor.getModel();
  if (!repeaterComponent || editorModel.get('dbRepeaterRenderBusy')) return;
  editorModel.set('dbRepeaterRenderBusy', true);
  try {
    const componentAttributes = repeaterComponent.getAttributes();
    const registryRecord = getDataSourceRegistry(editor);
    const sourceName = componentAttributes['data-db-source'] || '';
    const offsetValue = parseWholeNumberValue(componentAttributes['data-db-offset'], 0);
    const limitValue = parseWholeNumberValue(componentAttributes['data-db-limit'], 0);
    repeaterComponent
      .components()
      .filter((childComponent) => Boolean(childComponent.getAttributes()['data-db-repeater-preview']))
      .forEach((previewComponent) => previewComponent.remove());
    const templateComponent = repeaterComponent
      .components()
      .find((childComponent) => Boolean(childComponent.getAttributes()['data-db-repeater-item']));
    const sourceItems = applyLimitOffsetToItems(
      resolveSourceItems(registryRecord[sourceName]),
      offsetValue,
      limitValue,
    );
    const appendPreviewMarkup = (previewMarkup) => {
      const appendedComponents = repeaterComponent.append(previewMarkup) || [];
      appendedComponents.forEach((appendedComponent) => {
        appendedComponent.removeAttributes(['data-db-repeater-item', 'data-db-type']);
        appendedComponent.addAttributes({ 'data-db-repeater-preview': 'true' });
        appendedComponent.set({
          locked: true,
          selectable: false,
          hoverable: false,
          draggable: false,
          copyable: false,
          layerable: false,
        });
      });
    };
    if (!templateComponent || !sourceItems.length) {
      appendPreviewMarkup(buildRepeaterEmptyStateMarkup(sourceName, Boolean(templateComponent)));
      return;
    }
    const templateMarkup = templateComponent.toHTML();
    sourceItems.forEach((sourceItem) =>
      appendPreviewMarkup(replaceBindingTokensInText({ ...registryRecord, item: sourceItem }, templateMarkup)),
    );
  } finally {
    editorModel.set('dbRepeaterRenderBusy', false);
  }
};

export default renderRepeaterPreview;
