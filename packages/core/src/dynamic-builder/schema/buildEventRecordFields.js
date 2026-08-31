const buildEventRecordFields = (eventValues) => {
  const eventStatusValue = String(eventValues.eventStatus || '').trim();
  const attendanceModeValue = String(eventValues.attendanceMode || '').trim();
  return {
    name: eventValues.name,
    startDate: eventValues.startDate,
    endDate: eventValues.endDate,
    eventStatus: eventStatusValue ? 'https://schema.org/' + eventStatusValue : '',
    eventAttendanceMode: attendanceModeValue ? 'https://schema.org/' + attendanceModeValue : '',
    location: {
      '@type': 'Place',
      name: eventValues.venueName,
      address: {
        '@type': 'PostalAddress',
        streetAddress: eventValues.streetAddress,
      },
    },
    offers: {
      '@type': 'Offer',
      price: eventValues.offerPrice,
      priceCurrency: eventValues.offerCurrency,
      url: eventValues.offerUrl,
    },
  };
};

export default buildEventRecordFields;
