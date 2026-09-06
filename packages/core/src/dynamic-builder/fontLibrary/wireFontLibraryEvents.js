import applyFontSelection from './applyFontSelection.js';
import buildFontListMarkup from './buildFontListMarkup.js';
import showToastNotice from '../support/showToastNotice.js';

const wireFontLibraryEvents = (editor, designTokenOptions, modalElement, initialChoices) => {
  const viewState = { categoryId: 'all', searchQuery: '', choices: { ...initialChoices } };
  const renderLists = () =>
    ['display', 'body'].forEach((roleName) => {
      const listElement = modalElement.querySelector(`[data-db-font-list="${roleName}"]`);
      if (listElement)
        listElement.innerHTML = buildFontListMarkup(
          roleName,
          viewState.choices[roleName],
          viewState.categoryId,
          viewState.searchQuery,
        );
      const currentElement = modalElement.querySelector(`[data-db-font-current="${roleName}"]`);
      if (currentElement) currentElement.textContent = viewState.choices[roleName] || 'Site default';
    });
  const searchElement = modalElement.querySelector('[data-db-font-search]');
  if (searchElement) {
    searchElement.addEventListener('input', () => {
      viewState.searchQuery = searchElement.value;
      renderLists();
    });
  }
  modalElement.addEventListener('click', (clickEvent) => {
    const target = clickEvent.target && clickEvent.target.closest ? clickEvent.target : null;
    if (!target) return;
    const chip = target.closest('[data-db-font-category-chip]');
    if (chip) {
      viewState.categoryId = chip.getAttribute('data-db-font-category-chip');
      modalElement
        .querySelectorAll('[data-db-font-category-chip]')
        .forEach((element) => element.classList.toggle('gjs-db-chip-active', element === chip));
      renderLists();
      return;
    }
    const card = target.closest('[data-db-font-choice]');
    if (card) {
      viewState.choices[card.getAttribute('data-db-font-role')] = card.getAttribute('data-db-font-choice');
      renderLists();
      return;
    }
    if (target.closest('[data-db-font-reset]')) {
      viewState.choices = { display: '', body: '' };
      renderLists();
      return;
    }
    if (!target.closest('[data-db-font-apply]')) return;
    applyFontSelection(editor, designTokenOptions, viewState.choices);
    editor.Modal.close();
    const summary =
      [viewState.choices.display, viewState.choices.body].filter(Boolean).join(' and ') || 'site defaults';
    showToastNotice(editor, `Fonts set to ${summary}`, { kind: 'success' });
  });
};

export default wireFontLibraryEvents;
