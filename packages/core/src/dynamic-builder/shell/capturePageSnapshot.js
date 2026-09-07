import getPageDisplayName from './getPageDisplayName.js';

const capturePageSnapshot = (sitePage) => {
  const mainComponent = sitePage.getMainComponent ? sitePage.getMainComponent() : null;
  return {
    pageId: String(sitePage.getId()),
    name: getPageDisplayName(sitePage),
    component: mainComponent && mainComponent.toJSON ? mainComponent.toJSON() : '',
    meta: sitePage.get('dbPageMeta') || null,
  };
};

export default capturePageSnapshot;
