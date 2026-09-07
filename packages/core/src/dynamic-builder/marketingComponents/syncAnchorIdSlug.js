import toSlugText from '../support/toSlugText.js';

const syncAnchorIdSlug = (component) => {
  if (!component || !component.getAttributes) return;
  const currentId = String(component.getAttributes().id || '');
  if (!currentId) return;
  const slugId = toSlugText(currentId);
  if (!slugId || slugId === currentId) return;
  component.addAttributes({ id: slugId });
};

export default syncAnchorIdSlug;
