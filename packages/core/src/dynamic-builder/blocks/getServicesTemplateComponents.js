import buildTemplateHeadingRecords from './buildTemplateHeadingRecords.js';
import buildTemplateSectionRecord from './buildTemplateSectionRecord.js';

const getServicesTemplateComponents = () => [
  { type: 'db-navbar' },
  buildTemplateSectionRecord(
    buildTemplateHeadingRecords(
      'What we do',
      'Clear scopes, honest timelines, and work we are proud to put our name on.',
    ),
  ),
  { type: 'db-features' },
  buildTemplateSectionRecord([{ type: 'db-stats' }]),
  buildTemplateSectionRecord([...buildTemplateHeadingRecords('How engagements work', ''), { type: 'db-accordion' }]),
  buildTemplateSectionRecord([...buildTemplateHeadingRecords('Ready when you are', ''), { type: 'db-button-group' }], {
    'data-db-theme': 'brand',
  }),
  { type: 'db-footer' },
];

export default getServicesTemplateComponents;
