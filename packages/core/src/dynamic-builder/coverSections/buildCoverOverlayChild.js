const buildCoverOverlayChild = () => ({
  tagName: 'span',
  classes: ['db-cover-overlay'],
  attributes: { 'data-db-cover-overlay': 'true', 'aria-hidden': 'true' },
  draggable: false,
  droppable: false,
  removable: false,
  copyable: false,
  selectable: false,
  hoverable: false,
  layerable: false,
});

export default buildCoverOverlayChild;
