import buildToggleTagRteAction from './buildToggleTagRteAction.js';

const buildHighlightRteAction = () => buildToggleTagRteAction('highlight', 'mark', '<mark>H</mark>', 'Highlight');

export default buildHighlightRteAction;
