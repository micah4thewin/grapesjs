import buildBlockDefinition from './buildBlockDefinition.js';
import buildFormFieldContentRecord from './buildFormFieldContentRecord.js';
import buildNewsletterSignupContent from './buildNewsletterSignupContent.js';

const buildFormBlocks = () => [
  buildBlockDefinition('db-contact-form', 'Contact form', 'Forms', 'form', { type: 'db-form' }),
  buildBlockDefinition(
    'db-newsletter-signup',
    'Newsletter signup',
    'Forms',
    'newsletter',
    buildNewsletterSignupContent(),
  ),
  buildBlockDefinition('db-form-field', 'Form field', 'Forms', 'edit', { type: 'db-form-field' }),
  buildBlockDefinition(
    'db-select-field',
    'Select field',
    'Forms',
    'chevronDown',
    buildFormFieldContentRecord('Topic', { type: 'db-select' }, {}),
  ),
  buildBlockDefinition('db-radio-group', 'Radio group', 'Forms', 'check', { type: 'db-radio-group' }),
  buildBlockDefinition(
    'db-file-upload-field',
    'File upload field',
    'Forms',
    'upload',
    buildFormFieldContentRecord('Attachment', { type: 'db-file-input' }, { helpText: 'PDF or image up to 10 MB.' }),
  ),
];

export default buildFormBlocks;
