import buildCountdownInnerMarkup from './buildCountdownInnerMarkup.js';
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
        'data-db-expiry-action': 'message',
        'data-db-expiry-message': interactiveTextDefaults.countdownExpiryMessage,
      },
      components: buildCountdownInnerMarkup(interactiveTextDefaults),
      script: runCountdownBehavior,
      traits: [
        { type: 'db-date', name: 'data-db-deadline-date', label: 'Deadline date' },
        { type: 'text', name: 'data-db-deadline-time', label: 'Deadline time (HH:MM)' },
        {
          type: 'select',
          name: 'data-db-expiry-action',
          label: 'When expired',
          default: 'message',
          options: [
            { id: 'message', label: 'Show message' },
            { id: 'hide', label: 'Hide countdown' },
          ],
        },
        { type: 'text', name: 'data-db-expiry-message', label: 'Expiry message' },
      ],
    },
  },
});

export default buildCountdownTypeDefinition;
