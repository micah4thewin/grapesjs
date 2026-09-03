import parseFlowRecords from './parseFlowRecords.js';

const readComponentFlows = (component) => {
  if (!component || typeof component.getAttributes !== 'function') return [];
  return parseFlowRecords(component.getAttributes()['data-db-flows']);
};

export default readComponentFlows;
