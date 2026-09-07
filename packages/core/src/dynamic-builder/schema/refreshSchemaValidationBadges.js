import buildRichResultReadinessMarkup from './buildRichResultReadinessMarkup.js';
import buildValidationBadgeMarkup from './buildValidationBadgeMarkup.js';
import collectFaqEntriesFromPage from './collectFaqEntriesFromPage.js';
import collectSchemaFormValues from './collectSchemaFormValues.js';
import evaluateSchemaValidation from './evaluateSchemaValidation.js';
import formatFaqCountText from './formatFaqCountText.js';
import getOrganizationValidationRules from './getOrganizationValidationRules.js';
import getWebSiteValidationRules from './getWebSiteValidationRules.js';
import isPlainRecord from '../support/isPlainRecord.js';
import resolvePageTypeValidationRules from './resolvePageTypeValidationRules.js';
import resolvePageValidationValues from './resolvePageValidationValues.js';
import resolveSchemaTargetPage from './resolveSchemaTargetPage.js';

const refreshSchemaValidationBadges = (editor, rootElement) => {
  const setSlotMarkup = (slotSelector, slotMarkup) => {
    const slotElement = rootElement.querySelector(slotSelector);
    if (slotElement) slotElement.innerHTML = slotMarkup;
  };
  const siteFormValues = collectSchemaFormValues(rootElement.querySelector('[data-db-schema-section="site"]'));
  const pageFormValues = collectSchemaFormValues(rootElement.querySelector('[data-db-schema-section="page"]'));
  const organizationValues = isPlainRecord(siteFormValues.organization) ? siteFormValues.organization : {};
  const isOrganizationUntouched =
    !String(organizationValues.name || '').trim() && !String(organizationValues.url || '').trim();
  setSlotMarkup(
    '[data-db-schema-badge="organization"]',
    buildValidationBadgeMarkup(
      evaluateSchemaValidation(organizationValues, getOrganizationValidationRules(organizationValues)),
      'organization',
      { isUntouched: isOrganizationUntouched },
    ),
  );
  setSlotMarkup(
    '[data-db-schema-badge="website"]',
    buildValidationBadgeMarkup(
      evaluateSchemaValidation(siteFormValues.website, getWebSiteValidationRules()),
      'website',
    ),
  );
  const pageType = String(pageFormValues.pageType || 'WebPage');
  const faqEntryCount =
    pageType === 'FAQPage' ? collectFaqEntriesFromPage(editor, resolveSchemaTargetPage(editor)).length : 0;
  const pageValidationValues = resolvePageValidationValues(pageType, pageFormValues, faqEntryCount);
  const pageValidation = evaluateSchemaValidation(
    pageValidationValues,
    resolvePageTypeValidationRules(pageType, pageValidationValues),
  );
  setSlotMarkup('[data-db-schema-badge="page"]', buildValidationBadgeMarkup(pageValidation, pageType));
  setSlotMarkup('[data-db-schema-readiness]', buildRichResultReadinessMarkup(pageType, pageValidation));
  const faqCountElement = rootElement.querySelector('[data-db-schema-faq-count]');
  if (faqCountElement && pageType === 'FAQPage') faqCountElement.textContent = formatFaqCountText(faqEntryCount);
};

export default refreshSchemaValidationBadges;
