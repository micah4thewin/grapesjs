const buildMapCoordinateRecord = (latitudeText, longitudeText, zoomText) => {
  const latitude = parseFloat(latitudeText);
  const longitude = parseFloat(longitudeText);
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return null;
  if (Math.abs(latitude) > 90 || Math.abs(longitude) > 180) return null;
  const zoomValue = Math.round(parseFloat(zoomText));
  return {
    latitude: Math.round(latitude * 1e6) / 1e6,
    longitude: Math.round(longitude * 1e6) / 1e6,
    zoom: Number.isFinite(zoomValue) ? Math.min(19, Math.max(1, zoomValue)) : null,
  };
};

export default buildMapCoordinateRecord;
