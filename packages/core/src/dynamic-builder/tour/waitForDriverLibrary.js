import loadDriverLibrary from './loadDriverLibrary.js';

const waitForDriverLibrary = (targetDocument, tourSettings, timeoutMilliseconds) =>
  new Promise((resolveWait) => {
    const session = { hasSettled: false, timeoutTimer: 0 };
    const settleOnce = (factoryValue) => {
      if (session.hasSettled) return;
      session.hasSettled = true;
      clearTimeout(session.timeoutTimer);
      resolveWait(factoryValue || null);
    };
    session.timeoutTimer = setTimeout(() => settleOnce(null), timeoutMilliseconds || 4000);
    loadDriverLibrary(targetDocument, tourSettings).then(settleOnce, () => settleOnce(null));
  });

export default waitForDriverLibrary;
