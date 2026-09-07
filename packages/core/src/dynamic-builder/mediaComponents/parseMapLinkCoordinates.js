import buildMapCoordinateRecord from './buildMapCoordinateRecord.js';
import readMapZoomParameter from './readMapZoomParameter.js';

const parseMapLinkCoordinates = (linkText) => {
  const sourceText = String(linkText || '').trim();
  if (!sourceText) return null;
  const zoomParameter = readMapZoomParameter(sourceText);
  const googleMatch = sourceText.match(/@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)(?:,(\d+(?:\.\d+)?)z)?/);
  if (googleMatch) return buildMapCoordinateRecord(googleMatch[1], googleMatch[2], googleMatch[3] || zoomParameter);
  const osmMatch = sourceText.match(/#map=(\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?)/);
  if (osmMatch) return buildMapCoordinateRecord(osmMatch[2], osmMatch[3], osmMatch[1]);
  const queryMatch = sourceText.match(
    /[?&](?:q|ll|query|center|destination|sll)=(-?\d+(?:\.\d+)?)(?:,|%2C)(-?\d+(?:\.\d+)?)/i,
  );
  if (queryMatch) return buildMapCoordinateRecord(queryMatch[1], queryMatch[2], zoomParameter);
  const markerMatch = sourceText.match(/[?&]mlat=(-?\d+(?:\.\d+)?)(?:.*)[?&]mlon=(-?\d+(?:\.\d+)?)/i);
  if (markerMatch) return buildMapCoordinateRecord(markerMatch[1], markerMatch[2], zoomParameter);
  const bangMatch = sourceText.match(/!3d(-?\d+(?:\.\d+)?)!4d(-?\d+(?:\.\d+)?)/);
  if (bangMatch) return buildMapCoordinateRecord(bangMatch[1], bangMatch[2], zoomParameter);
  const bingMatch = sourceText.match(/cp=(-?\d+(?:\.\d+)?)~(-?\d+(?:\.\d+)?)/);
  if (bingMatch) return buildMapCoordinateRecord(bingMatch[1], bingMatch[2], zoomParameter);
  const plainMatch = sourceText.match(/^(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)$/);
  if (plainMatch) return buildMapCoordinateRecord(plainMatch[1], plainMatch[2], '');
  return null;
};

export default parseMapLinkCoordinates;
