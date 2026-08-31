const buildClearFormattingRteAction = () => ({
  name: 'clearFormatting',
  icon: '<span>T<sub>x</sub></span>',
  attributes: { title: 'Clear formatting' },
  result: (richTextEditor) => richTextEditor.exec('removeFormat'),
});

export default buildClearFormattingRteAction;
