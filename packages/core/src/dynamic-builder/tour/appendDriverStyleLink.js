const appendDriverStyleLink = (targetDocument, tourSettings) => {
  if (!tourSettings.styleUrl || !targetDocument.head) return;
  if (targetDocument.getElementById('db-tour-driver-style')) return;
  const linkElement = targetDocument.createElement('link');
  linkElement.id = 'db-tour-driver-style';
  linkElement.rel = 'stylesheet';
  linkElement.href = tourSettings.styleUrl;
  if (tourSettings.styleIntegrity) {
    linkElement.integrity = tourSettings.styleIntegrity;
    linkElement.crossOrigin = 'anonymous';
  }
  targetDocument.head.appendChild(linkElement);
};

export default appendDriverStyleLink;
