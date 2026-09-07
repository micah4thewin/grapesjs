import collectWorkspaceZoneElements from './collectWorkspaceZoneElements.js';
import getManagerRelocationRecords from './getManagerRelocationRecords.js';
import placeManagerPanel from './placeManagerPanel.js';

const ensureManagerPanelsPlaced = (editor, workspaceElement) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement) return false;
  const viewsContainerElement = containerElement.querySelector('.gjs-pn-views-container');
  const zoneElements = collectWorkspaceZoneElements(workspaceElement);
  const placedFlags = getManagerRelocationRecords().map((relocationRecord) =>
    placeManagerPanel(editor, viewsContainerElement, zoneElements[relocationRecord.zoneKey], relocationRecord),
  );
  const allPlaced = placedFlags.indexOf(false) < 0;
  if (allPlaced) containerElement.classList.add('gjs-db-ws-mounted');
  return allPlaced;
};

export default ensureManagerPanelsPlaced;
