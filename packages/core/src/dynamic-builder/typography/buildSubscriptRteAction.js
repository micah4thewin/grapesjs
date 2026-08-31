const buildSubscriptRteAction = () => ({
  name: 'subscript',
  icon: 'x<sub>2</sub>',
  attributes: { title: 'Subscript' },
  result: (richTextEditor) => richTextEditor.exec('subscript'),
});

export default buildSubscriptRteAction;
