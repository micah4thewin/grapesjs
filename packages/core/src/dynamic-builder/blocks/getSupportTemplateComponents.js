import buildColumnsContentRecord from './buildColumnsContentRecord.js';
import buildSectionContentRecord from './buildSectionContentRecord.js';
import buildTemplateHeadingRecords from './buildTemplateHeadingRecords.js';
import buildTemplateIntroSection from './buildTemplateIntroSection.js';

const getSupportTemplateComponents = () => [
  { type: 'db-navbar' },
  buildTemplateIntroSection('How can we help?', 'Answers to the questions we hear most, all in one place.'),
  buildSectionContentRecord([{ type: 'db-accordion' }], { attributes: { 'data-db-layout': 'narrow' } }),
  buildSectionContentRecord(
    [
      ...buildTemplateHeadingRecords('Still stuck?', 'Send us a message and a real person will reply.'),
      buildColumnsContentRecord('two', [[{ type: 'db-form' }], [{ type: 'db-contact' }]], 'Support columns'),
    ],
    { attributes: { 'data-db-theme': 'light' } },
  ),
  { type: 'db-footer' },
];

export default getSupportTemplateComponents;
