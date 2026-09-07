import buildElementFromMarkup from '../support/buildElementFromMarkup.js';
import buildTopBarButtonMarkup from './buildTopBarButtonMarkup.js';

const addTopBarButton = (editor, buttonRecord) => {
  const containerElement = editor.getContainer && editor.getContainer();
  const stripElement = containerElement && containerElement.querySelector('[data-db-panel="db-top"]');
  if (!stripElement || !buttonRecord || !buttonRecord.commandId) return null;
  const placementName = buttonRecord.placement || 'start';
  const slotElement = stripElement.querySelector(`[data-db-top-bar-extras="${placementName}"]`);
  if (!slotElement) return null;
  const existingButton = slotElement.querySelector(`[data-db-extra-button="${buttonRecord.commandId}"]`);
  if (existingButton) return existingButton;
  const buttonElement = buildElementFromMarkup(stripElement.ownerDocument, buildTopBarButtonMarkup(buttonRecord));
  if (!buttonElement) return null;
  slotElement.appendChild(buttonElement);
  slotElement.hidden = false;
  return buttonElement;
};

export default addTopBarButton;
