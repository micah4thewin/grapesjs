import serializeFlowRecords from './serializeFlowRecords.js';

const writeComponentFlows = (component, flowRecords) => {
  if (!component || typeof component.addAttributes !== 'function') return '';
  const serializedFlows = serializeFlowRecords(flowRecords);
  if (serializedFlows) {
    component.addAttributes({ 'data-db-flows': serializedFlows });
  } else if (typeof component.removeAttributes === 'function') {
    component.removeAttributes('data-db-flows');
  }
  return serializedFlows;
};

export default writeComponentFlows;
