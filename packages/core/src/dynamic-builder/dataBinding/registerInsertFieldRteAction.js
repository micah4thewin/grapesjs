import buildInsertFieldRteAction from './buildInsertFieldRteAction.js';

const registerInsertFieldRteAction = (editor) => {
  const addAction = () => {
    const richTextModule = editor.RichTextEditor;
    if (!richTextModule || !richTextModule.getToolbarEl || !richTextModule.getToolbarEl()) return;
    const actionDefinition = buildInsertFieldRteAction(editor);
    if (richTextModule.get(actionDefinition.name)) return;
    richTextModule.add(actionDefinition.name, actionDefinition);
  };
  if (editor.onReady) editor.onReady(addAction);
};

export default registerInsertFieldRteAction;
