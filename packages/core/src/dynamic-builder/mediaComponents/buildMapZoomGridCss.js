const buildMapZoomGridCss = () =>
  Array.from({ length: 19 }, (unusedValue, zoomIndex) => {
    const zoomLevel = zoomIndex + 1;
    const gridSize = (1 + zoomLevel * 0.35).toFixed(2) + 'rem';
    return ".db-map[data-db-zoom='" + zoomLevel + "'] { background-size: " + gridSize + ' ' + gridSize + '; }';
  }).join('\n');

export default buildMapZoomGridCss;
