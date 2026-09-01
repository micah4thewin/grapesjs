import getIconMarkup from '../support/getIconMarkup.js';

const buildThemeToggleMarkup = () =>
  [
    '<button type="button" class="gjs-db-panel-button" data-db-theme-toggle aria-label="Toggle color theme"',
    ' title="Toggle color theme">',
    getIconMarkup('moon', { size: 16 }),
    '</button>',
  ].join('');

export default buildThemeToggleMarkup;
