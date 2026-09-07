const clampValue = (numberValue, lowestValue, highestValue) =>
  Math.max(lowestValue, Math.min(numberValue, highestValue));

const readSidePosition = (targetRect, popoverRect, sideName, gapSize) => {
  if (sideName === 'right') return { left: targetRect.right + gapSize, top: targetRect.top };
  if (sideName === 'left') return { left: targetRect.left - popoverRect.width - gapSize, top: targetRect.top };
  if (sideName === 'top') return { left: targetRect.left, top: targetRect.top - popoverRect.height - gapSize };
  return { left: targetRect.left, top: targetRect.bottom + gapSize };
};

const positionTourPopover = (popoverElement, targetRect, sideName, viewportWidth, viewportHeight) => {
  const popoverRect = popoverElement.getBoundingClientRect();
  const gapSize = 14;
  const margin = 12;
  const fitsRight = targetRect.right + popoverRect.width + gapSize < viewportWidth - margin;
  const fitsLeft = targetRect.left - popoverRect.width - gapSize > margin;
  let resolvedSide = sideName;
  if (resolvedSide === 'right' && !fitsRight) resolvedSide = fitsLeft ? 'left' : 'bottom';
  if (resolvedSide === 'left' && !fitsLeft) resolvedSide = fitsRight ? 'right' : 'bottom';
  const placement = readSidePosition(targetRect, popoverRect, resolvedSide, gapSize);
  const leftValue = clampValue(placement.left, margin, Math.max(margin, viewportWidth - popoverRect.width - margin));
  const topValue = clampValue(placement.top, margin, Math.max(margin, viewportHeight - popoverRect.height - margin));
  popoverElement.style.left = `${Math.round(leftValue)}px`;
  popoverElement.style.top = `${Math.round(topValue)}px`;
  popoverElement.setAttribute('data-db-tour-side', resolvedSide);
  return resolvedSide;
};

export default positionTourPopover;
