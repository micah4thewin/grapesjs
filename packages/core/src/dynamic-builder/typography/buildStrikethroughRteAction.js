import buildToggleTagRteAction from './buildToggleTagRteAction.js';

const buildStrikethroughRteAction = () => buildToggleTagRteAction('strikethrough', 's', '<s>S</s>', 'Strike-through');

export default buildStrikethroughRteAction;
