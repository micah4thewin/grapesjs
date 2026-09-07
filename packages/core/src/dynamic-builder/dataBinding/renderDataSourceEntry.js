import buildDataSourceEntryMarkup from './buildDataSourceEntryMarkup.js';
import findDataSourceEntry from './findDataSourceEntry.js';
import buildElementFromMarkup from '../support/buildElementFromMarkup.js';

const renderDataSourceEntry = (formElement, editorState, sourceName, focusSelector) => {
  const sourceEntry = findDataSourceEntry(editorState, sourceName);
  const listElement = formElement.querySelector('[data-db-source-list]');
  if (!sourceEntry || !listElement) return null;
  const nextElement = buildElementFromMarkup(
    formElement.ownerDocument,
    buildDataSourceEntryMarkup(sourceEntry, editorState.usage[sourceName]),
  );
  if (!nextElement) return null;
  const previousElement = listElement.querySelector(`[data-db-source-entry="${CSS.escape(sourceName)}"]`);
  if (previousElement) previousElement.replaceWith(nextElement);
  else listElement.appendChild(nextElement);
  const focusTarget = focusSelector ? nextElement.querySelector(focusSelector) : null;
  if (focusTarget && focusTarget.focus) focusTarget.focus();
  return nextElement;
};

export default renderDataSourceEntry;
