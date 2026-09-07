import getSchemaFieldFormatRecords from './getSchemaFieldFormatRecords.js';

const getEventValidationRules = (eventValues) => {
  const attendanceModeValue = String((eventValues && eventValues.attendanceMode) || '').trim();
  const needsVenue = !/^Online/i.test(attendanceModeValue);
  return {
    required: needsVenue ? ['name', 'startDate', 'venueName'] : ['name', 'startDate'],
    recommended: [
      'endDate',
      needsVenue ? 'streetAddress' : 'offerUrl',
      'eventStatus',
      'attendanceMode',
      'offerPrice',
      'offerCurrency',
      'offerUrl',
    ].filter((fieldKey, fieldIndex, allKeys) => allKeys.indexOf(fieldKey) === fieldIndex),
    formats: getSchemaFieldFormatRecords().event,
  };
};

export default getEventValidationRules;
