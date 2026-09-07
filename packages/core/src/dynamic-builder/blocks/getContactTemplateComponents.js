import buildColumnsContentRecord from './buildColumnsContentRecord.js';
import buildSectionContentRecord from './buildSectionContentRecord.js';
import buildTemplateIntroSection from './buildTemplateIntroSection.js';

const getContactTemplateComponents = () => [
  { type: 'db-navbar' },
  buildTemplateIntroSection('Get in touch', 'Send us a message and we will get back to you within one business day.'),
  buildSectionContentRecord(
    [
      buildColumnsContentRecord(
        'two',
        [[{ type: 'db-form' }], [{ type: 'db-contact' }, { type: 'db-map' }]],
        'Contact columns',
      ),
    ],
    { attributes: { 'data-db-theme': 'light' } },
  ),
  { type: 'db-footer' },
];

export default getContactTemplateComponents;
