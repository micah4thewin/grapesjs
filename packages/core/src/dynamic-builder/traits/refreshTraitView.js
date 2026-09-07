const refreshTraitView = (trait) => {
  const traitView = trait && trait.view;
  if (!traitView || typeof traitView.postUpdate !== 'function') return;
  const inputElement = traitView.getInputElem ? traitView.getInputElem() : null;
  if (inputElement) inputElement.value = trait.get('value');
  traitView.postUpdate();
};

export default refreshTraitView;
