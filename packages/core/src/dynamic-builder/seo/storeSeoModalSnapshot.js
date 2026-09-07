import collectSeoModalValues from './collectSeoModalValues.js';

const storeSeoModalSnapshot = (rootElement) => {
  rootElement.dataset.dbSeoSnapshot = JSON.stringify(collectSeoModalValues(rootElement));
};

export default storeSeoModalSnapshot;
