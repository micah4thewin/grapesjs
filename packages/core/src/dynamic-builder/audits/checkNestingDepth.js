import createFindingRecord from './createFindingRecord.js';

const checkNestingDepth = (auditContext) => {
  const measureElementDepth = (element, currentDepth) => {
    let maxDepth = currentDepth;
    Array.from(element.children || []).forEach((childElement) => {
      const childDepth = measureElementDepth(childElement, currentDepth + 1);
      if (childDepth > maxDepth) maxDepth = childDepth;
    });
    return maxDepth;
  };
  const measureComponentDepth = (component, currentDepth) => {
    let maxDepth = currentDepth;
    const childComponents = component && component.components ? component.components() : null;
    childComponents &&
      childComponents.forEach((childComponent) => {
        const childDepth = measureComponentDepth(childComponent, currentDepth + 1);
        if (childDepth > maxDepth) maxDepth = childDepth;
      });
    return maxDepth;
  };
  const deepestLevel = auditContext.canvasBody
    ? measureElementDepth(auditContext.canvasBody, 0)
    : measureComponentDepth(auditContext.wrapperComponent, 0);
  if (deepestLevel <= 14) return [];
  return [
    createFindingRecord(
      'warning',
      'Document',
      'Elements are nested ' + deepestLevel + ' levels deep.',
      'Flatten wrapper elements; deep nesting slows style recalculation and complicates CSS.',
    ),
  ];
};

export default checkNestingDepth;
