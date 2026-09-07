import deepMergeRecords from '../support/deepMergeRecords.js';
import isPlainRecord from '../support/isPlainRecord.js';

const resolveFormTextDefaults = (moduleOptions) => {
  const baseTextDefaults = {
    successMessage: 'Thanks! Your message has been received.',
    errorMessage: 'Please fix the highlighted fields and try again.',
    failureMessage: 'Sorry, your message could not be sent. Please try again in a moment.',
    fieldLabelText: 'Field label',
    nameFieldLabelText: 'Full name',
    emailFieldLabelText: 'Email address',
    messageFieldLabelText: 'Message',
    messageFieldHelpText: 'Share as much detail as you like.',
    inputPlaceholderText: 'Type your answer',
    textareaPlaceholderText: 'Write your message here',
    checkboxLabelText: 'Keep me posted with occasional updates',
    selectOptionsText: 'general|General question\nsupport|Support request\nfeedback|Feedback',
    selectPlaceholderText: 'Choose an option',
    radioLegendText: 'Preferred contact method',
    radioOptionsText: 'email|Email\nphone|Phone\npost|Post',
    consentIntroText: 'I agree to the',
    consentLinkText: 'privacy policy',
    honeypotLabelText: 'Leave this field empty',
    submitLabelText: 'Send message',
    sendingLabelText: 'Sending...',
  };
  const overrideRecord =
    isPlainRecord(moduleOptions) && isPlainRecord(moduleOptions.textDefaults) ? moduleOptions.textDefaults : {};
  return deepMergeRecords(baseTextDefaults, overrideRecord);
};

export default resolveFormTextDefaults;
