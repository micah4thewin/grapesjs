const resolveSliderUnitText = (trait) => {
  const explicitUnit = trait && trait.get('unit');
  if (explicitUnit !== undefined && explicitUnit !== null) return String(explicitUnit);
  const traitName = String((trait && trait.get('name')) || '').toLowerCase();
  const traitLabel = String((trait && trait.get('label')) || '').toLowerCase();
  if (/\(px\)|\(ms\)|\(s\)|\(%\)/.test(traitLabel)) return '';
  if (/duration|delay|timeout|interval/.test(traitName)) return 'ms';
  if (/size|offset|width|height|spacing|radius|gap|blur/.test(traitName)) return 'px';
  if (/opacity|strength|percent/.test(traitName)) return '%';
  return '';
};

export default resolveSliderUnitText;
