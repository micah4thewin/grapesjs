import buildCustomKitRecord from './buildCustomKitRecord.js';
import downloadTextFile from '../support/downloadTextFile.js';
import parseCustomKitList from './parseCustomKitList.js';
import showToastNotice from '../support/showToastNotice.js';
import writeCustomDesignKits from './writeCustomDesignKits.js';

const wireCustomKitActions = (editor, moduleOptions, kitsElement, kitState, renderGrids) => {
  const nameInput = kitsElement.querySelector('[data-db-kit-name]');
  const importInput = kitsElement.querySelector('[data-db-kit-import-input]');
  const persistKits = (nextKits, noticeText) => {
    kitState.custom = nextKits;
    if (!writeCustomDesignKits(nextKits)) {
      showToastNotice(editor, 'Kits could not be saved in this browser', { kind: 'warning' });
    } else if (noticeText) {
      showToastNotice(editor, noticeText, { kind: 'success' });
    }
    renderGrids();
  };
  const saveCurrentKit = () => {
    const kitName = nameInput ? nameInput.value.trim() : '';
    if (!kitName) {
      showToastNotice(editor, 'Give the kit a name first', { kind: 'warning' });
      if (nameInput) nameInput.focus();
      return;
    }
    persistKits(kitState.custom.concat([buildCustomKitRecord(editor, moduleOptions, kitName)]), `${kitName} saved to My kits`);
    if (nameInput) nameInput.value = '';
  };
  const importKitsFromText = (jsonText) => {
    const importedKits = parseCustomKitList(jsonText);
    if (!importedKits.length) {
      showToastNotice(editor, 'That file has no kits in it', { kind: 'warning' });
      return;
    }
    const keptKits = kitState.custom.filter(
      (kitRecord) => !importedKits.some((importedKit) => importedKit.kitId === kitRecord.kitId),
    );
    const importedCount = importedKits.length;
    persistKits(keptKits.concat(importedKits), `${importedCount} kit${importedCount === 1 ? '' : 's'} imported`);
  };
  kitsElement.addEventListener('click', (clickEvent) => {
    const targetElement = clickEvent.target && clickEvent.target.closest ? clickEvent.target : null;
    if (!targetElement) return;
    const removeButton = targetElement.closest('[data-db-kit-remove]');
    if (removeButton) {
      const removedId = removeButton.getAttribute('data-db-kit-remove');
      persistKits(
        kitState.custom.filter((kitRecord) => kitRecord.kitId !== removedId),
        'Kit removed',
      );
      return;
    }
    if (targetElement.closest('[data-db-kit-save]')) saveCurrentKit();
    else if (targetElement.closest('[data-db-kit-export]')) {
      downloadTextFile('design-kits.json', 'application/json', JSON.stringify(kitState.custom, null, 2));
    } else if (targetElement.closest('[data-db-kit-import]') && importInput) importInput.click();
  });
  if (nameInput) {
    nameInput.addEventListener('keydown', (keyEvent) => {
      if (keyEvent.key !== 'Enter') return;
      keyEvent.preventDefault();
      saveCurrentKit();
    });
  }
  if (!importInput) return;
  importInput.addEventListener('change', () => {
    const chosenFile = importInput.files && importInput.files[0];
    importInput.value = '';
    if (!chosenFile) return;
    chosenFile
      .text()
      .then(importKitsFromText)
      .catch(() => showToastNotice(editor, 'That file could not be read', { kind: 'warning' }));
  });
};

export default wireCustomKitActions;
