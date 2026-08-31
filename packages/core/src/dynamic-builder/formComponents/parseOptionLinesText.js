const parseOptionLinesText = (optionsText) =>
  String(optionsText || '')
    .split(/\r?\n/)
    .map((lineText) => lineText.trim())
    .filter(Boolean)
    .map((lineText) => {
      const separatorIndex = lineText.indexOf('|');
      const rawValue = separatorIndex >= 0 ? lineText.slice(0, separatorIndex).trim() : lineText;
      const rawLabel = separatorIndex >= 0 ? lineText.slice(separatorIndex + 1).trim() : lineText;
      return { optionValue: rawValue || rawLabel, optionLabel: rawLabel || rawValue };
    });

export default parseOptionLinesText;
