import createFindingRecord from './createFindingRecord.js';
import resolveAuditThreshold from './resolveAuditThreshold.js';
import walkComponentTree from '../support/walkComponentTree.js';

const checkDomNodeCount = (auditContext) => {
  let nodeCount = 0;
  if (auditContext.canvasRoot) {
    nodeCount = auditContext.canvasRoot.getElementsByTagName('*').length;
  } else {
    walkComponentTree(auditContext.wrapperComponent, () => {
      nodeCount += 1;
    });
  }
  const maxDomNodes = resolveAuditThreshold(auditContext, 'maxDomNodes');
  if (nodeCount <= maxDomNodes) return [];
  return [
    createFindingRecord(
      nodeCount > resolveAuditThreshold(auditContext, 'criticalDomNodes') ? 'error' : 'warning',
      'Document',
      'The page renders ' + nodeCount + ' elements.',
      'Split content across pages or simplify sections; very large pages render slowly on phones.',
    ),
  ];
};

export default checkDomNodeCount;
