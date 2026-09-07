import appendDriverSkipButton from './appendDriverSkipButton.js';
import buildDriverStepRecords from './buildDriverStepRecords.js';
import prefersReducedMotion from './prefersReducedMotion.js';
import wireDriverPopoverFocus from './wireDriverPopoverFocus.js';

const runDriverTour = (driverFactory, containerElement, stepRecords, onFinish) => {
  const ownerDocument = containerElement.ownerDocument;
  const targetWindow = ownerDocument.defaultView;
  const releaseFocusTrap = wireDriverPopoverFocus(ownerDocument);
  let driverInstance = null;
  const stopTour = () => driverInstance && driverInstance.destroy();
  driverInstance = driverFactory({
    steps: buildDriverStepRecords(stepRecords),
    animate: !prefersReducedMotion(targetWindow),
    smoothScroll: !prefersReducedMotion(targetWindow),
    allowClose: true,
    allowKeyboardControl: true,
    disableActiveInteraction: false,
    overlayOpacity: 0.55,
    stagePadding: 6,
    stageRadius: 8,
    popoverOffset: 14,
    popoverClass: 'gjs-db-tour-popover',
    showProgress: true,
    progressText: 'Step {{current}} of {{total}}',
    nextBtnText: 'Next',
    prevBtnText: 'Back',
    doneBtnText: 'Done',
    onPopoverRender: (popoverRecord) => appendDriverSkipButton(popoverRecord, stopTour),
    onDestroyed: () => {
      releaseFocusTrap();
      if (onFinish) onFinish();
    },
  });
  driverInstance.drive();
  return { close: stopTour };
};

export default runDriverTour;
