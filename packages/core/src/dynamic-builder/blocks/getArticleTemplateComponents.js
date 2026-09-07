import buildCardSampleRecord from './buildCardSampleRecord.js';
import buildHeadingContentRecord from './buildHeadingContentRecord.js';
import buildSectionContentRecord from './buildSectionContentRecord.js';
import buildTemplateHeadingRecords from './buildTemplateHeadingRecords.js';
import buildTextContentRecord from './buildTextContentRecord.js';
import buildThreeUpSampleColumns from './buildThreeUpSampleColumns.js';

const getArticleTemplateComponents = () => [
  { type: 'db-navbar' },
  buildSectionContentRecord(
    [
      { type: 'db-breadcrumb' },
      ...buildTemplateHeadingRecords(
        'A story worth telling',
        'Open with the one idea you want every reader to remember, then earn it paragraph by paragraph.',
        '1',
      ),
      buildTextContentRecord('By Avery Collins. 6 minute read.', 'small'),
      { type: 'db-image' },
      buildTextContentRecord(
        'Start with the moment things changed. A specific scene, a number that surprised you, or a question a customer asked. Give readers a reason to keep going before you explain anything.',
      ),
      { type: 'db-quote' },
      buildTextContentRecord(
        'Close by returning to that first idea and showing what it means now. Tell readers what to do next, whether that is trying something, sharing the piece, or simply thinking differently about it.',
      ),
    ],
    { attributes: { 'data-db-layout': 'narrow' } },
  ),
  buildSectionContentRecord(
    [
      buildHeadingContentRecord('2', 'Keep reading'),
      buildThreeUpSampleColumns(buildCardSampleRecord, 'Related articles'),
    ],
    { centered: true, attributes: { 'data-db-theme': 'light' } },
  ),
  { type: 'db-footer' },
];

export default getArticleTemplateComponents;
