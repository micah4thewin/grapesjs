import getIconMarkup from '../support/getIconMarkup.js';
import getSoundPreference from '../experience/getSoundPreference.js';

const buildSoundToggleMarkup = (experienceOptions) => {
  if (experienceOptions && experienceOptions.sound === false) return '';
  const soundEnabled = getSoundPreference();
  const labelText = soundEnabled ? 'Mute interface sounds' : 'Enable interface sounds';
  return [
    `<button type="button" class="gjs-db-panel-button" data-db-sound-toggle aria-pressed="${soundEnabled ? 'true' : 'false'}"`,
    ` aria-label="${labelText}" title="${labelText}">`,
    getIconMarkup(soundEnabled ? 'volume' : 'volumeOff', { size: 16 }),
    '</button>',
  ].join('');
};

export default buildSoundToggleMarkup;
