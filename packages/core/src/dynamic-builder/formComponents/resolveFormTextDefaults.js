import deepMergeRecords from '../support/deepMergeRecords.js';
import isPlainRecord from '../support/isPlainRecord.js';

const resolveFormTextDefaults = (moduleOptions) => {
  const baseTextDefaults = {
    successMessage: 'Thanks! Your message has been received.',
    errorMessage: 'Please fix the highlighted fields and try again.',
    fieldLabelText: 'Field label',
    nameFieldLabelText: 'Full name',
    emailFieldLabelText: 'Email address',
    messageFieldLabelText: 'Message',
    messageFieldHelpText: 'Share as much detail as you like.',
    inputPlaceholderText: 'Type your answer',
    textareaPlaceholderText: 'Write your message here',
    checkboxLabelText: 'Keep me posted with occasional updates',
    selectOptionsText: 'general|General question\nsupport|Support request\nfeedback|Feedback',
    radioLegendText: 'Preferred contact method',
    radioOptionsText: 'email|Email\nphone|Phone\npost|Post',
    consentIntroText: 'I agree to the',
    consentLinkText: 'privacy policy',
    honeypotLabelText: 'Leave this field empty',
    submitLabelText: 'Send message',
  };
  const overrideRecord =
    isPlainRecord(moduleOptions) && isPlainRecord(moduleOptions.textDefaults) ? moduleOptions.textDefaults : {};
  return deepMergeRecords(baseTextDefaults, overrideRecord);
};

export default resolveFormTextDefaults;
