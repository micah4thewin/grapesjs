import isEditorLive from '../support/isEditorLive.js';
import mirrorTourThemeTokens from './mirrorTourThemeTokens.js';
import resolveTourStepTargets from './resolveTourStepTargets.js';
import runDriverTour from './runDriverTour.js';
import runFallbackTour from './runFallbackTour.js';
import showToastNotice from '../support/showToastNotice.js';
import waitForDriverLibrary from './waitForDriverLibrary.js';

const runningMarker = 'data-db-tour-running';

const startGuidedTour = (editor, tourSettings, notifyWhenUnavailable) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.ownerDocument) return false;
  if (containerElement.hasAttribute(runningMarker)) return false;
  const stepRecords = resolveTourStepTargets(containerElement);
  if (stepRecords.length < 2) {
    if (notifyWhenUnavailable)
      showToastNotice(editor, 'The tour opens once the editor has finished loading. Try again in a moment.', {
        kind: 'warning',
      });
    return false;
  }
  containerElement.setAttribute(runningMarker, 'true');
  mirrorTourThemeTokens(containerElement);
  let activeSession = null;
  const refreshThemeTokens = () => isEditorLive(editor) && mirrorTourThemeTokens(containerElement);
  const closeOnDestroy = () => activeSession && activeSession.close && activeSession.close();
  const finishTour = () => {
    containerElement.removeAttribute(runningMarker);
    activeSession = null;
    editor.off('db:theme:update', refreshThemeTokens);
    editor.off('destroy', closeOnDestroy);
    editor.trigger('db:tour:end');
  };
  editor.on('db:theme:update', refreshThemeTokens);
  editor.on('destroy', closeOnDestroy);
  waitForDriverLibrary(containerElement.ownerDocument, tourSettings, 4000).then((driverFactory) => {
    if (!isEditorLive(editor) || !containerElement.hasAttribute(runningMarker)) return;
    activeSession = driverFactory
      ? runDriverTour(driverFactory, containerElement, stepRecords, finishTour)
      : runFallbackTour(containerElement, stepRecords, finishTour);
    if (!activeSession) finishTour();
    else editor.trigger('db:tour:start', { stepCount: stepRecords.length, usesDriver: Boolean(driverFactory) });
  });
  return true;
};

export default startGuidedTour;
