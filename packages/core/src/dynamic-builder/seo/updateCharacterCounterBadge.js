const updateCharacterCounterBadge = (badgeElement, valueLength) => {
  const warnLimit = Number(badgeElement.dataset.dbSeoLimit || '0');
  badgeElement.textContent = valueLength + ' / ' + warnLimit;
  const isOverLimit = warnLimit > 0 && valueLength > warnLimit;
  const isFarOverLimit = warnLimit > 0 && valueLength > warnLimit + 20;
  badgeElement.classList.toggle('gjs-db-badge-success', valueLength > 0 && !isOverLimit);
  badgeElement.classList.toggle('gjs-db-badge-warning', isOverLimit && !isFarOverLimit);
  badgeElement.classList.toggle('gjs-db-badge-error', isFarOverLimit);
};

export default updateCharacterCounterBadge;
