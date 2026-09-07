import walkComponentTree from '../support/walkComponentTree.js';
import isComponentOfType from './isComponentOfType.js';
import syncPricingSection from './syncPricingSection.js';
import syncStatValueFromAttributes from './syncStatValueFromAttributes.js';

const watchSiteLocaleUpdates = (editor) => {
  editor.on('db:site-meta:update', (siteMetaRecord) => {
    if (!siteMetaRecord || !siteMetaRecord.seo) return;
    walkComponentTree(editor.getWrapper ? editor.getWrapper() : null, (currentComponent) => {
      if (isComponentOfType(currentComponent, 'db-pricing')) syncPricingSection(currentComponent);
      if (isComponentOfType(currentComponent, 'db-stat')) syncStatValueFromAttributes(currentComponent);
    });
  });
};

export default watchSiteLocaleUpdates;
