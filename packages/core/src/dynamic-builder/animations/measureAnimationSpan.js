const measureAnimationSpan = (canvasDocument) => {
  let longestSpan = 0;
  canvasDocument.querySelectorAll('[data-db-aos]:not([data-db-aos="none"])').forEach((element) => {
    const durationValue = parseInt(element.getAttribute('data-db-aos-duration') || '700', 10) || 700;
    const delayValue = parseInt(element.getAttribute('data-db-aos-delay') || '0', 10) || 0;
    const staggerValue = parseInt(element.getAttribute('data-db-aos-stagger') || '0', 10) || 0;
    const childCount = staggerValue > 0 ? element.children.length : 0;
    longestSpan = Math.max(longestSpan, durationValue + delayValue + childCount * staggerValue);
  });
  return longestSpan;
};

export default measureAnimationSpan;
