const buildSuperscriptRteAction = () => ({
  name: 'superscript',
  icon: 'x<sup>2</sup>',
  attributes: { title: 'Superscript' },
  result: (richTextEditor) => richTextEditor.exec('superscript'),
});

export default buildSuperscriptRteAction;
