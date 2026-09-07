import normalizeSchemaPriceValue from './normalizeSchemaPriceValue.js';
import normalizeSchemaUrlValue from './normalizeSchemaUrlValue.js';

const buildVirtualLocation = (ticketUrl, pageUrl) => ({
  '@type': 'VirtualLocation',
  url: ticketUrl || pageUrl,
});

const buildPlaceLocation = (eventValues) => ({
  '@type': 'Place',
  name: eventValues.venueName,
  address: {
    '@type': 'PostalAddress',
    streetAddress: eventValues.streetAddress,
  },
});

const buildEventRecordFields = (eventValues, pageUrl, canonicalBase) => {
  const eventStatusValue = String(eventValues.eventStatus || '').trim();
  const attendanceModeValue = String(eventValues.attendanceMode || '').trim();
  const ticketUrl = normalizeSchemaUrlValue(eventValues.offerUrl, canonicalBase);
  const isOnlineEvent = /^Online/i.test(attendanceModeValue);
  const isMixedEvent = /^Mixed/i.test(attendanceModeValue);
  let locationValue;
  if (isOnlineEvent) locationValue = buildVirtualLocation(ticketUrl, pageUrl);
  else if (isMixedEvent) locationValue = [buildVirtualLocation(ticketUrl, pageUrl), buildPlaceLocation(eventValues)];
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
      price: normalizeSchemaPriceValue(eventValues.offerPrice),
      priceCurrency: String(eventValues.offerCurrency || '')
        .trim()
        .toUpperCase(),
      url: ticketUrl,
    },
  };
};

export default buildEventRecordFields;
