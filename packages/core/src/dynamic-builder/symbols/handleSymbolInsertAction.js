import describeSymbolPlacement from './describeSymbolPlacement.js';
import insertSymbolInstance from './insertSymbolInstance.js';
import resolvePageLevelAncestor from './resolvePageLevelAncestor.js';
import resolveSymbolInsertPlacement from './resolveSymbolInsertPlacement.js';
import revealSymbolInstance from './revealSymbolInstance.js';
import showToastNotice from '../support/showToastNotice.js';

const handleSymbolInsertAction = (editor, symbolRecord) => {
  editor.Modal.close();
  const activePage = editor.Pages && editor.Pages.getSelected ? editor.Pages.getSelected() : null;
  const rootComponent = activePage && activePage.getMainComponent ? activePage.getMainComponent() : null;
  const anchorComponent = resolvePageLevelAncestor(editor.getSelected && editor.getSelected(), rootComponent);
  const placement = resolveSymbolInsertPlacement(editor, symbolRecord);
  const insertOptions = anchorComponent
    ? { at: rootComponent.components().indexOf(anchorComponent) + 1 }
    : { placement };
  const instanceComponent = insertSymbolInstance(editor, symbolRecord.id, activePage, insertOptions);
  if (!instanceComponent) return;
  revealSymbolInstance(editor, instanceComponent);
  const whereText = anchorComponent
    ? 'below your selection.'
    : 'at ' + describeSymbolPlacement(placement) + ' of this page.';
  showToastNotice(editor, '"' + symbolRecord.name + '" added ' + whereText, { kind: 'success' });
};

export default handleSymbolInsertAction;
