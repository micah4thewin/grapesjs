import buildRteActionAttributes from './buildRteActionAttributes.js';

const buildSubscriptRteAction = () => ({
  name: 'subscript',
  icon: 'x<sub>2</sub>',
  attributes: buildRteActionAttributes('Subscript'),
  result: (richTextEditor) => richTextEditor.exec('subscript'),
});

export default buildSubscriptRteAction;
