const buildSeoSaveRowMarkup = () =>
  [
    '<div class="gjs-db-button-row gjs-db-seo-save-row">',
    '<button type="button" class="gjs-db-button gjs-db-button-primary" data-db-seo-save>Save</button>',
    '<button type="button" class="gjs-db-button" data-db-seo-cancel>Cancel</button>',
    '<span class="gjs-db-muted gjs-db-seo-dirty-note" data-db-seo-dirty hidden>Unsaved changes</span>',
    '<span class="gjs-db-visually-hidden" data-db-seo-announcer role="status" aria-live="polite"></span>',
    '</div>',
  ].join('');

export default buildSeoSaveRowMarkup;
