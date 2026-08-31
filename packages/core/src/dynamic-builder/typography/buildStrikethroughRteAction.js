const buildStrikethroughRteAction = () => ({
  name: 'strikethrough',
  icon: '<s>S</s>',
  attributes: { title: 'Strike-through' },
  result: (richTextEditor) => richTextEditor.exec('strikeThrough'),
});

export default buildStrikethroughRteAction;
