import buildBlockCardCss from './buildBlockCardCss.js';
import buildBlockCategoryCss from './buildBlockCategoryCss.js';

const buildBlockManagerCss = () => [buildBlockCardCss(), buildBlockCategoryCss()].join('\n');

export default buildBlockManagerCss;
