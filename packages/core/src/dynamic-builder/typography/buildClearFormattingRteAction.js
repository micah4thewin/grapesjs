import buildRteActionAttributes from './buildRteActionAttributes.js';
import unwrapTagsInsideSelection from './unwrapTagsInsideSelection.js';

const buildClearFormattingRteAction = () => ({
  name: 'clearFormatting',
  icon: '<span>T<sub>x</sub></span>',
  attributes: buildRteActionAttributes('Clear formatting'),
  result: (richTextEditor) => {
    richTextEditor.exec('removeFormat');
    ['MARK', 'CODE', 'S', 'STRIKE', 'SUB', 'SUP'].forEach((tagName) =>
      unwrapTagsInsideSelection(richTextEditor, tagName),
    );
    richTextEditor.updateActiveActions && richTextEditor.updateActiveActions();
  },
});

export default buildClearFormattingRteAction;
