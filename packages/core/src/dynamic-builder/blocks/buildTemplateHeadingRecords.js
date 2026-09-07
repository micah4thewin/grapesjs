import buildHeadingContentRecord from './buildHeadingContentRecord.js';
import buildTextContentRecord from './buildTextContentRecord.js';

const buildTemplateHeadingRecords = (headingText, introText, headingLevel = '2') => [
  buildHeadingContentRecord(headingLevel, headingText),
  ...(introText ? [buildTextContentRecord(introText, 'lead')] : []),
];

export default buildTemplateHeadingRecords;
