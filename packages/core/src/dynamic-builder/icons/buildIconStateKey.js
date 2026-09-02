const buildIconStateKey = (iconSettings) =>
  [
    iconSettings.iconName,
    iconSettings.size,
    iconSettings.strokeWidth,
    iconSettings.isDecorative ? 'decorative' : 'labelled',
    iconSettings.accessibleLabel,
  ].join('|');

export default buildIconStateKey;
