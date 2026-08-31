import getIconMarkup from '../support/getIconMarkup.js';

const buildCarouselDefaultChildren = () => {
  const buildDotButton = (slideNumber) => ({
    tagName: 'button',
    classes: ['db-carousel-dot'],
    draggable: false,
    droppable: false,
    attributes: { type: 'button', 'aria-label': 'Go to slide ' + slideNumber },
  });
  const buildControlButton = (directionKey, labelText, iconName) => ({
    tagName: 'button',
    classes: ['db-carousel-control', 'db-carousel-' + directionKey],
    draggable: false,
    droppable: false,
    attributes: { type: 'button', 'aria-label': labelText, ['data-db-carousel-' + directionKey]: 'true' },
    components: getIconMarkup(iconName, { size: 18 }),
  });
  return [
    {
      tagName: 'div',
      classes: ['db-carousel-track'],
      draggable: false,
      droppable: '[data-db-type=carousel-slide]',
      attributes: { 'data-db-carousel-track': 'true' },
      components: [{ type: 'db-carousel-slide' }, { type: 'db-carousel-slide' }, { type: 'db-carousel-slide' }],
    },
    buildControlButton('prev', 'Previous slide', 'arrowLeft'),
    buildControlButton('next', 'Next slide', 'arrowRight'),
    {
      tagName: 'div',
      classes: ['db-carousel-dots'],
      draggable: false,
      droppable: false,
      attributes: { 'data-db-carousel-dots': 'true' },
      components: [buildDotButton(1), buildDotButton(2), buildDotButton(3)],
    },
    {
      tagName: 'p',
      classes: ['db-carousel-status'],
      draggable: false,
      droppable: false,
      attributes: { 'data-db-carousel-status': 'true', 'aria-live': 'polite' },
    },
  ];
};

export default buildCarouselDefaultChildren;
