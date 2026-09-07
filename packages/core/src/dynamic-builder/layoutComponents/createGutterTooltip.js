const createGutterTooltip = (ownerDocument) => {
  const tooltipElement = ownerDocument.createElement('div');
  tooltipElement.className = 'db-gutter-tooltip';
  tooltipElement.setAttribute('data-db-editor-only', 'true');
  ownerDocument.body.appendChild(tooltipElement);
  return {
    update: (pointerX, pointerY, leftPercent, rightPercent) => {
      tooltipElement.textContent = `${leftPercent} / ${rightPercent}`;
      tooltipElement.style.left = `${Math.round(pointerX)}px`;
      tooltipElement.style.top = `${Math.round(pointerY) - 34}px`;
    },
    remove: () => tooltipElement.remove(),
  };
};

export default createGutterTooltip;
