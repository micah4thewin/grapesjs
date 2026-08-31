import isPlainRecord from '../support/isPlainRecord.js';

const resolvePageValidationValues = (pageType, pageFormValues, faqEntryCount) => {
  const readTypeValues = (typeKey) => (isPlainRecord(pageFormValues[typeKey]) ? pageFormValues[typeKey] : {});
  if (pageType === 'Article') return readTypeValues('article');
  if (pageType === 'Product') return readTypeValues('product');
  if (pageType === 'Event') return readTypeValues('event');
  if (pageType === 'FAQPage') return { faqEntries: faqEntryCount ? String(faqEntryCount) : '' };
  return {};
};

export default resolvePageValidationValues;
