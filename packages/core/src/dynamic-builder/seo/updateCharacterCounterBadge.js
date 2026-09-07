const resolveCounterState = (valueLength, minLength, warnLimit) => {
  if (warnLimit > 0 && valueLength > warnLimit + 20) return 'too-long';
  if (warnLimit > 0 && valueLength > warnLimit) return 'long';
  if (valueLength > 0 && valueLength < minLength) return 'short';
  return valueLength > 0 ? 'good' : 'empty';
};

const updateCharacterCounterBadge = (badgeElement, valueLength) => {
  const warnLimit = Number(badgeElement.dataset.dbSeoLimit || '0');
  const minLength = Number(badgeElement.dataset.dbSeoMin || '0');
  const counterState = resolveCounterState(valueLength, minLength, warnLimit);
  const stateSuffixes = { short: ', a little short', long: ', over the limit', 'too-long': ', far over the limit' };
  badgeElement.textContent = valueLength + ' / ' + warnLimit + ' characters' + (stateSuffixes[counterState] || '');
  badgeElement.classList.toggle('gjs-db-badge-success', counterState === 'good');
  badgeElement.classList.toggle('gjs-db-badge-warning', counterState === 'short' || counterState === 'long');
  badgeElement.classList.toggle('gjs-db-badge-error', counterState === 'too-long');
  badgeElement.dataset.dbSeoState = counterState;
  return counterState;
};

export default updateCharacterCounterBadge;
