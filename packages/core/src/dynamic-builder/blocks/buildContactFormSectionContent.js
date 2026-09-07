import buildHeadingContentRecord from './buildHeadingContentRecord.js';
import buildSectionContentRecord from './buildSectionContentRecord.js';
import buildTextContentRecord from './buildTextContentRecord.js';

const buildContactFormSectionContent = () =>
  buildSectionContentRecord(
    [
      buildHeadingContentRecord('2', 'Get in touch'),
      buildTextContentRecord('Send us a message and we will reply within one business day.', 'lead'),
      { type: 'db-form' },
    ],
    { attributes: { 'data-db-layout': 'narrow' } },
  );

export default buildContactFormSectionContent;
