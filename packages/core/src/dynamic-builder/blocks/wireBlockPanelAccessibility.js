import injectEditorStylesOnce from '../support/injectEditorStylesOnce.js';
import decorateBlockCategoryTitles from './decorateBlockCategoryTitles.js';
import getBlockPanelEditorCss from './getBlockPanelEditorCss.js';
import rememberBlockCategoryState from './rememberBlockCategoryState.js';
import wireBlockPanelKeyboard from './wireBlockPanelKeyboard.js';

const wireBlockPanelAccessibility = (editor) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement) return;
  injectEditorStylesOnce(editor, 'db-css-blocks-panel', getBlockPanelEditorCss());
  wireBlockPanelKeyboard(editor);
  rememberBlockCategoryState(editor);
  const decorateTitles = () => decorateBlockCategoryTitles(editor);
  decorateTitles();
  setTimeout(decorateTitles, 250);
  setTimeout(decorateTitles, 800);
  editor.on('command:run:open-blocks', () => setTimeout(decorateTitles, 60));
  editor.on('command:run:core:open-blocks', () => setTimeout(decorateTitles, 60));
  editor.on('block:add', () => setTimeout(decorateTitles, 30));
  editor.on('block:category:update', () => setTimeout(decorateTitles, 0));
};

export default wireBlockPanelAccessibility;
