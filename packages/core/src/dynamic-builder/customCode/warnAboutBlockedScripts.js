import countBlockedScriptComponents from './countBlockedScriptComponents.js';
import getSiteCustomCodeRecord from '../exporter/getSiteCustomCodeRecord.js';
import showToastNotice from '../support/showToastNotice.js';

const warnAboutBlockedScripts = (editor) => {
  editor.on('db:export:complete', () => {
    if (getSiteCustomCodeRecord(editor).allowScripts) return;
    const blockedCount = countBlockedScriptComponents(editor);
    if (!blockedCount) return;
    const blockLabel = blockedCount === 1 ? 'script block was' : 'script blocks were';
    showToastNotice(editor, `${blockedCount} custom ${blockLabel} left out. Allow script tags in Custom code.`, {
      kind: 'warning',
      duration: 6000,
    });
  });
};

export default warnAboutBlockedScripts;
