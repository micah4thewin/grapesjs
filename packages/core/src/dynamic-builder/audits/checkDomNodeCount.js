import createFindingRecord from './createFindingRecord.js';
import walkComponentTree from '../support/walkComponentTree.js';

const checkDomNodeCount = (auditContext) => {
  let nodeCount = 0;
  if (auditContext.canvasBody) {
    nodeCount = auditContext.canvasBody.getElementsByTagName('*').length;
  } else {
    walkComponentTree(auditContext.wrapperComponent, () => {
      nodeCount += 1;
    });
  }
  if (nodeCount <= 1500) return [];
  return [
    createFindingRecord(
      nodeCount > 3000 ? 'error' : 'warning',
      'Document',
      'The page renders ' + nodeCount + ' DOM nodes.',
      'Split content across pages or simplify components; large DOM trees slow rendering.',
    ),
  ];
};

export default checkDomNodeCount;
