import createFindingRecord from './createFindingRecord.js';
import walkComponentTree from '../support/walkComponentTree.js';

const checkIframeCount = (auditContext) => {
  let iframeCount = 0;
  if (auditContext.canvasBody) {
    iframeCount = auditContext.canvasBody.querySelectorAll('iframe').length;
  } else {
    walkComponentTree(auditContext.wrapperComponent, (component) => {
      if (String(component.get('tagName') || '').toLowerCase() === 'iframe') iframeCount += 1;
    });
  }
  if (iframeCount <= 3) return [];
  return [
    createFindingRecord(
      'warning',
      'Embeds',
      'The page embeds ' + iframeCount + ' iframes.',
      'Each iframe loads a full document; replace embeds with click-to-load placeholders.',
    ),
  ];
};

export default checkIframeCount;
