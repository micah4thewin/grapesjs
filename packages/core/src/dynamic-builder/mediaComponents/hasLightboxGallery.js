import walkComponentTree from '../support/walkComponentTree.js';

const hasLightboxGallery = (editor, page) => {
  const allPages = editor.Pages && editor.Pages.getAll ? editor.Pages.getAll() : [];
  const pageList = page ? [page] : allPages;
  return pageList.some((sitePage) => {
    const mainComponent = sitePage.getMainComponent ? sitePage.getMainComponent() : null;
    let galleryFound = false;
    walkComponentTree(mainComponent, (currentComponent) => {
      if (galleryFound || !currentComponent.getAttributes) return;
      const attributeRecord = currentComponent.getAttributes();
      if (attributeRecord['data-db-type'] === 'gallery' && attributeRecord['data-db-lightbox'] !== 'false')
        galleryFound = true;
    });
    return galleryFound;
  });
};

export default hasLightboxGallery;
