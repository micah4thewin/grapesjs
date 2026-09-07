import countStrippedSlotScripts from './countStrippedSlotScripts.js';
import getSiteCustomCodeRecord from './getSiteCustomCodeRecord.js';
import showToastNotice from '../support/showToastNotice.js';

const warnAboutStrippedSlotScripts = (editor) => {
  editor.on('db:export:complete', () => {
    const strippedCount = countStrippedSlotScripts(getSiteCustomCodeRecord(editor));
    if (!strippedCount) return;
    const countText = strippedCount === 1 ? '1 script' : strippedCount + ' scripts';
    showToastNotice(editor, countText + ' from Custom code left out (scripts are off in Custom code)', {
      kind: 'warning',
      duration: 6000,
    });
  });
};

export default warnAboutStrippedSlotScripts;
