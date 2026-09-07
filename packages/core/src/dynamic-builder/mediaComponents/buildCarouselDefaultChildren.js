import buildCarouselControlChild from './buildCarouselControlChild.js';
import buildCarouselDotChildren from './buildCarouselDotChildren.js';
import getLockedChildProps from './getLockedChildProps.js';

const buildCarouselDefaultChildren = () => [
  {
    tagName: 'div',
    name: 'Slides',
    classes: ['db-carousel-track'],
    draggable: false,
    droppable: '[data-db-type=carousel-slide]',
    removable: false,
    copyable: false,
    attributes: { 'data-db-carousel-track': 'true' },
    components: [{ type: 'db-carousel-slide' }, { type: 'db-carousel-slide' }, { type: 'db-carousel-slide' }],
  },
  buildCarouselControlChild('prev', 'Previous slide', ['arrowLeft']),
  buildCarouselControlChild('next', 'Next slide', ['arrowRight']),
  buildCarouselControlChild('pause', 'Pause slides', ['pauseCircle', 'play'], { 'aria-pressed': 'false' }),
  {
    tagName: 'div',
    name: 'Dots',
    classes: ['db-carousel-dots'],
    ...getLockedChildProps(),
    attributes: { 'data-db-carousel-dots': 'true' },
    components: buildCarouselDotChildren(3),
  },
  {
    tagName: 'p',
    name: 'Status',
    classes: ['db-carousel-status'],
    ...getLockedChildProps(),
    attributes: { 'data-db-carousel-status': 'true', 'aria-live': 'polite' },
  },
];

export default buildCarouselDefaultChildren;
