const buildVirtualLocation = (eventValues, pageUrl) => ({
  '@type': 'VirtualLocation',
  url: eventValues.offerUrl || pageUrl,
});

const buildPlaceLocation = (eventValues) => ({
  '@type': 'Place',
  name: eventValues.venueName,
  address: {
    '@type': 'PostalAddress',
    streetAddress: eventValues.streetAddress,
  },
});

const buildEventRecordFields = (eventValues, pageUrl) => {
  const eventStatusValue = String(eventValues.eventStatus || '').trim();
  const attendanceModeValue = String(eventValues.attendanceMode || '').trim();
  const isOnlineEvent = /^Online/i.test(attendanceModeValue);
  const isMixedEvent = /^Mixed/i.test(attendanceModeValue);
  let locationValue;
  if (isOnlineEvent) locationValue = buildVirtualLocation(eventValues, pageUrl);
  else if (isMixedEvent) locationValue = [buildVirtualLocation(eventValues, pageUrl), buildPlaceLocation(eventValues)];
  else locationValue = buildPlaceLocation(eventValues);
  return {
    name: eventValues.name,
    startDate: eventValues.startDate,
    endDate: eventValues.endDate,
    eventStatus: eventStatusValue ? 'https://schema.org/' + eventStatusValue : '',
    eventAttendanceMode: attendanceModeValue ? 'https://schema.org/' + attendanceModeValue : '',
    location: locationValue,
    offers: {
      '@type': 'Offer',
      price: eventValues.offerPrice,
      priceCurrency: eventValues.offerCurrency,
      url: eventValues.offerUrl,
    },
  };
};

export default buildEventRecordFields;
