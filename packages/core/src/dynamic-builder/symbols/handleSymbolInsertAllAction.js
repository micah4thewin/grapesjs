import describeSymbolPlacement from './describeSymbolPlacement.js';
import insertSymbolOnEveryPage from './insertSymbolOnEveryPage.js';
import resolveSymbolInsertPlacement from './resolveSymbolInsertPlacement.js';
import showToastNotice from '../support/showToastNotice.js';

const handleSymbolInsertAllAction = (editor, symbolRecord, libraryCallbacks) => {
  const placement = resolveSymbolInsertPlacement(editor, symbolRecord);
  const insertedCount = insertSymbolOnEveryPage(editor, symbolRecord.id, { placement });
  const pagesText = insertedCount === 1 ? ' more page.' : ' more pages.';
  showToastNotice(
    editor,
    insertedCount
      ? 'Added to ' + describeSymbolPlacement(placement) + ' of ' + insertedCount + pagesText
      : 'Every page already has it.',
    { kind: 'success' },
  );
  libraryCallbacks.refresh();
};

export default handleSymbolInsertAllAction;
