import createFindingRecord from './createFindingRecord.js';
import resolveAuditThreshold from './resolveAuditThreshold.js';
import walkComponentTree from '../support/walkComponentTree.js';

const checkIframeCount = (auditContext) => {
  let iframeCount = 0;
  if (auditContext.canvasRoot) {
    iframeCount = auditContext.canvasRoot.querySelectorAll('iframe').length;
  } else {
    walkComponentTree(auditContext.wrapperComponent, (component) => {
      if (String(component.get('tagName') || '').toLowerCase() === 'iframe') iframeCount += 1;
    });
  }
  if (iframeCount <= resolveAuditThreshold(auditContext, 'maxIframes')) return [];
  return [
    createFindingRecord(
      'warning',
      'Embeds',
      'The page embeds ' + iframeCount + ' external frames.',
      'Each embed loads a whole extra page; replace some with a click-to-load preview.',
    ),
  ];
};

export default checkIframeCount;
