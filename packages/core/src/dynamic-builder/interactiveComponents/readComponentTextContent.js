const readComponentTextContent = (component) => {
  const innerMarkup = component && typeof component.getInnerHTML === 'function' ? component.getInnerHTML() : '';
  const templateElement = document.createElement('template');
  templateElement.innerHTML = '<span>' + String(innerMarkup || '') + '</span>';
  const wrapperElement = templateElement.content.firstElementChild;
  return String((wrapperElement && wrapperElement.textContent) || '')
    .replace(/\s+/g, ' ')
    .trim();
};

export default readComponentTextContent;
