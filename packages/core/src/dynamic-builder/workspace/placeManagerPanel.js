import findManagerHostElement from './findManagerHostElement.js';

const placeManagerPanel = (editor, viewsContainerElement, zoneElement, relocationRecord) => {
  if (!zoneElement) return false;
  if (zoneElement.querySelector(relocationRecord.markerSelector)) return true;
  if (!findManagerHostElement(viewsContainerElement, relocationRecord.markerSelector)) {
    try {
      editor.runCommand(relocationRecord.commandId);
    } catch (commandError) {
      return false;
    }
  }
  const hostElement = findManagerHostElement(viewsContainerElement, relocationRecord.markerSelector);
  if (!hostElement) return false;
  zoneElement.appendChild(hostElement);
  return true;
};

export default placeManagerPanel;
