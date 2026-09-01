import buildTemplateHeadingRecords from './buildTemplateHeadingRecords.js';
import buildTemplateSectionRecord from './buildTemplateSectionRecord.js';

const getArticleTemplateComponents = () => [
  { type: 'db-navbar' },
  buildTemplateSectionRecord([
    { type: 'db-breadcrumb' },
    ...buildTemplateHeadingRecords(
      'A story worth telling',
      'Open with the one idea you want every reader to remember, then earn it paragraph by paragraph.',
    ),
    { type: 'db-image' },
    { type: 'db-text' },
    { type: 'db-quote' },
    { type: 'db-text' },
  ]),
  buildTemplateSectionRecord([
    ...buildTemplateHeadingRecords('Keep reading', ''),
    {
      type: 'db-columns',
      attributes: { 'data-db-columns': 'three' },
      components: [
        { type: 'db-column', components: [{ type: 'db-card' }] },
        { type: 'db-column', components: [{ type: 'db-card' }] },
        { type: 'db-column', components: [{ type: 'db-card' }] },
      ],
    },
  ]),
  { type: 'db-footer' },
];

export default getArticleTemplateComponents;
