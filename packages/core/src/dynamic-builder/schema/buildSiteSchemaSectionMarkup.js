import buildOrganizationFieldsMarkup from './buildOrganizationFieldsMarkup.js';
import buildSchemaSaveRowMarkup from './buildSchemaSaveRowMarkup.js';
import buildWebsiteFieldsMarkup from './buildWebsiteFieldsMarkup.js';
import getIconMarkup from '../support/getIconMarkup.js';
import isPlainRecord from '../support/isPlainRecord.js';

const buildSiteSchemaSectionMarkup = (siteSchemaRecord) => {
  const organizationRecord = isPlainRecord(siteSchemaRecord.organization) ? siteSchemaRecord.organization : {};
  const websiteRecord = isPlainRecord(siteSchemaRecord.website) ? siteSchemaRecord.website : {};
  return [
    '<section class="gjs-db-schema-section" id="gjs-db-schema-panel-site" data-db-schema-section="site"',
    ' role="tabpanel" tabindex="0" aria-labelledby="gjs-db-schema-tab-site" aria-label="Site structured data">',
    '<div class="gjs-db-section-title gjs-db-schema-title-row">',
    getIconMarkup('organization', { size: 16 }),
    '<span>Organization or person</span>',
    '<span class="gjs-db-schema-title-row" data-db-schema-badge="organization"></span>',
    '</div>',
    '<p class="gjs-db-muted gjs-db-schema-intro">Optional. Describes who is behind the site; the name and address',
    ' are prefilled from your SEO settings.</p>',
    buildOrganizationFieldsMarkup(organizationRecord),
    '<div class="gjs-db-section-title gjs-db-schema-title-row">',
    getIconMarkup('globe', { size: 16 }),
    '<span>Website</span>',
    '<span class="gjs-db-schema-title-row" data-db-schema-badge="website"></span>',
    '</div>',
    buildWebsiteFieldsMarkup(websiteRecord),
    buildSchemaSaveRowMarkup('site', 'Save site details'),
    '</section>',
  ].join('');
};

export default buildSiteSchemaSectionMarkup;
