import dropComponentAttributes from '../support/dropComponentAttributes.js';
import showToastNotice from '../support/showToastNotice.js';
import toSlugText from '../support/toSlugText.js';

const applyAnchorIdValue = (editor, component) => {
  if (!component || !component.get || !component.getAttributes) return;
  const slugValue = toSlugText(component.get('dbAnchor'));
  const currentId = String((component.get('attributes') || {}).id || '');
  if (!slugValue) {
    if (currentId) dropComponentAttributes(component, ['id'], { idUpdate: true });
    return;
  }
  if (currentId === slugValue) return;
  component.setId(slugValue);
  if (component.getId() !== slugValue) {
    showToastNotice(editor, `The anchor "${slugValue}" is already used on this site. Try another name.`, {
      kind: 'error',
    });
  }
};

export default applyAnchorIdValue;
