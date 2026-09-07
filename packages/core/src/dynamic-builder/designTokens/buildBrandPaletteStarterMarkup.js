const buildBrandPaletteStarterMarkup = () =>
  [
    '<div class="gjs-db-token-starter">',
    '<span>Not sure where to start? Set Brand to your main colour, then let the builder pick matching colours.</span>',
    '<button type="button" class="gjs-db-button" data-db-token-brand-start>Build palette from Brand</button>',
    '</div>',
  ].join('');

export default buildBrandPaletteStarterMarkup;
