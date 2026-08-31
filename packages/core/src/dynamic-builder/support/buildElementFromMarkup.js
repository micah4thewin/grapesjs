const buildElementFromMarkup = (targetDocument, markup) => {
  const templateElement = targetDocument.createElement('template');
  templateElement.innerHTML = String(markup || '').trim();
  return templateElement.content.firstElementChild;
};

export default buildElementFromMarkup;
