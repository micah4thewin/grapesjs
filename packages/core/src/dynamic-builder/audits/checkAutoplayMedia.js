import buildFindingDetails from './buildFindingDetails.js';
import createFindingRecord from './createFindingRecord.js';
import walkComponentTree from '../support/walkComponentTree.js';

const checkAutoplayMedia = (auditContext) => {
  const findings = [];
  const flagAutoplayMedia = (mediaLabel, targetNode) =>
    findings.push(
      createFindingRecord(
        'warning',
        'Media',
        'A ' + mediaLabel + ' starts playing automatically.',
        'Let visitors start playback themselves; autoplay distracts and costs mobile data.',
        buildFindingDetails(targetNode, 'remove-autoplay'),
      ),
    );
  if (auditContext.canvasRoot) {
    auditContext.canvasRoot
      .querySelectorAll('video[autoplay], audio[autoplay]')
      .forEach((mediaElement) => flagAutoplayMedia(mediaElement.tagName.toLowerCase(), mediaElement));
    return findings;
  }
  walkComponentTree(auditContext.wrapperComponent, (component) => {
    const tagName = String(component.get('tagName') || '').toLowerCase();
    if (tagName !== 'video' && tagName !== 'audio') return;
    const componentAttributes = component.getAttributes();
    if (componentAttributes.autoplay !== undefined && componentAttributes.autoplay !== false)
      flagAutoplayMedia(tagName, component);
  });
  return findings;
};

export default checkAutoplayMedia;
