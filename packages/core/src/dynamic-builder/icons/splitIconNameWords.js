const splitIconNameWords = (iconName) =>
  String(iconName || '')
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .toLowerCase();

export default splitIconNameWords;
