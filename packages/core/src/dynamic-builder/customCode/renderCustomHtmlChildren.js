import getInertChildFlags from './getInertChildFlags.js';
import sanitizeCodeSlotMarkup from './sanitizeCodeSlotMarkup.js';
import walkComponentTree from '../support/walkComponentTree.js';

const makeChildrenInert = (component) => {
  const inertFlags = getInertChildFlags();
  walkComponentTree(component, (currentComponent) => {
    if (currentComponent !== component && currentComponent.set) currentComponent.set(inertFlags, { avoidStore: true });
  });
};

const renderCustomHtmlChildren = (component) => {
  if (!component || !component.components || !component.getAttributes) return;
  if (typeof DOMParser === 'undefined') return;
  const rawCode = String(component.getAttributes().htmlCode || '');
  if (!rawCode.trim() && component.components().length && component.getInnerHTML) {
    const existingMarkup = sanitizeCodeSlotMarkup(component.getInnerHTML());
    if (existingMarkup) {
      component.addAttributes({ htmlCode: existingMarkup });
      return;
    }
  }
  const safeMarkup = sanitizeCodeSlotMarkup(rawCode);
  const fallbackMarkup = '<p class="db-custom-html-note">Empty custom HTML block.</p>';
  component.components(safeMarkup || fallbackMarkup);
  makeChildrenInert(component);
};

export default renderCustomHtmlChildren;
