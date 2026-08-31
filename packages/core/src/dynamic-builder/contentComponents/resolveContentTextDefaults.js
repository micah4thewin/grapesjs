import deepMergeRecords from '../support/deepMergeRecords.js';
import isPlainRecord from '../support/isPlainRecord.js';

const resolveContentTextDefaults = (moduleOptions) => {
  const baseTextDefaults = {
    headingText: 'Heading',
    paragraphText: 'Write a short, friendly paragraph that guides readers toward the next step on this page.',
    quoteText: 'The details are not the details. They make the design.',
    quoteCiteText: 'Charles Eames',
    calloutTitleText: 'Good to know',
    calloutBodyText: 'Use this callout to highlight helpful context without interrupting the reading flow.',
    buttonLabelText: 'Learn more',
    secondaryButtonLabelText: 'See details',
    listItemTexts: [
      'First key point readers should remember',
      'Second key point with supporting detail',
      'Third key point that closes the thought',
    ],
  };
  const overrideRecord =
    isPlainRecord(moduleOptions) && isPlainRecord(moduleOptions.textDefaults) ? moduleOptions.textDefaults : {};
  return deepMergeRecords(baseTextDefaults, overrideRecord);
};

export default resolveContentTextDefaults;
