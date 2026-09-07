import buildLinkControlMarkup from './buildLinkControlMarkup.js';
import handleLinkControlEvent from './handleLinkControlEvent.js';
import readLinkRecord from './readLinkRecord.js';
import syncLinkControl from './syncLinkControl.js';

const createLinkTraitDefinition = (editor) => ({
  eventCapture: ['change', 'click'],
  createInput: ({ trait, component }) => buildLinkControlMarkup(editor, trait, readLinkRecord(editor, component)),
  onEvent: ({ component, elInput, event }) => {
    if (handleLinkControlEvent(editor, component, elInput, event)) syncLinkControl(editor, component, elInput);
  },
  onUpdate: ({ component, elInput }) => {
    syncLinkControl(editor, component, elInput);
  },
});

export default createLinkTraitDefinition;
