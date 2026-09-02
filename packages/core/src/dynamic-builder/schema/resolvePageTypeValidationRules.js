import getArticleValidationRules from './getArticleValidationRules.js';
import getEventValidationRules from './getEventValidationRules.js';
import getFaqPageValidationRules from './getFaqPageValidationRules.js';
import getProductValidationRules from './getProductValidationRules.js';
import getWebPageValidationRules from './getWebPageValidationRules.js';

const resolvePageTypeValidationRules = (pageType, typeValues) => {
  if (pageType === 'Article') return getArticleValidationRules();
  if (pageType === 'Product') return getProductValidationRules();
  if (pageType === 'Event') return getEventValidationRules(typeValues);
  if (pageType === 'FAQPage') return getFaqPageValidationRules();
  return getWebPageValidationRules();
};

export default resolvePageTypeValidationRules;
