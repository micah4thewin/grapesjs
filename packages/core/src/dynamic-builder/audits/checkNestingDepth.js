import createFindingRecord from './createFindingRecord.js';
import resolveAuditThreshold from './resolveAuditThreshold.js';

const measureChildDepth = (childItems, currentDepth, measureItem) => {
  let maxDepth = currentDepth;
  childItems.forEach((childItem) => {
    const childDepth = measureItem(childItem, currentDepth + 1);
    if (childDepth > maxDepth) maxDepth = childDepth;
  });
  return maxDepth;
};

const measureElementDepth = (element, currentDepth) =>
  measureChildDepth(Array.from(element.children || []), currentDepth, measureElementDepth);

const measureComponentDepth = (component, currentDepth) => {
  const childComponents = component && component.components ? component.components() : null;
  return measureChildDepth(childComponents ? childComponents.models || [] : [], currentDepth, measureComponentDepth);
};

const checkNestingDepth = (auditContext) => {
  const deepestLevel = auditContext.canvasRoot
    ? measureElementDepth(auditContext.canvasRoot, 0)
    : measureComponentDepth(auditContext.wrapperComponent, 0);
  const maxNestingDepth = resolveAuditThreshold(auditContext, 'maxNestingDepth');
  if (deepestLevel <= maxNestingDepth) return [];
  return [
    createFindingRecord(
      'warning',
      'Document',
      'Elements are nested ' + deepestLevel + ' levels deep.',
      'Remove wrapper boxes that only hold one child; deep nesting slows the browser down.',
    ),
  ];
};

export default checkNestingDepth;
