import buildTemplateHeadingRecords from './buildTemplateHeadingRecords.js';
import buildTemplateSectionRecord from './buildTemplateSectionRecord.js';

const getSupportTemplateComponents = () => [
  { type: 'db-navbar' },
  buildTemplateSectionRecord(
    buildTemplateHeadingRecords('How can we help?', 'Answers to the questions we hear most, all in one place.'),
  ),
  buildTemplateSectionRecord([{ type: 'db-accordion' }]),
  buildTemplateSectionRecord([
    ...buildTemplateHeadingRecords('Still stuck?', 'Send us a message and a real person will reply.'),
    {
      type: 'db-columns',
      attributes: { 'data-db-columns': 'two' },
      components: [
        { type: 'db-column', components: [{ type: 'db-form' }] },
        { type: 'db-column', components: [{ type: 'db-contact' }] },
      ],
    },
  ]),
  { type: 'db-footer' },
];

export default getSupportTemplateComponents;
