import buildAnimationGalleryMarkup from './buildAnimationGalleryMarkup.js';
import buildElementFromMarkup from '../support/buildElementFromMarkup.js';
import getAnimationGalleryCss from './getAnimationGalleryCss.js';
import injectEditorStylesOnce from '../support/injectEditorStylesOnce.js';
import openThemedModal from '../support/openThemedModal.js';
import previewAnimationsOnCanvas from './previewAnimationsOnCanvas.js';
import resolveComponentLabel from '../interactions/resolveComponentLabel.js';
import showToastNotice from '../support/showToastNotice.js';

const readStaggerStep = (formElement) => {
  const toggleElement = formElement.querySelector('[data-db-aos-stagger-toggle]');
  const stepElement = formElement.querySelector('[data-db-aos-stagger-step]');
  if (!toggleElement || !toggleElement.checked || !stepElement) return '0';
  return String(stepElement.value || '120');
};

const openAnimationGalleryModal = (editor) => {
  const component = editor.getSelected && editor.getSelected();
  if (!component) {
    showToastNotice(editor, 'Select something on the page first.', { kind: 'warning' });
    return;
  }
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.ownerDocument) return;
  injectEditorStylesOnce(editor, 'db-css-animations-gallery', getAnimationGalleryCss());
  const attributesRecord = component.getAttributes();
  const currentStagger = String(attributesRecord['data-db-aos-stagger'] || '0');
  const formElement = buildElementFromMarkup(
    containerElement.ownerDocument,
    buildAnimationGalleryMarkup({
      effect: String(attributesRecord['data-db-aos'] || 'none'),
      staggerStep: currentStagger === '0' ? '120' : currentStagger,
      componentLabel: resolveComponentLabel(component),
      childCount: component.components ? component.components().length : 0,
    }),
  );
  if (!formElement) return;
  if (currentStagger === '0') {
    const toggleElement = formElement.querySelector('[data-db-aos-stagger-toggle]');
    if (toggleElement) toggleElement.checked = false;
  }
  formElement.addEventListener('submit', (submitEvent) => submitEvent.preventDefault());
  formElement.addEventListener('click', (clickEvent) => {
    const tileElement = clickEvent.target.closest('[data-db-aos-effect]');
    if (!tileElement) return;
    clickEvent.preventDefault();
    const effectId = tileElement.getAttribute('data-db-aos-effect');
    const staggerStep = readStaggerStep(formElement);
    component.addAttributes({ 'data-db-aos': effectId });
    if (effectId !== 'none') {
      if (staggerStep === '0') component.removeAttributes('data-db-aos-stagger');
      else component.addAttributes({ 'data-db-aos-stagger': staggerStep });
    }
    editor.Modal.close();
    if (effectId === 'none') {
      showToastNotice(editor, 'Animation removed.', { kind: 'success' });
      return;
    }
    showToastNotice(editor, 'Effect applied. Playing it once on the canvas.', { kind: 'success' });
    setTimeout(() => previewAnimationsOnCanvas(editor), 120);
  });
  openThemedModal(editor, 'Animation effects', formElement, { className: 'gjs-db-aos-gallery-modal' });
};

export default openAnimationGalleryModal;
