import buildSchemaSelectFieldMarkup from './buildSchemaSelectFieldMarkup.js';
import buildSchemaTextFieldMarkup from './buildSchemaTextFieldMarkup.js';
import buildSchemaTextareaFieldMarkup from './buildSchemaTextareaFieldMarkup.js';

const buildOrganizationFieldsMarkup = (organizationRecord) =>
  [
    buildSchemaSelectFieldMarkup(
      'organization.type',
      'Organization type',
      'Pick the closest schema.org type.',
      organizationRecord.type || 'Organization',
      [
        ['Organization', 'Organization'],
        ['LocalBusiness', 'Local business'],
        ['ProfessionalService', 'Professional service'],
      ],
    ),
    '<div class="gjs-db-grid-two">',
    buildSchemaTextFieldMarkup('organization.name', 'Name', '', organizationRecord.name),
    buildSchemaTextFieldMarkup('organization.url', 'URL', '', organizationRecord.url),
    '</div>',
    '<div class="gjs-db-grid-two">',
    buildSchemaTextFieldMarkup('organization.logo', 'Logo URL', '', organizationRecord.logo),
    buildSchemaTextFieldMarkup('organization.email', 'Email', '', organizationRecord.email),
    '</div>',
    '<div class="gjs-db-grid-two">',
    buildSchemaTextFieldMarkup('organization.telephone', 'Telephone', '', organizationRecord.telephone),
    buildSchemaTextFieldMarkup('organization.streetAddress', 'Street address', '', organizationRecord.streetAddress),
    '</div>',
    '<div class="gjs-db-grid-two">',
    buildSchemaTextFieldMarkup('organization.addressLocality', 'City', '', organizationRecord.addressLocality),
    buildSchemaTextFieldMarkup('organization.addressRegion', 'Region', '', organizationRecord.addressRegion),
    '</div>',
    '<div class="gjs-db-grid-two">',
    buildSchemaTextFieldMarkup('organization.postalCode', 'Postal code', '', organizationRecord.postalCode),
    buildSchemaTextFieldMarkup('organization.addressCountry', 'Country', '', organizationRecord.addressCountry),
    '</div>',
    buildSchemaTextareaFieldMarkup(
      'organization.sameAs',
      'Social profiles',
      'One URL per line.',
      organizationRecord.sameAs,
    ),
    buildSchemaTextareaFieldMarkup(
      'organization.openingHours',
      'Opening hours',
      'For example: Mo-Fr 09:00-17:00.',
      organizationRecord.openingHours,
    ),
  ].join('');

export default buildOrganizationFieldsMarkup;
