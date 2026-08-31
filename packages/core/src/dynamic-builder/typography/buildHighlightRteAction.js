import isSelectionInsideTag from './isSelectionInsideTag.js';
import unwrapSelectionAncestorTag from './unwrapSelectionAncestorTag.js';
import wrapSelectionWithTag from './wrapSelectionWithTag.js';

const buildHighlightRteAction = () => ({
  name: 'highlight',
  icon: '<mark>H</mark>',
  attributes: { title: 'Highlight' },
  state: (richTextEditor) => (isSelectionInsideTag(richTextEditor, 'MARK') ? 1 : 0),
  result: (richTextEditor) => {
    if (!unwrapSelectionAncestorTag(richTextEditor, 'MARK')) {
      wrapSelectionWithTag(richTextEditor, 'mark');
    }
  },
});

export default buildHighlightRteAction;
