import collectSeoFormValues from './collectSeoFormValues.js';

const collectSeoModalValues = (rootElement) => ({
  siteValues: collectSeoFormValues(rootElement.querySelector('[data-db-seo-section="site"]')),
  pageValues: collectSeoFormValues(rootElement.querySelector('[data-db-seo-section="page"]')),
});

export default collectSeoModalValues;
