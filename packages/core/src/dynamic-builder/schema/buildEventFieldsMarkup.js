import buildSchemaSelectFieldMarkup from './buildSchemaSelectFieldMarkup.js';
import buildSchemaTextFieldMarkup from './buildSchemaTextFieldMarkup.js';

const buildEventFieldsMarkup = (eventRecord) =>
  [
    '<div class="gjs-db-schema-group" data-db-schema-group="Event" hidden>',
    buildSchemaTextFieldMarkup('event.name', 'Event name', '', eventRecord.name),
    '<div class="gjs-db-grid-two">',
    buildSchemaTextFieldMarkup('event.startDate', 'Start date', 'ISO format: 2026-06-01T19:00.', eventRecord.startDate),
    buildSchemaTextFieldMarkup('event.endDate', 'End date', 'ISO format: 2026-06-01T22:00.', eventRecord.endDate),
    '</div>',
    '<div class="gjs-db-grid-two">',
    buildSchemaTextFieldMarkup('event.venueName', 'Venue name', '', eventRecord.venueName),
    buildSchemaTextFieldMarkup('event.streetAddress', 'Street address', '', eventRecord.streetAddress),
    '</div>',
    '<div class="gjs-db-grid-two">',
    buildSchemaSelectFieldMarkup('event.eventStatus', 'Event status', '', eventRecord.eventStatus || 'EventScheduled', [
      ['EventScheduled', 'Scheduled'],
      ['EventCancelled', 'Cancelled'],
      ['EventPostponed', 'Postponed'],
      ['EventRescheduled', 'Rescheduled'],
      ['EventMovedOnline', 'Moved online'],
    ]),
    buildSchemaSelectFieldMarkup(
      'event.attendanceMode',
      'Attendance mode',
      '',
      eventRecord.attendanceMode || 'OfflineEventAttendanceMode',
      [
        ['OfflineEventAttendanceMode', 'In person'],
        ['OnlineEventAttendanceMode', 'Online'],
        ['MixedEventAttendanceMode', 'Mixed'],
      ],
    ),
    '</div>',
    '<div class="gjs-db-grid-two">',
    buildSchemaTextFieldMarkup('event.offerPrice', 'Ticket price', 'Number only, 0 for free.', eventRecord.offerPrice),
    buildSchemaTextFieldMarkup('event.offerCurrency', 'Ticket currency', 'ISO 4217 code.', eventRecord.offerCurrency),
    '</div>',
    buildSchemaTextFieldMarkup('event.offerUrl', 'Ticket URL', '', eventRecord.offerUrl),
    '</div>',
  ].join('');

export default buildEventFieldsMarkup;
