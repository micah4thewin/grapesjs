const activateSharePreviewPlatform = (rootElement, platformId) => {
  const cardElement = rootElement.querySelector('[data-db-seo-social-card]');
  if (!cardElement) return;
  cardElement.dataset.dbSeoActivePlatform = platformId;
  cardElement.querySelectorAll('[data-db-seo-platform]').forEach((platformButton) => {
    const isActive = platformButton.dataset.dbSeoPlatform === platformId;
    platformButton.classList.toggle('gjs-db-button-primary', isActive);
    platformButton.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  });
};

export default activateSharePreviewPlatform;
