import buildNewSiteFormMarkup from './buildNewSiteFormMarkup.js';
import escapeHtmlText from '../support/escapeHtmlText.js';

const buildSiteManagerMarkup = (ownerRecord) =>
  [
    '<div class="gjs-db-form gjs-db-sites" data-db-sites-root>',
    '<p class="gjs-db-muted">Sites for ' + escapeHtmlText((ownerRecord && ownerRecord.name) || 'you') + '. ',
    'They are kept in this browser, so use Export to keep a copy of anything you care about.</p>',
    '<ul class="gjs-db-list gjs-db-site-list" data-db-site-list>',
    '<li class="gjs-db-muted">Looking for your sites...</li>',
    '</ul>',
    buildNewSiteFormMarkup(),
    '</div>',
  ].join('');

export default buildSiteManagerMarkup;
