import getLockedChildProps from './getLockedChildProps.js';

const buildCarouselDotChildren = (slideCount) =>
  Array.from({ length: Math.max(0, slideCount) }, (unusedValue, slideIndex) => ({
    tagName: 'button',
    name: 'Dot ' + (slideIndex + 1),
    classes: ['db-carousel-dot'],
    ...getLockedChildProps(),
    attributes: { type: 'button', 'aria-label': 'Go to slide ' + (slideIndex + 1) },
  }));

export default buildCarouselDotChildren;
