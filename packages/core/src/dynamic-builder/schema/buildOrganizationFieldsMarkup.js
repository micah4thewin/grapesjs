import buildOrganizationBusinessFieldsMarkup from './buildOrganizationBusinessFieldsMarkup.js';
import buildOrganizationContactFieldsMarkup from './buildOrganizationContactFieldsMarkup.js';
import buildSchemaSelectFieldMarkup from './buildSchemaSelectFieldMarkup.js';
import buildSchemaTextFieldMarkup from './buildSchemaTextFieldMarkup.js';
import buildSchemaTextareaFieldMarkup from './buildSchemaTextareaFieldMarkup.js';
import getOrganizationTypeGroups from './getOrganizationTypeGroups.js';

const buildOrganizationFieldsMarkup = (organizationRecord) =>
  [
    buildSchemaSelectFieldMarkup(
      'organization.type',
      'Who is behind the site',
      'Pick the closest match; local businesses can add opening hours and a price range.',
      organizationRecord.type || 'Organization',
      getOrganizationTypeGroups(),
    ),
    '<div class="gjs-db-grid-two">',
    buildSchemaTextFieldMarkup(
      'organization.name',
      'Name',
      'The official name shown in search results.',
      organizationRecord.name,
    ),
    buildSchemaTextFieldMarkup(
      'organization.url',
      'Website address',
      'The home page address, for example https://www.example.com.',
      organizationRecord.url,
      { type: 'url', placeholder: 'https://www.example.com' },
    ),
    '</div>',
    '<div class="gjs-db-grid-two">',
    '<div data-db-schema-when="organization business">',
    buildSchemaTextFieldMarkup(
      'organization.logo',
      'Logo',
      'Full address of a square logo image, at least 112x112px.',
      organizationRecord.logo,
      { type: 'url', placeholder: 'https://www.example.com/logo.png' },
    ),
    '</div>',
    buildSchemaTextFieldMarkup(
      'organization.image',
      'Photo',
      'Full address of a photo of the place or person.',
      organizationRecord.image,
      { type: 'url', placeholder: 'https://www.example.com/photo.jpg' },
    ),
    '</div>',
    '<div data-db-schema-when="person">',
    buildSchemaTextFieldMarkup(
      'organization.jobTitle',
      'Job title',
      'What you do, for example Photographer or Web designer.',
      organizationRecord.jobTitle,
    ),
    '</div>',
    buildOrganizationContactFieldsMarkup(organizationRecord),
    buildSchemaTextareaFieldMarkup(
      'organization.sameAs',
      'Social profiles',
      'One full address per line, for example https://www.instagram.com/yourname.',
      organizationRecord.sameAs,
    ),
    buildOrganizationBusinessFieldsMarkup(organizationRecord),
  ].join('');

export default buildOrganizationFieldsMarkup;
