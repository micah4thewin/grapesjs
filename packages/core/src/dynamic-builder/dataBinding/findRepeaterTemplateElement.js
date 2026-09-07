const findRepeaterTemplateElement = (repeaterElement) =>
  repeaterElement && repeaterElement.children
    ? Array.from(repeaterElement.children).find((childElement) => childElement.hasAttribute('data-db-repeater-item')) ||
      null
    : null;

export default findRepeaterTemplateElement;
