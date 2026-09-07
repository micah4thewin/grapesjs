import escapeHtmlText from '../support/escapeHtmlText.js';

const buildTraitAriaLabelAttribute = (trait, suffixText) => {
  const labelText = String((trait && (trait.get('label') || trait.get('name'))) || '').trim();
  const fullText = [labelText, suffixText].filter(Boolean).join(' ');
  return fullText ? ` aria-label="${escapeHtmlText(fullText)}"` : '';
};

export default buildTraitAriaLabelAttribute;
