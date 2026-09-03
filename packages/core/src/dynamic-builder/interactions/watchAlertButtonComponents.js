import buildAlertButtonFlowRecord from './buildAlertButtonFlowRecord.js';
import parseFlowRecords from './parseFlowRecords.js';
import serializeFlowRecords from './serializeFlowRecords.js';

const syncAlertButtonFlow = (component) => {
  if (!component || typeof component.get !== 'function') return;
  if (component.get('type') !== 'db-alert-button') return;
  const attributesRecord = component.getAttributes();
  const existingFlows = parseFlowRecords(attributesRecord['data-db-flows']);
  const existingFlowId = existingFlows[0] && existingFlows[0].id;
  const nextFlows = serializeFlowRecords([buildAlertButtonFlowRecord(attributesRecord, existingFlowId)]);
  if (nextFlows === attributesRecord['data-db-flows']) return;
  component.addAttributes({ 'data-db-flows': nextFlows });
};

const watchAlertButtonComponents = (editor) => {
  editor.on('component:add', syncAlertButtonFlow);
  editor.on('component:update:attributes', syncAlertButtonFlow);
};

export default watchAlertButtonComponents;
