const filterBlockCardsByQuery = (panelRootElement, queryText) => {
  const normalizedQuery = String(queryText || '')
    .trim()
    .toLowerCase();
  panelRootElement.querySelectorAll('.gjs-block').forEach((blockCard) => {
    const searchableText = `${blockCard.textContent} ${blockCard.getAttribute('title') || ''}`.toLowerCase();
    const matchesQuery = !normalizedQuery || searchableText.indexOf(normalizedQuery) >= 0;
    blockCard.style.display = matchesQuery ? '' : 'none';
  });
  panelRootElement.querySelectorAll('.gjs-block-category').forEach((categoryElement) => {
    const visibleCards = [...categoryElement.querySelectorAll('.gjs-block')].filter(
      (blockCard) => blockCard.style.display !== 'none',
    );
    categoryElement.style.display = visibleCards.length ? '' : 'none';
  });
};

export default filterBlockCardsByQuery;
