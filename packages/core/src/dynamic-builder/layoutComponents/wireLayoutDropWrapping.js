import wrapLayoutDroppedOnPage from './wrapLayoutDroppedOnPage.js';

const wireLayoutDropWrapping = (editor) => {
  const wrapDropped = (droppedValue) => {
    const droppedList = Array.isArray(droppedValue) ? droppedValue : [droppedValue];
    droppedList.forEach((droppedComponent) => wrapLayoutDroppedOnPage(editor, droppedComponent));
  };
  editor.on('block:drag:stop', (droppedComponent) => wrapDropped(droppedComponent));
  editor.on('component:drag:end', (dragPayload) => wrapDropped(dragPayload && dragPayload.target));
};

export default wireLayoutDropWrapping;
