import buildHeadingContentRecord from './buildHeadingContentRecord.js';
import buildNewsletterFormRecord from './buildNewsletterFormRecord.js';
import buildSectionContentRecord from './buildSectionContentRecord.js';
import buildTextContentRecord from './buildTextContentRecord.js';

const buildNewsletterSignupContent = () =>
  buildSectionContentRecord(
    [
      buildHeadingContentRecord('2', 'Stay in the loop'),
      buildTextContentRecord('Monthly product updates and practical guides. No spam, unsubscribe any time.', 'lead'),
      buildNewsletterFormRecord(),
    ],
    { attributes: { 'data-db-layout': 'narrow' } },
  );

export default buildNewsletterSignupContent;
