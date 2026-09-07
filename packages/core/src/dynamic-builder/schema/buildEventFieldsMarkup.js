import buildSchemaSelectFieldMarkup from './buildSchemaSelectFieldMarkup.js';
import buildSchemaTextFieldMarkup from './buildSchemaTextFieldMarkup.js';

const buildEventFieldsMarkup = (eventRecord) =>
  [
    '<div class="gjs-db-schema-group" data-db-schema-group="Event" hidden>',
    buildSchemaTextFieldMarkup(
      'event.name',
      'Event name',
      'The name as printed on tickets or posters.',
      eventRecord.name,
    ),
    '<div class="gjs-db-grid-two">',
    buildSchemaTextFieldMarkup('event.startDate', 'Start', 'Date and time doors open.', eventRecord.startDate, {
      type: 'datetime-local',
    }),
    buildSchemaTextFieldMarkup('event.endDate', 'End', 'Optional. When it finishes.', eventRecord.endDate, {
      type: 'datetime-local',
    }),
    '</div>',
    '<div class="gjs-db-grid-two">',
    buildSchemaTextFieldMarkup(
      'event.venueName',
      'Venue name',
      'Where it happens, for in-person events.',
      eventRecord.venueName,
    ),
    buildSchemaTextFieldMarkup(
      'event.streetAddress',
      'Venue address',
      'Street, city and country of the venue.',
      eventRecord.streetAddress,
    ),
    '</div>',
    '<div class="gjs-db-grid-two">',
    buildSchemaSelectFieldMarkup(
      'event.eventStatus',
      'Status',
      'Tell visitors if plans changed.',
      eventRecord.eventStatus || 'EventScheduled',
      [
        ['EventScheduled', 'Scheduled'],
        ['EventCancelled', 'Cancelled'],
        ['EventPostponed', 'Postponed'],
        ['EventRescheduled', 'Rescheduled'],
        ['EventMovedOnline', 'Moved online'],
      ],
    ),
    buildSchemaSelectFieldMarkup(
      'event.attendanceMode',
      'Attendance',
      'In person, online, or both.',
      eventRecord.attendanceMode || 'OfflineEventAttendanceMode',
      [
        ['OfflineEventAttendanceMode', 'In person'],
        ['OnlineEventAttendanceMode', 'Online'],
        ['MixedEventAttendanceMode', 'In person and online'],
      ],
    ),
    '</div>',
    '<div class="gjs-db-grid-two">',
    buildSchemaTextFieldMarkup(
      'event.offerPrice',
      'Ticket price',
      'Numbers only; enter 0 for free events.',
      eventRecord.offerPrice,
      {
        type: 'number',
        min: '0',
        step: '0.01',
        inputmode: 'decimal',
        placeholder: '0',
      },
    ),
    buildSchemaTextFieldMarkup(
      'event.offerCurrency',
      'Ticket currency',
      'Three-letter code such as USD or EUR.',
      eventRecord.offerCurrency,
      {
        placeholder: 'USD',
        maxlength: '3',
      },
    ),
    '</div>',
    buildSchemaTextFieldMarkup(
      'event.offerUrl',
      'Ticket link',
      'Where visitors buy or reserve tickets.',
      eventRecord.offerUrl,
      {
        type: 'url',
        placeholder: 'https://tickets.example.com/event',
      },
    ),
    '</div>',
  ].join('');

export default buildEventFieldsMarkup;
