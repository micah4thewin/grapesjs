const getEventValidationRules = () => ({
  required: ['name', 'startDate'],
  recommended: [
    'endDate',
    'venueName',
    'streetAddress',
    'eventStatus',
    'attendanceMode',
    'offerPrice',
    'offerCurrency',
    'offerUrl',
  ],
});

export default getEventValidationRules;
