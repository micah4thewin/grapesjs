import escapeHtmlText from '../support/escapeHtmlText.js';

const buildSiteCardRowsMarkup = (siteRecord) => {
  const safeName = escapeHtmlText(siteRecord.name);
  return [
    '<div class="gjs-db-button-row gjs-db-site-row" data-db-site-row="rename" role="group"',
    ' aria-label="Rename ' + safeName + '" hidden>',
    '<input class="gjs-db-field-input" type="text" maxlength="80" data-db-site-rename-input',
    ' value="' + safeName + '" aria-label="New name for ' + safeName + '">',
    '<button type="button" class="gjs-db-button gjs-db-button-primary" data-db-site-action="confirm-rename">',
    'Save name</button>',
    '<button type="button" class="gjs-db-button" data-db-site-action="cancel-rename">Cancel</button>',
    '</div>',
    '<div class="gjs-db-button-row gjs-db-site-row" data-db-site-row="delete" role="group"',
    ' aria-label="Delete ' + safeName + '" hidden>',
    '<span class="gjs-db-muted">Delete ' + safeName + ' and all of its pages? This cannot be undone.</span>',
    '<button type="button" class="gjs-db-button gjs-db-button-danger" data-db-site-action="confirm-delete">',
    'Delete site</button>',
    '<button type="button" class="gjs-db-button" data-db-site-action="cancel-delete">Keep site</button>',
    '</div>',
  ].join('');
};

export default buildSiteCardRowsMarkup;
