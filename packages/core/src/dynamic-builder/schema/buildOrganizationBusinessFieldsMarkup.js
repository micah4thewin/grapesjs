import buildSchemaTextFieldMarkup from './buildSchemaTextFieldMarkup.js';
import buildSchemaTextareaFieldMarkup from './buildSchemaTextareaFieldMarkup.js';

const buildOrganizationBusinessFieldsMarkup = (organizationRecord) =>
  [
    '<div class="gjs-db-schema-group" data-db-schema-when="business">',
    buildSchemaTextareaFieldMarkup(
      'organization.openingHours',
      'Opening hours',
      'One range per line using day codes, for example Mo-Fr 09:00-17:00.',
      organizationRecord.openingHours,
    ),
    buildSchemaTextFieldMarkup(
      'organization.priceRange',
      'Price range',
      'A rough guide such as $$ or 10-40 EUR.',
      organizationRecord.priceRange,
      { placeholder: '$$' },
    ),
    '</div>',
  ].join('');

export default buildOrganizationBusinessFieldsMarkup;
