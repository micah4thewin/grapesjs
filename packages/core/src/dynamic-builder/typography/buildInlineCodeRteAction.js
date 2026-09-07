import getIconMarkup from '../support/getIconMarkup.js';
import buildToggleTagRteAction from './buildToggleTagRteAction.js';

const buildInlineCodeRteAction = () =>
  buildToggleTagRteAction(
    'inlineCode',
    'code',
    getIconMarkup('code', { size: 14, label: 'Inline code' }),
    'Inline code',
  );

export default buildInlineCodeRteAction;
