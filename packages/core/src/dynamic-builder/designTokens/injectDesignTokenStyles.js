import buildDesignTokenRootCss from './buildDesignTokenRootCss.js';
import registerCanvasStyles from '../support/registerCanvasStyles.js';

const injectDesignTokenStyles = (editor, tokenRecord) => {
  registerCanvasStyles(editor, 'db-css-designtokens-root', buildDesignTokenRootCss(tokenRecord));
  editor.getModel().set('dbDesignTokensSnapshot', JSON.stringify(tokenRecord));
};

export default injectDesignTokenStyles;
