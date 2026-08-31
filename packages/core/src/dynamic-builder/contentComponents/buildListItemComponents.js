const buildListItemComponents = (listItemTexts) => {
  const fallbackItemTexts = ['First key point', 'Second key point', 'Third key point'];
  const safeItemTexts = Array.isArray(listItemTexts) && listItemTexts.length ? listItemTexts : fallbackItemTexts;
  return safeItemTexts.map((itemText) => ({
    type: 'text',
    tagName: 'li',
    name: 'List item',
    draggable: 'ul, ol',
    droppable: false,
    components: `${itemText}`,
  }));
};

export default buildListItemComponents;
