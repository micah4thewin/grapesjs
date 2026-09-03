const previewAnimationsOnCanvas = (editor) => {
  const canvasDocument = editor.Canvas && editor.Canvas.getDocument && editor.Canvas.getDocument();
  if (!canvasDocument || !canvasDocument.documentElement) return 0;
  const rootElement = canvasDocument.documentElement;
  const animatedElements = [...canvasDocument.querySelectorAll('[data-db-aos]:not([data-db-aos="none"])')];
  if (!animatedElements.length) return 0;
  let longestSpan = 0;
  rootElement.setAttribute('data-db-aos-ready', 'true');
  animatedElements.forEach((element) => {
    const durationValue = parseInt(element.getAttribute('data-db-aos-duration') || '700', 10) || 700;
    const delayValue = parseInt(element.getAttribute('data-db-aos-delay') || '0', 10) || 0;
    element.style.setProperty('--db-aos-duration', durationValue + 'ms');
    element.style.setProperty('--db-aos-delay', delayValue + 'ms');
    element.removeAttribute('data-db-aos-in');
    longestSpan = Math.max(longestSpan, durationValue + delayValue);
  });
  setTimeout(() => animatedElements.forEach((element) => element.setAttribute('data-db-aos-in', 'true')), 60);
  setTimeout(() => rootElement.removeAttribute('data-db-aos-ready'), longestSpan + 400);
  return animatedElements.length;
};

export default previewAnimationsOnCanvas;
