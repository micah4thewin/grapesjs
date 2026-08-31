import createFindingRecord from './createFindingRecord.js';
import walkComponentTree from '../support/walkComponentTree.js';

const checkAutoplayMedia = (auditContext) => {
  const findings = [];
  const flagAutoplayMedia = (mediaLabel) =>
    findings.push(
      createFindingRecord(
        'warning',
        'Media',
        'A ' + mediaLabel + ' element is set to autoplay.',
        'Let visitors start playback themselves; autoplay harms accessibility and data usage.',
      ),
    );
  if (auditContext.canvasBody) {
    auditContext.canvasBody
      .querySelectorAll('video[autoplay], audio[autoplay]')
      .forEach((mediaElement) => flagAutoplayMedia(mediaElement.tagName.toLowerCase()));
    return findings;
  }
  walkComponentTree(auditContext.wrapperComponent, (component) => {
    const tagName = String(component.get('tagName') || '').toLowerCase();
    if (tagName !== 'video' && tagName !== 'audio') return;
    const componentAttributes = component.getAttributes();
    if (componentAttributes.autoplay !== undefined && componentAttributes.autoplay !== false)
      flagAutoplayMedia(tagName);
  });
  return findings;
};

export default checkAutoplayMedia;
