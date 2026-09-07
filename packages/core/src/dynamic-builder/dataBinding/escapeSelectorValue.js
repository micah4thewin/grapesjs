const escapeSelectorValue = (rawValue) =>
  String(rawValue == null ? '' : rawValue)
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"');

export default escapeSelectorValue;
