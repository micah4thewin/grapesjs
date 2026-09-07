const resolveFlowControlSelector = (controlElement) => {
  if (!controlElement || !controlElement.closest) return '';
  const cardElement = controlElement.closest('[data-db-flow-index]');
  if (!cardElement) return '';
  const cardSelector = '[data-db-flow-index="' + cardElement.getAttribute('data-db-flow-index') + '"] ';
  const rowElement = controlElement.closest('[data-db-flow-action-index]');
  if (rowElement) {
    return (
      cardSelector +
      '[data-db-flow-action-index="' +
      rowElement.getAttribute('data-db-flow-action-index') +
      '"] [data-db-flow-action-type]'
    );
  }
  return cardSelector + '[data-db-flow-trigger]';
};

export default resolveFlowControlSelector;
