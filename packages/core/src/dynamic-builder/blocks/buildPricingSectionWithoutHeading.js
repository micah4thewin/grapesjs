import buildPricingDefaultChildren from '../marketingComponents/buildPricingDefaultChildren.js';

const buildPricingSectionWithoutHeading = () => {
  const headingClassNames = ['db-pricing-title', 'db-pricing-subtitle'];
  const isHeadingRecord = (contentRecord) =>
    (contentRecord.classes || []).some((className) => headingClassNames.indexOf(className) >= 0);
  const dropHeadingRecords = (contentRecord) =>
    (contentRecord.classes || []).indexOf('db-pricing-header') < 0
      ? contentRecord
      : { ...contentRecord, components: contentRecord.components.filter((child) => !isHeadingRecord(child)) };
  return { type: 'db-pricing', components: buildPricingDefaultChildren().map(dropHeadingRecords) };
};

export default buildPricingSectionWithoutHeading;
