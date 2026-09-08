// Loads a picture address off-screen so a broken link is caught before it is
// written onto the page. Resolves true when the browser could decode it.
const probeImageUrl = (ownerDocument, imageUrl, timeoutMs) =>
  new Promise((resolveProbe) => {
    if (!ownerDocument || !imageUrl) return resolveProbe(false);
    const probeElement = ownerDocument.createElement('img');
    let settled = false;
    const settle = (didLoad) => {
      if (settled) return;
      settled = true;
      probeElement.onload = null;
      probeElement.onerror = null;
      resolveProbe(didLoad);
    };
    probeElement.onload = () => settle(true);
    probeElement.onerror = () => settle(false);
    probeElement.decoding = 'async';
    probeElement.src = imageUrl;
    setTimeout(() => settle(Boolean(probeElement.complete && probeElement.naturalWidth > 0)), timeoutMs || 8000);
  });

export default probeImageUrl;
