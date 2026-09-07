import applyMediaLinkRecord from './applyMediaLinkRecord.js';
import parseMediaLinkRecord from './parseMediaLinkRecord.js';
import showToastNotice from '../support/showToastNotice.js';

const watchMediaLinkPastes = (editor) => {
  editor.on('component:update:attributes:data-db-paste-link', (component) => {
    if (!component || !component.is || !component.getAttributes) return;
    const linkText = String(component.getAttributes()['data-db-paste-link'] || '').trim();
    if (!linkText) return;
    const resultRecord = applyMediaLinkRecord(component, parseMediaLinkRecord(linkText));
    component.removeAttributes(['data-db-paste-link']);
    showToastNotice(editor, resultRecord.text, { kind: resultRecord.kind, duration: 4500 });
  });
};

export default watchMediaLinkPastes;
