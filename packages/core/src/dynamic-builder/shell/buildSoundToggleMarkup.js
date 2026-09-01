import getIconMarkup from '../support/getIconMarkup.js';

const buildSoundToggleMarkup = () =>
  [
    '<button type="button" class="gjs-db-panel-button" data-db-sound-toggle aria-pressed="true"',
    ' aria-label="Mute interface sounds" title="Mute interface sounds">',
    getIconMarkup('volume', { size: 16 }),
    '</button>',
  ].join('');

export default buildSoundToggleMarkup;
