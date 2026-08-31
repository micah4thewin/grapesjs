import buildClearFormattingRteAction from './buildClearFormattingRteAction.js';
import buildHighlightRteAction from './buildHighlightRteAction.js';
import buildInlineCodeRteAction from './buildInlineCodeRteAction.js';
import buildStrikethroughRteAction from './buildStrikethroughRteAction.js';
import buildSubscriptRteAction from './buildSubscriptRteAction.js';
import buildSuperscriptRteAction from './buildSuperscriptRteAction.js';

const registerRichTextActions = (editor) => {
  if (!(editor.getContainer && editor.getContainer())) return;
  const actionBuilders = [
    buildStrikethroughRteAction,
    buildInlineCodeRteAction,
    buildSuperscriptRteAction,
    buildSubscriptRteAction,
    buildHighlightRteAction,
    buildClearFormattingRteAction,
  ];
  const addMissingActions = () => {
    const richTextModule = editor.RichTextEditor;
    if (!richTextModule || !richTextModule.getToolbarEl || !richTextModule.getToolbarEl()) return;
    actionBuilders.forEach((buildRteAction) => {
      const actionDefinition = buildRteAction();
      if (richTextModule.get(actionDefinition.name)) return;
      richTextModule.add(actionDefinition.name, actionDefinition);
    });
  };
  editor.onReady(addMissingActions);
};

export default registerRichTextActions;
