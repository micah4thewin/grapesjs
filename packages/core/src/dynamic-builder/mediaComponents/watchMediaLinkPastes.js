import applyMediaLinkRecord from './applyMediaLinkRecord.js';
import isEditorLive from '../support/isEditorLive.js';
import parseMediaLinkRecord from './parseMediaLinkRecord.js';
import probeImageUrl from './probeImageUrl.js';
import showToastNotice from '../support/showToastNotice.js';

const describeBrokenLink = (linkText) =>
  'That address did not load as a picture (' +
  linkText.slice(0, 60) +
  (linkText.length > 60 ? '...' : '') +
  '). Open the picture itself in your browser, copy its address from the address bar, or save it and upload it here.';

const applyPictureLink = (editor, component, linkText, linkRecord) => {
  const canvasDocument = editor.Canvas && editor.Canvas.getDocument ? editor.Canvas.getDocument() : null;
  if (!canvasDocument || typeof canvasDocument.createElement !== 'function') {
    const resultRecord = applyMediaLinkRecord(component, linkRecord);
    showToastNotice(editor, resultRecord.text, { kind: resultRecord.kind, duration: 4500 });
    return;
  }
  showToastNotice(editor, 'Checking that picture link...', { duration: 2000 });
  probeImageUrl(canvasDocument, linkRecord.url).then((didLoad) => {
    if (!isEditorLive(editor)) return;
    if (!didLoad) {
      showToastNotice(editor, describeBrokenLink(linkText), { kind: 'error', duration: 9000 });
      return;
    }
    const resultRecord = applyMediaLinkRecord(component, linkRecord);
    showToastNotice(editor, resultRecord.text, { kind: resultRecord.kind, duration: 4500 });
  });
};

const watchMediaLinkPastes = (editor) => {
  editor.on('component:update:attributes:data-db-paste-link', (component) => {
    if (!component || !component.is || !component.getAttributes) return;
    const linkText = String(component.getAttributes()['data-db-paste-link'] || '').trim();
    if (!linkText) return;
    const linkRecord = parseMediaLinkRecord(linkText);
    component.removeAttributes(['data-db-paste-link']);
    const isPictureTarget = !component.is('db-video') && !component.is('db-map');
    if (isPictureTarget && linkRecord && (linkRecord.kind === 'image' || linkRecord.kind === 'link')) {
      applyPictureLink(editor, component, linkText, linkRecord);
      return;
    }
    const resultRecord = applyMediaLinkRecord(component, linkRecord);
    showToastNotice(editor, resultRecord.text, { kind: resultRecord.kind, duration: 4500 });
  });
};

export default watchMediaLinkPastes;
