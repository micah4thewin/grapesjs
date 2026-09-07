const buildRteActionAttributes = (titleText) => ({
  title: titleText,
  'aria-label': titleText,
  role: 'button',
  tabindex: '0',
});

export default buildRteActionAttributes;
