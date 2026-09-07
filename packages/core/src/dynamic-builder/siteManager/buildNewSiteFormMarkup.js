const buildNewSiteFormMarkup = () =>
  [
    '<form class="gjs-db-form gjs-db-site-new" data-db-site-new-form>',
    '<div class="gjs-db-section-title">Start a new site</div>',
    '<label class="gjs-db-field"><span class="gjs-db-field-label">Site name</span>',
    '<input class="gjs-db-field-input" name="siteName" type="text" maxlength="80"',
    ' placeholder="Bakery on Main" autocomplete="off"></label>',
    '<label class="gjs-db-field"><span class="gjs-db-field-label">What it is for (optional)</span>',
    '<input class="gjs-db-field-input" name="siteDescription" type="text" maxlength="140"',
    ' placeholder="Menu, opening hours and directions" autocomplete="off"></label>',
    '<p class="gjs-db-field-help">The new site opens with one blank home page. Your current site is saved first.</p>',
    '<p class="gjs-db-field-error-text" data-db-site-error role="alert"></p>',
    '<div class="gjs-db-button-row">',
    '<button type="submit" class="gjs-db-button gjs-db-button-primary">Create site</button>',
    '</div>',
    '</form>',
  ].join('');

export default buildNewSiteFormMarkup;
