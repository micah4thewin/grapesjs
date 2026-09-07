const parseLinkPageChoice = (choiceValue) => {
  const choiceText = String(choiceValue || '');
  if (!choiceText) return null;
  const hashIndex = choiceText.indexOf('#');
  if (hashIndex < 0) return { pageId: choiceText, anchorId: '' };
  return { pageId: choiceText.slice(0, hashIndex), anchorId: choiceText.slice(hashIndex + 1) };
};

export default parseLinkPageChoice;
