import applyAnchorIdValue from './applyAnchorIdValue.js';

const watchAnchorUpdates = (editor) => {
  editor.on('component:update:dbAnchor', (component) => applyAnchorIdValue(editor, component));
};

export default watchAnchorUpdates;
