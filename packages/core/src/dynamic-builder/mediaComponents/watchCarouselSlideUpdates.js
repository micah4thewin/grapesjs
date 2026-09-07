import findAncestorOfType from './findAncestorOfType.js';
import syncCarouselDotComponents from './syncCarouselDotComponents.js';

const isSlideComponent = (component) => Boolean(component && component.is && component.is('db-carousel-slide'));

const watchCarouselSlideUpdates = (editor) => {
  editor.on('component:add', (component) => {
    if (!isSlideComponent(component)) return;
    const carouselComponent = findAncestorOfType(component, 'db-carousel');
    if (carouselComponent) syncCarouselDotComponents(carouselComponent);
  });
  editor.on('component:remove', (component) => {
    if (!isSlideComponent(component)) return;
    const wrapperComponent = editor.getWrapper && editor.getWrapper();
    if (!wrapperComponent || !wrapperComponent.findType) return;
    wrapperComponent.findType('db-carousel').forEach(syncCarouselDotComponents);
  });
};

export default watchCarouselSlideUpdates;
