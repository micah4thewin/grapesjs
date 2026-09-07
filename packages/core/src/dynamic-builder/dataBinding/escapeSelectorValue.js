const escapeSelectorValue = (rawValue) =>
  String(rawValue == null ? '' : rawValue)
    .replace(/\\/g, '\\\\')
    .replace(/\u0022/g, '\\\u0022');

export default escapeSelectorValue;
