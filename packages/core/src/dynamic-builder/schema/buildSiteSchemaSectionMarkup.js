import buildOrganizationFieldsMarkup from './buildOrganizationFieldsMarkup.js';
import buildSchemaSaveRowMarkup from './buildSchemaSaveRowMarkup.js';
import buildWebsiteFieldsMarkup from './buildWebsiteFieldsMarkup.js';
import getIconMarkup from '../support/getIconMarkup.js';
import isPlainRecord from '../support/isPlainRecord.js';

const buildSiteSchemaSectionMarkup = (siteSchemaRecord) => {
  const organizationRecord = isPlainRecord(siteSchemaRecord.organization) ? siteSchemaRecord.organization : {};
  const websiteRecord = isPlainRecord(siteSchemaRecord.website) ? siteSchemaRecord.website : {};
  return [
    '<section class="gjs-db-schema-section" data-db-schema-section="site" aria-label="Site structured data">',
    '<div class="gjs-db-section-title gjs-db-schema-title-row">',
    getIconMarkup('organization', { size: 16 }),
    '<span>Organization</span>',
    '<span data-db-schema-badge="organization"></span>',
    '</div>',
    buildOrganizationFieldsMarkup(organizationRecord),
    '<div class="gjs-db-section-title gjs-db-schema-title-row">',
    getIconMarkup('globe', { size: 16 }),
    '<span>Website</span>',
    '<span data-db-schema-badge="website"></span>',
    '</div>',
    buildWebsiteFieldsMarkup(websiteRecord),
    buildSchemaSaveRowMarkup('site', 'Save site schema'),
    '</section>',
  ].join('');
};

export default buildSiteSchemaSectionMarkup;
