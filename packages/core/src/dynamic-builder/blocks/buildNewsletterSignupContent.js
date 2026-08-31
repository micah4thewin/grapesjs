import buildFormFieldContentRecord from './buildFormFieldContentRecord.js';
import buildHeadingContentRecord from './buildHeadingContentRecord.js';
import buildTextContentRecord from './buildTextContentRecord.js';

const buildNewsletterSignupContent = () => {
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
    type: 'db-section',
    attributes: { 'data-db-layout': 'narrow' },
    components: [
      {
        type: 'db-container',
        components: [
          buildHeadingContentRecord('2', 'Stay in the loop'),
          buildTextContentRecord(
            'Monthly product updates and practical guides. No spam, unsubscribe any time.',
            'lead',
          ),
          {
            type: 'db-form',
            attributes: {
              name: 'newsletter-signup',
              'data-db-success-message': 'Thanks for subscribing! Please check your inbox to confirm.',
            },
            components: [
              emailFieldRecord,
              { type: 'db-consent-checkbox' },
              { type: 'db-honeypot' },
              { type: 'db-submit-button', components: 'Subscribe' },
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
          },
        ],
      },
    ],
  };
};

export default buildNewsletterSignupContent;
