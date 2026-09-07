import buildRteActionAttributes from './buildRteActionAttributes.js';

const buildSuperscriptRteAction = () => ({
  name: 'superscript',
  icon: 'x<sup>2</sup>',
  attributes: buildRteActionAttributes('Superscript'),
  result: (richTextEditor) => richTextEditor.exec('superscript'),
});

export default buildSuperscriptRteAction;
