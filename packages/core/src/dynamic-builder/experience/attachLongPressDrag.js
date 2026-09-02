import translateTouchEventToMouse from './translateTouchEventToMouse.js';
import triggerHapticPulse from './triggerHapticPulse.js';

const attachLongPressDrag = (editor, targetDocument, dragOriginSelector, hapticsEnabled) => {
  if (!targetDocument || targetDocument.dbTouchDragWired) return;
  targetDocument.dbTouchDragWired = true;
  let pressTimer = null;
  let dragActive = false;
  let startPoint = null;
  let originElement = null;
  const clearPress = () => {
    pressTimer && clearTimeout(pressTimer);
    pressTimer = null;
  };
  const resolveDispatchTarget = (touchPoint) => {
    const pointElement =
      targetDocument.elementFromPoint && targetDocument.elementFromPoint(touchPoint.clientX, touchPoint.clientY);
    return pointElement || originElement || targetDocument.body;
  };
  const handleTouchStart = (touchEvent) => {
    const touchPoint = touchEvent.touches[0];
    if (!touchPoint || touchEvent.touches.length > 1) return;
    const targetElement = touchEvent.target;
    const matchedOrigin = targetElement && targetElement.closest ? targetElement.closest(dragOriginSelector) : null;
    if (!matchedOrigin) return;
    originElement = matchedOrigin;
    startPoint = { x: touchPoint.clientX, y: touchPoint.clientY };
    clearPress();
    pressTimer = setTimeout(() => {
      dragActive = true;
      const mouseDownEvent = translateTouchEventToMouse(touchEvent, 'mousedown');
      mouseDownEvent && matchedOrigin.dispatchEvent(mouseDownEvent);
      hapticsEnabled && triggerHapticPulse(8);
    }, 220);
  };
  const handleTouchMove = (touchEvent) => {
    const touchPoint = touchEvent.touches[0];
    if (!touchPoint) return;
    if (!dragActive) {
      const movedFar =
        startPoint &&
        (Math.abs(touchPoint.clientX - startPoint.x) > 10 || Math.abs(touchPoint.clientY - startPoint.y) > 10);
      movedFar && clearPress();
      return;
    }
    touchEvent.preventDefault();
    const mouseMoveEvent = translateTouchEventToMouse(touchEvent, 'mousemove');
    mouseMoveEvent && resolveDispatchTarget(touchPoint).dispatchEvent(mouseMoveEvent);
  };
  const endTouchDrag = (touchEvent) => {
    clearPress();
    startPoint = null;
    if (!dragActive) {
      originElement = null;
      return;
    }
    dragActive = false;
    const touchPoint = (touchEvent.changedTouches && touchEvent.changedTouches[0]) || null;
    const mouseUpEvent = translateTouchEventToMouse(touchEvent, 'mouseup');
    if (mouseUpEvent) {
      const dispatchTarget = touchPoint ? resolveDispatchTarget(touchPoint) : targetDocument.body;
      dispatchTarget.dispatchEvent(mouseUpEvent);
    }
    originElement = null;
    if (touchEvent.cancelable) touchEvent.preventDefault();
  };
  targetDocument.addEventListener('touchstart', handleTouchStart, { passive: true });
  targetDocument.addEventListener('touchmove', handleTouchMove, { passive: false });
  targetDocument.addEventListener('touchend', endTouchDrag);
  targetDocument.addEventListener('touchcancel', endTouchDrag);
  editor.on('destroy', () => {
    clearPress();
    targetDocument.dbTouchDragWired = false;
    targetDocument.removeEventListener('touchstart', handleTouchStart);
    targetDocument.removeEventListener('touchmove', handleTouchMove);
    targetDocument.removeEventListener('touchend', endTouchDrag);
    targetDocument.removeEventListener('touchcancel', endTouchDrag);
  });
};

export default attachLongPressDrag;
