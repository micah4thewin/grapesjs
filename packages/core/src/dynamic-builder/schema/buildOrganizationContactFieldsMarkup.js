import buildSchemaTextFieldMarkup from './buildSchemaTextFieldMarkup.js';

const addressFieldKeys = ['streetAddress', 'addressLocality', 'addressRegion', 'postalCode', 'addressCountry'];

const buildOrganizationContactFieldsMarkup = (organizationRecord) => {
  const hasAddress = addressFieldKeys.some((fieldKey) => String(organizationRecord[fieldKey] || '').trim());
  return [
    '<div class="gjs-db-grid-two">',
    buildSchemaTextFieldMarkup(
      'organization.email',
      'Email',
      'Public contact email, for example hello@example.com.',
      organizationRecord.email,
      { type: 'email', placeholder: 'hello@example.com' },
    ),
    buildSchemaTextFieldMarkup(
      'organization.telephone',
      'Phone',
      'Include the country code, for example +1 555 0100.',
      organizationRecord.telephone,
      { type: 'tel', placeholder: '+1 555 0100' },
    ),
    '</div>',
    '<details class="gjs-db-schema-details"' + (hasAddress ? ' open' : '') + '>',
    '<summary class="gjs-db-schema-summary">' + (hasAddress ? 'Address' : 'Add an address') + '</summary>',
    '<div class="gjs-db-schema-group">',
    buildSchemaTextFieldMarkup(
      'organization.streetAddress',
      'Street address',
      'Street and number, as visitors would find you.',
      organizationRecord.streetAddress,
    ),
    '<div class="gjs-db-grid-two">',
    buildSchemaTextFieldMarkup(
      'organization.addressLocality',
      'City',
      'Town or city.',
      organizationRecord.addressLocality,
    ),
    buildSchemaTextFieldMarkup(
      'organization.addressRegion',
      'Region',
      'State, province or county.',
      organizationRecord.addressRegion,
    ),
    '</div>',
    '<div class="gjs-db-grid-two">',
    buildSchemaTextFieldMarkup(
      'organization.postalCode',
      'Postal code',
      'ZIP or postcode.',
      organizationRecord.postalCode,
    ),
    buildSchemaTextFieldMarkup(
      'organization.addressCountry',
      'Country',
      'Two-letter code such as US or GB works best.',
      organizationRecord.addressCountry,
      { placeholder: 'US' },
    ),
    '</div>',
    '</div>',
    '</details>',
  ].join('');
};

export default buildOrganizationContactFieldsMarkup;
