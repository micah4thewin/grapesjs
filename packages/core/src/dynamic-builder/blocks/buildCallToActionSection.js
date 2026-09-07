import buildHeadingContentRecord from './buildHeadingContentRecord.js';
import buildSectionContentRecord from './buildSectionContentRecord.js';
import buildTextContentRecord from './buildTextContentRecord.js';

const buildCallToActionSection = (headingText, introText) =>
  buildSectionContentRecord(
    [
      buildHeadingContentRecord('2', headingText),
      buildTextContentRecord(introText, 'lead'),
      { type: 'db-button-group', attributes: { 'data-db-align': 'center' } },
    ],
    { centered: true, attributes: { 'data-db-theme': 'brand', 'data-db-layout': 'narrow' } },
  );

export default buildCallToActionSection;
