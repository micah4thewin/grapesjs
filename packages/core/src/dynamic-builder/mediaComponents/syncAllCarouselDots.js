import syncCarouselDotComponents from './syncCarouselDotComponents.js';

const syncAllCarouselDots = (editor) => {
  const pageList = editor.Pages && editor.Pages.getAll ? editor.Pages.getAll() : [];
  pageList.forEach((sitePage) => {
    const mainComponent = sitePage.getMainComponent ? sitePage.getMainComponent() : null;
    if (!mainComponent || !mainComponent.findType) return;
    mainComponent.findType('db-carousel').forEach(syncCarouselDotComponents);
  });
};

export default syncAllCarouselDots;
