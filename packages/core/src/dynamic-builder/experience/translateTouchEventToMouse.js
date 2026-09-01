const translateTouchEventToMouse = (touchEvent, mouseEventName) => {
  const touchPoint =
    (touchEvent.changedTouches && touchEvent.changedTouches[0]) || (touchEvent.touches && touchEvent.touches[0]);
  if (!touchPoint) return null;
  const ownerDocument = touchEvent.target && touchEvent.target.ownerDocument;
  return new MouseEvent(mouseEventName, {
    bubbles: true,
    cancelable: true,
    view: ownerDocument ? ownerDocument.defaultView : window,
    clientX: touchPoint.clientX,
    clientY: touchPoint.clientY,
    screenX: touchPoint.screenX,
    screenY: touchPoint.screenY,
    button: 0,
    buttons: 1,
  });
};

export default translateTouchEventToMouse;
