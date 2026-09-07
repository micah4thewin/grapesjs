import activateViewsPanelButton from '../shell/activateViewsPanelButton.js';
import locateAuditComponent from './locateAuditComponent.js';

const focusTraitInput = (editor, traitName) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement) return;
  const traitElement = containerElement.querySelector('.gjs-trt-trait__wrp-' + traitName);
  const inputElement = traitElement && traitElement.querySelector('input, select, textarea, button');
  if (inputElement && inputElement.focus) inputElement.focus();
};

const focusComponentTrait = (editor, component, traitName) => {
  if (!locateAuditComponent(editor, component)) return false;
  activateViewsPanelButton(editor, 'core:open-traits');
  setTimeout(() => focusTraitInput(editor, traitName), 60);
  return true;
};

export default focusComponentTrait;
