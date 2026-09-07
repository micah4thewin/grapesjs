import loadDriverLibrary from './loadDriverLibrary.js';

const waitForDriverLibrary = (targetDocument, tourSettings, timeoutMilliseconds) =>
  new Promise((resolveWait) => {
    let hasSettled = false;
    const settleOnce = (factoryValue) => {
      if (hasSettled) return;
      hasSettled = true;
      resolveWait(factoryValue || null);
    };
    setTimeout(() => settleOnce(null), timeoutMilliseconds || 4000);
    loadDriverLibrary(targetDocument, tourSettings).then(settleOnce, () => settleOnce(null));
  });

export default waitForDriverLibrary;
