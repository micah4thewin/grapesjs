const runMapFacadeBehavior = () => {
  document.querySelectorAll('[data-db-type="map"]').forEach((mapElement) => {
    if (mapElement.dataset.dbMapReady) return;
    mapElement.dataset.dbMapReady = 'true';
    mapElement.addEventListener('click', (clickEvent) => {
      if (mapElement.dataset.dbMapLoaded) return;
      const clickTarget = clickEvent.target;
      const loadTrigger = clickTarget && clickTarget.closest ? clickTarget.closest('[data-db-map-load]') : null;
      if (!loadTrigger || !mapElement.contains(loadTrigger)) return;
      const latitudeValue = parseFloat(mapElement.getAttribute('data-db-lat')) || 0;
      const longitudeValue = parseFloat(mapElement.getAttribute('data-db-lng')) || 0;
      const zoomRaw = parseInt(mapElement.getAttribute('data-db-zoom') || '13', 10) || 13;
      const zoomValue = Math.min(19, Math.max(1, zoomRaw));
      const addressText = mapElement.getAttribute('data-db-address') || 'the selected location';
      const spanValue = 360 / Math.pow(2, zoomValue + 1);
      const boundingBox = [
        longitudeValue - spanValue,
        latitudeValue - spanValue / 2,
        longitudeValue + spanValue,
        latitudeValue + spanValue / 2,
      ]
        .map((coordinateValue) => coordinateValue.toFixed(5))
        .join('%2C');
      const markerPair = latitudeValue.toFixed(5) + '%2C' + longitudeValue.toFixed(5);
      const embedBase = 'https://www.openstreetmap.org/export/embed.html';
      const mapFrame = document.createElement('iframe');
      mapFrame.src = embedBase + '?bbox=' + boundingBox + '&layer=mapnik&marker=' + markerPair;
      mapFrame.title = 'Map of ' + addressText;
      mapFrame.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-popups');
      mapFrame.setAttribute('loading', 'lazy');
      mapFrame.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
      mapElement.dataset.dbMapLoaded = 'true';
      while (mapElement.firstChild) mapElement.removeChild(mapElement.firstChild);
      mapElement.appendChild(mapFrame);
      if (mapFrame.focus) mapFrame.focus();
    });
  });
};

export default runMapFacadeBehavior;
