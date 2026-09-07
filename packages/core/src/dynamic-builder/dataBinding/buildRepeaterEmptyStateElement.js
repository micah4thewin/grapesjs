import buildRepeaterEmptyStateMarkup from './buildRepeaterEmptyStateMarkup.js';
import restoreRepeaterTemplate from './restoreRepeaterTemplate.js';
import buildElementFromMarkup from '../support/buildElementFromMarkup.js';

const buildRepeaterEmptyStateElement = (editor, repeaterComponent, hostElement, settings, hasTemplate) => {
  const emptyMarkup = buildRepeaterEmptyStateMarkup(settings.sourceName, hasTemplate, settings.emptyText);
  const emptyElement = buildElementFromMarkup(hostElement.ownerDocument, emptyMarkup);
  if (!emptyElement) return null;
  const stopAndRun = (buttonElement, runAction) => {
    if (!buttonElement) return;
    buttonElement.addEventListener('click', (clickEvent) => {
      clickEvent.preventDefault();
      clickEvent.stopPropagation();
      runAction();
    });
  };
  stopAndRun(emptyElement.querySelector('[data-db-repeater-restore]'), () =>
    restoreRepeaterTemplate(editor, repeaterComponent),
  );
  stopAndRun(emptyElement.querySelector('[data-db-repeater-edit-data]'), () =>
    editor.runCommand('db:open-data-sources'),
  );
  return emptyElement;
};

export default buildRepeaterEmptyStateElement;
