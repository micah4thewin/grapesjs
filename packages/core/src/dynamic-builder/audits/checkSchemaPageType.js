import collectFaqEntriesFromPage from '../schema/collectFaqEntriesFromPage.js';
import createFindingRecord from './createFindingRecord.js';
import evaluateSchemaValidation from '../schema/evaluateSchemaValidation.js';
import resolvePageTypeValidationRules from '../schema/resolvePageTypeValidationRules.js';
import resolvePageValidationValues from '../schema/resolvePageValidationValues.js';
import resolveSchemaFieldLabels from '../schema/resolveSchemaFieldLabels.js';
import resolveSchemaPageTypeLabel from '../schema/resolveSchemaPageTypeLabel.js';
import resolveSeoRecords from './resolveSeoRecords.js';

const richResultTypes = ['Article', 'Product', 'Event', 'FAQPage'];

const checkSchemaPageType = (auditContext) => {
  const { pageSchema } = resolveSeoRecords(auditContext);
  const pageType = String(pageSchema.pageType || 'WebPage').trim() || 'WebPage';
  const faqEntryCount = collectFaqEntriesFromPage(auditContext.editor, auditContext.page).length;
  const schemaDetails = { fixId: 'open-schema-manager' };
  if (!richResultTypes.includes(pageType)) {
    if (!faqEntryCount) return [];
    return [
      createFindingRecord(
        'info',
        'Structured data',
        'This page has ' + faqEntryCount + ' question and answer pairs but uses the generic page type.',
        'Choose "FAQ page" in the schema manager so search results can show the questions.',
        schemaDetails,
      ),
    ];
  }
  const validationValues = resolvePageValidationValues(pageType, pageSchema, faqEntryCount);
  const validationResult = evaluateSchemaValidation(
    validationValues,
    resolvePageTypeValidationRules(pageType, validationValues),
  );
  const typeLabel = resolveSchemaPageTypeLabel(pageType);
  const findings = [];
  if (validationResult.missingRequired.length) {
    findings.push(
      createFindingRecord(
        'warning',
        'Structured data',
        'The ' +
          typeLabel +
          ' structured data is missing: ' +
          resolveSchemaFieldLabels(pageType, validationResult.missingRequired).join(', ') +
          '.',
        'Fill these in the schema manager so the page qualifies for rich results.',
        schemaDetails,
      ),
    );
  }
  if (validationResult.invalid.length) {
    findings.push(
      createFindingRecord(
        'warning',
        'Structured data',
        'These ' +
          typeLabel +
          ' values need a fix: ' +
          resolveSchemaFieldLabels(pageType, validationResult.invalid).join(', ') +
          '.',
        'Search engines ignore structured data with invalid dates, prices or addresses.',
        schemaDetails,
      ),
    );
  }
  return findings;
};

export default checkSchemaPageType;
