import getTimeZoneOffsetOptions from './getTimeZoneOffsetOptions.js';

const buildCountdownTraitDefinitions = () => [
  { type: 'db-date', name: 'data-db-deadline-date', label: 'Deadline date' },
  {
    type: 'db-time',
    name: 'data-db-deadline-time',
    label: 'Deadline time',
    help: 'Shown in the local time of each visitor unless you pick a time zone below.',
  },
  {
    type: 'select',
    name: 'data-db-deadline-offset',
    label: 'Time zone',
    default: '',
    options: getTimeZoneOffsetOptions(),
  },
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
  {
    type: 'select',
    name: 'data-db-align',
    label: 'Alignment',
    default: 'start',
    options: [
      { id: 'start', label: 'Left' },
      { id: 'center', label: 'Center' },
      { id: 'end', label: 'Right' },
    ],
  },
  {
    type: 'checkbox',
    name: 'data-db-hide-days',
    label: 'Hide days under 24 hours',
    valueTrue: 'true',
    valueFalse: 'false',
    default: 'false',
  },
];

export default buildCountdownTraitDefinitions;
