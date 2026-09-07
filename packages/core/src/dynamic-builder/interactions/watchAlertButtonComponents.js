import ensureStableComponentId from './ensureStableComponentId.js';
import getAlertAttributeNames from './getAlertAttributeNames.js';
import mergeAlertFlowIntoRecords from './mergeAlertFlowIntoRecords.js';
import parseFlowRecords from './parseFlowRecords.js';
import refreshAlertButtonTraits from './refreshAlertButtonTraits.js';
import serializeFlowRecords from './serializeFlowRecords.js';

const isAlertButton = (component) =>
  !!component && typeof component.get === 'function' && component.get('type') === 'db-alert-button';

const syncAlertButtonFlow = (component) => {
  if (!isAlertButton(component)) return;
  const attributesRecord = component.getAttributes();
  const existingFlows = parseFlowRecords(attributesRecord['data-db-flows']);
  const nextFlows = serializeFlowRecords(mergeAlertFlowIntoRecords(existingFlows, attributesRecord));
  if (nextFlows === String(attributesRecord['data-db-flows'] || '')) return;
  component.addAttributes({ 'data-db-flows': nextFlows });
};

const pinChosenForm = (editor, component) => {
  if (!isAlertButton(component)) return;
  const formSelector = String(component.getAttributes()['data-db-alert-form'] || '').trim();
  const wrapperComponent = editor.getWrapper && editor.getWrapper();
  if (!formSelector || !wrapperComponent) return;
  const formComponent = wrapperComponent.find(formSelector)[0];
  if (formComponent) ensureStableComponentId(editor, formComponent);
};

const watchAlertButtonComponents = (editor) => {
  editor.on('component:add', syncAlertButtonFlow);
  getAlertAttributeNames().forEach((attributeName) =>
    editor.on('component:update:attributes:' + attributeName, syncAlertButtonFlow),
  );
  editor.on('component:update:attributes:data-db-alert-form', (component) => pinChosenForm(editor, component));
  editor.on('component:update:attributes:data-db-alert-then', (component) =>
    refreshAlertButtonTraits(editor, component),
  );
  editor.on('component:selected', (component) => refreshAlertButtonTraits(editor, component));
};

export default watchAlertButtonComponents;
