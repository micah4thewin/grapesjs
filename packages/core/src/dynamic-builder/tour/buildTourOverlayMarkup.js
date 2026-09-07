const buildTourOverlayMarkup = () =>
  [
    '<div class="gjs-db-tour-root" data-db-tour-root>',
    '<div class="gjs-db-tour-hole" data-db-tour-hole aria-hidden="true"></div>',
    '<section class="gjs-db-tour-popover" data-db-tour-popover role="dialog" aria-modal="false"',
    ' aria-labelledby="db-tour-title" aria-describedby="db-tour-text" tabindex="-1">',
    '<p class="gjs-db-tour-progress" data-db-tour-progress></p>',
    '<h2 class="gjs-db-tour-title" id="db-tour-title" data-db-tour-title></h2>',
    '<p class="gjs-db-tour-text" id="db-tour-text" data-db-tour-text></p>',
    '<div class="gjs-db-tour-actions">',
    '<button type="button" class="gjs-db-tour-button gjs-db-tour-skip" data-db-tour-skip>Skip tour</button>',
    '<span class="gjs-db-tour-spacer"></span>',
    '<button type="button" class="gjs-db-tour-button" data-db-tour-prev>Back</button>',
    '<button type="button" class="gjs-db-tour-button gjs-db-tour-next" data-db-tour-next>Next</button>',
    '</div>',
    '</section>',
    '</div>',
  ].join('');

export default buildTourOverlayMarkup;
