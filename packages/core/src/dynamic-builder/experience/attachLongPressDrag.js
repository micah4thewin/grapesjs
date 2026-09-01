import translateTouchEventToMouse from './translateTouchEventToMouse.js';
import triggerHapticPulse from './triggerHapticPulse.js';

const attachLongPressDrag = (targetDocument, dragOriginSelector, hapticsEnabled) => {
  if (!targetDocument || targetDocument.dbTouchDragWired) return;
  targetDocument.dbTouchDragWired = true;
  let pressTimer = null;
  let dragActive = false;
  let startPoint = null;
  const clearPress = () => {
    pressTimer && clearTimeout(pressTimer);
    pressTimer = null;
  };
  targetDocument.addEventListener(
    'touchstart',
    (touchEvent) => {
      const touchPoint = touchEvent.touches[0];
      if (!touchPoint || touchEvent.touches.length > 1) return;
      const targetElement = touchEvent.target;
      const originElement = targetElement && targetElement.closest ? targetElement.closest(dragOriginSelector) : null;
      if (!originElement) return;
      startPoint = { x: touchPoint.clientX, y: touchPoint.clientY };
      clearPress();
      pressTimer = setTimeout(() => {
        dragActive = true;
        const mouseDownEvent = translateTouchEventToMouse(touchEvent, 'mousedown');
        mouseDownEvent && originElement.dispatchEvent(mouseDownEvent);
        hapticsEnabled && triggerHapticPulse(8);
      }, 180);
    },
    { passive: true },
  );
  targetDocument.addEventListener(
    'touchmove',
    (touchEvent) => {
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
      mouseMoveEvent && targetDocument.dispatchEvent(mouseMoveEvent);
    },
    { passive: false },
  );
  const endTouchDrag = (touchEvent) => {
    clearPress();
    startPoint = null;
    if (!dragActive) return;
    dragActive = false;
    const mouseUpEvent = translateTouchEventToMouse(touchEvent, 'mouseup');
    mouseUpEvent && targetDocument.dispatchEvent(mouseUpEvent);
  };
  targetDocument.addEventListener('touchend', endTouchDrag);
  targetDocument.addEventListener('touchcancel', endTouchDrag);
};

export default attachLongPressDrag;
