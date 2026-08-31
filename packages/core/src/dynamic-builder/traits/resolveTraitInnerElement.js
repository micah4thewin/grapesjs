const resolveTraitInnerElement = (wrapperElement, innerSelector) => {
  if (!wrapperElement || !wrapperElement.querySelector) return null;
  if (wrapperElement.matches && wrapperElement.matches(innerSelector)) return wrapperElement;
  return wrapperElement.querySelector(innerSelector);
};

export default resolveTraitInnerElement;
