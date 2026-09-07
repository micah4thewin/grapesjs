import getIconMarkup from '../support/getIconMarkup.js';
import getLockedChildProps from './getLockedChildProps.js';

const buildVideoFacadeChildren = () => [
  {
    tagName: 'button',
    classes: ['db-facade-button'],
    ...getLockedChildProps(),
    attributes: { type: 'button', 'data-db-video-load': 'true' },
    components: getIconMarkup('play', { size: 20 }) + '<span>Play video</span>',
  },
  {
    tagName: 'p',
    classes: ['db-facade-note'],
    ...getLockedChildProps(),
    attributes: { 'data-db-video-note': 'true' },
    components: 'External video loads only after you press play.',
  },
];

export default buildVideoFacadeChildren;
