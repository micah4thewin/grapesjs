import buildListEditorMarkup from './buildListEditorMarkup.js';
import dispatchListEditorEvent from './dispatchListEditorEvent.js';
import resolveTraitInnerElement from '../traits/resolveTraitInnerElement.js';

const createInteractiveListTraitDefinition = (editor, listSpec) => ({
  noLabel: true,
  eventCapture: ['click', 'change'],
  createInput: ({ component }) => buildListEditorMarkup(listSpec, listSpec.buildRowsMarkup(component, editor)),
  onEvent: ({ component, elInput, event }) => {
    const eventTarget = event && event.target && event.target.closest ? event.target : null;
    if (!eventTarget || !component) return;
    const shouldRerender = dispatchListEditorEvent(component, eventTarget, event.type, listSpec, editor);
    if (!shouldRerender) return;
    const rowsElement = resolveTraitInnerElement(elInput, '[data-db-list-rows]');
    if (rowsElement) rowsElement.innerHTML = listSpec.buildRowsMarkup(component, editor);
  },
});

export default createInteractiveListTraitDefinition;
