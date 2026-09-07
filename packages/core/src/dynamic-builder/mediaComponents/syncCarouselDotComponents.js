import buildCarouselDotChildren from './buildCarouselDotChildren.js';
import findDescendantWithAttribute from './findDescendantWithAttribute.js';

const syncCarouselDotComponents = (carouselComponent) => {
  const trackComponent = findDescendantWithAttribute(carouselComponent, 'data-db-carousel-track');
  const dotsComponent = findDescendantWithAttribute(carouselComponent, 'data-db-carousel-dots');
  if (!trackComponent || !dotsComponent) return false;
  const slideCount = trackComponent.components().length;
  if (dotsComponent.components().length === slideCount) return false;
  dotsComponent.components(buildCarouselDotChildren(slideCount));
  return true;
};

export default syncCarouselDotComponents;
