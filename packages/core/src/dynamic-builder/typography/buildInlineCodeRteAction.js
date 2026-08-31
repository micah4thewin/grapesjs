import getIconMarkup from '../support/getIconMarkup.js';
import isSelectionInsideTag from './isSelectionInsideTag.js';
import unwrapSelectionAncestorTag from './unwrapSelectionAncestorTag.js';
import wrapSelectionWithTag from './wrapSelectionWithTag.js';

const buildInlineCodeRteAction = () => ({
  name: 'inlineCode',
  icon: getIconMarkup('code', { size: 14, label: 'Inline code' }),
  attributes: { title: 'Inline code' },
  state: (richTextEditor) => (isSelectionInsideTag(richTextEditor, 'CODE') ? 1 : 0),
  result: (richTextEditor) => {
    if (!unwrapSelectionAncestorTag(richTextEditor, 'CODE')) {
      wrapSelectionWithTag(richTextEditor, 'code');
    }
  },
});

export default buildInlineCodeRteAction;
