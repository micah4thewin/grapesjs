const moveFocusAmongBlockCards = (cardElement, keyName) => {
  const panelElement = cardElement.closest('.gjs-blocks-cs') || cardElement.parentElement;
  if (!panelElement) return null;
  const visibleCards = Array.from(panelElement.querySelectorAll('.gjs-block')).filter(
    (candidateCard) => candidateCard.style.display !== 'none' && candidateCard.offsetParent !== null,
  );
  const currentIndex = visibleCards.indexOf(cardElement);
  if (currentIndex < 0) return null;
  const siblingCards = visibleCards.filter(
    (candidateCard) => candidateCard.parentElement === cardElement.parentElement,
  );
  const firstRowTop = siblingCards.length ? siblingCards[0].offsetTop : 0;
  const columnsPerRow = Math.max(1, siblingCards.filter((siblingCard) => siblingCard.offsetTop === firstRowTop).length);
  const isVertical = keyName === 'ArrowUp' || keyName === 'ArrowDown';
  const direction = keyName === 'ArrowUp' || keyName === 'ArrowLeft' ? -1 : 1;
  const nextCard = visibleCards[currentIndex + direction * (isVertical ? columnsPerRow : 1)];
  nextCard && nextCard.focus();
  return nextCard || null;
};

export default moveFocusAmongBlockCards;
