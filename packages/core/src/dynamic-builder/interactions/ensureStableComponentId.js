import toSlugText from '../support/toSlugText.js';

const ensureStableComponentId = (editor, component) => {
  if (!component || typeof component.getAttributes !== 'function') return '';
  const existingId = String(component.getAttributes().id || '').trim();
  if (existingId) return existingId;
  const baseSlug = toSlugText(String((component.getName && component.getName()) || 'element')) || 'element';
  const wrapperComponent = editor.getWrapper && editor.getWrapper();
  let candidateId = baseSlug;
  let suffixCounter = 1;
  while (wrapperComponent && wrapperComponent.find('#' + candidateId).length) {
    suffixCounter += 1;
    candidateId = baseSlug + '-' + suffixCounter;
  }
  component.addAttributes({ id: candidateId });
  return candidateId;
};

export default ensureStableComponentId;
