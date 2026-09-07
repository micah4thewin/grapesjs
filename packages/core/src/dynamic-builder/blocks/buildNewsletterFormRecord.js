import buildFormFieldContentRecord from './buildFormFieldContentRecord.js';

const buildNewsletterFormRecord = (buttonLabel = 'Subscribe') => {
  const emailFieldRecord = buildFormFieldContentRecord(
    'Email address',
    {
      type: 'db-input',
      attributes: {
        type: 'email',
        name: 'email',
        autocomplete: 'email',
        required: 'required',
        placeholder: 'you@example.com',
      },
    },
    { required: true },
  );
  return {
    type: 'db-form',
    attributes: {
      name: 'newsletter-signup',
      'data-db-success-message': 'Thanks for subscribing! Please check your inbox to confirm.',
    },
    components: [
      emailFieldRecord,
      { type: 'db-consent-checkbox' },
      { type: 'db-honeypot' },
      { type: 'db-submit-button', components: buttonLabel },
      {
        tagName: 'div',
        classes: ['db-form-status'],
        attributes: {
          role: 'status',
          'aria-live': 'polite',
          'data-db-form-status': 'true',
          'data-db-form-child': 'true',
        },
      },
    ],
  };
};

export default buildNewsletterFormRecord;
