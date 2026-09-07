import buildRteActionAttributes from './buildRteActionAttributes.js';
import isSelectionInsideTag from './isSelectionInsideTag.js';
import unwrapSelectionAncestorTag from './unwrapSelectionAncestorTag.js';
import wrapSelectionWithTag from './wrapSelectionWithTag.js';

const buildToggleTagRteAction = (actionName, tagName, iconMarkup, titleText) => ({
  name: actionName,
  icon: iconMarkup,
  attributes: buildRteActionAttributes(titleText),
  state: (richTextEditor) => (isSelectionInsideTag(richTextEditor, tagName.toUpperCase()) ? 1 : 0),
  result: (richTextEditor) => {
    if (!unwrapSelectionAncestorTag(richTextEditor, tagName.toUpperCase())) {
      wrapSelectionWithTag(richTextEditor, tagName);
    }
  },
});

export default buildToggleTagRteAction;
