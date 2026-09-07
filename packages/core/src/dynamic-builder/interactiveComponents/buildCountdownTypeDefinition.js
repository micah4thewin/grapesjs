import buildCountdownInnerMarkup from './buildCountdownInnerMarkup.js';
import buildCountdownTraitDefinitions from './buildCountdownTraitDefinitions.js';
import runCountdownBehavior from './runCountdownBehavior.js';

const buildCountdownTypeDefinition = (interactiveTextDefaults) => ({
  type: 'db-countdown',
  isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'countdown') && { type: 'db-countdown' },
  model: {
    defaults: {
      tagName: 'div',
      name: 'Countdown',
      draggable: true,
      droppable: false,
      classes: ['db-countdown'],
      attributes: {
        'data-db-type': 'countdown',
        'data-db-countdown': 'true',
        role: 'timer',
        'aria-live': 'off',
        'data-db-deadline-date': '',
        'data-db-deadline-time': '00:00',
        'data-db-deadline-offset': '',
        'data-db-expiry-action': 'message',
        'data-db-expiry-message': interactiveTextDefaults.countdownExpiryMessage,
        'data-db-align': 'start',
        'data-db-hide-days': 'false',
      },
      components: buildCountdownInnerMarkup(interactiveTextDefaults),
      script: runCountdownBehavior,
      traits: buildCountdownTraitDefinitions(),
    },
  },
});

export default buildCountdownTypeDefinition;
