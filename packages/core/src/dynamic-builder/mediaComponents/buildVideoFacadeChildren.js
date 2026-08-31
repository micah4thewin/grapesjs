import getIconMarkup from '../support/getIconMarkup.js';

const buildVideoFacadeChildren = () => [
  {
    tagName: 'button',
    classes: ['db-facade-button'],
    draggable: false,
    droppable: false,
    attributes: { type: 'button', 'data-db-video-load': 'true' },
    components: getIconMarkup('play', { size: 20 }) + '<span>Play video</span>',
  },
  {
    tagName: 'p',
    type: 'text',
    classes: ['db-facade-note'],
    draggable: false,
    droppable: false,
    attributes: { 'data-db-video-note': 'true' },
    components: 'External video loads only after you press play.',
  },
];

export default buildVideoFacadeChildren;
