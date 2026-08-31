const formatTraitDisplayValue = (rawValue) =>
  rawValue === undefined || rawValue === null || rawValue === false ? '' : String(rawValue);

export default formatTraitDisplayValue;
