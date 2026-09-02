import buildValidationBadgeMarkup from './buildValidationBadgeMarkup.js';
import collectFaqEntriesFromPage from './collectFaqEntriesFromPage.js';
import collectSchemaFormValues from './collectSchemaFormValues.js';
import evaluateSchemaValidation from './evaluateSchemaValidation.js';
import getOrganizationValidationRules from './getOrganizationValidationRules.js';
import getWebSiteValidationRules from './getWebSiteValidationRules.js';
import resolvePageTypeValidationRules from './resolvePageTypeValidationRules.js';
import resolvePageValidationValues from './resolvePageValidationValues.js';
import resolveSchemaTargetPage from './resolveSchemaTargetPage.js';

const refreshSchemaValidationBadges = (editor, rootElement) => {
  const setBadgeMarkup = (badgeName, validationResult) => {
    const badgeSlot = rootElement.querySelector('[data-db-schema-badge="' + badgeName + '"]');
    if (badgeSlot) badgeSlot.innerHTML = buildValidationBadgeMarkup(validationResult);
  };
  const siteFormValues = collectSchemaFormValues(rootElement.querySelector('[data-db-schema-section="site"]'));
  const pageFormValues = collectSchemaFormValues(rootElement.querySelector('[data-db-schema-section="page"]'));
  setBadgeMarkup(
    'organization',
    evaluateSchemaValidation(siteFormValues.organization, getOrganizationValidationRules()),
  );
  setBadgeMarkup('website', evaluateSchemaValidation(siteFormValues.website, getWebSiteValidationRules()));
  const pageType = String(pageFormValues.pageType || 'WebPage');
  const faqEntryCount =
    pageType === 'FAQPage' ? collectFaqEntriesFromPage(editor, resolveSchemaTargetPage(editor)).length : 0;
  const pageValidationValues = resolvePageValidationValues(pageType, pageFormValues, faqEntryCount);
  setBadgeMarkup(
    'page',
    evaluateSchemaValidation(pageValidationValues, resolvePageTypeValidationRules(pageType, pageValidationValues)),
  );
  const faqCountElement = rootElement.querySelector('[data-db-schema-faq-count]');
  if (faqCountElement && pageType === 'FAQPage') {
    faqCountElement.textContent = faqEntryCount + ' question and answer pairs found';
  }
};

export default refreshSchemaValidationBadges;
