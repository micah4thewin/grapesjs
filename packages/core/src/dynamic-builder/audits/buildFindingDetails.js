import resolveAuditElementComponent from './resolveAuditElementComponent.js';

const buildFindingDetails = (targetNode, fixId) => {
  const component = resolveAuditElementComponent(targetNode);
  const componentId = component && component.getId ? String(component.getId() || '') : '';
  const elementId = targetNode && !component && targetNode.id ? String(targetNode.id) : '';
  return { componentId: componentId || elementId, fixId: fixId || '' };
};

export default buildFindingDetails;
