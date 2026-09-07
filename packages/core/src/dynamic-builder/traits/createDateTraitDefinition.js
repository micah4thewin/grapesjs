import buildTraitAriaLabelAttribute from './buildTraitAriaLabelAttribute.js';
import createValueTraitDefinition from './createValueTraitDefinition.js';

const allowedDateKinds = ['date', 'time', 'datetime-local', 'month', 'week'];

const resolveDateKind = (trait) => {
  const requestedKind = String((trait && trait.get('dateKind')) || '').toLowerCase();
  if (allowedDateKinds.indexOf(requestedKind) >= 0) return requestedKind;
  const traitName = String((trait && trait.get('name')) || '').toLowerCase();
  if (/-time$|time$/.test(traitName) && !/datetime/.test(traitName)) return 'time';
  if (/datetime/.test(traitName)) return 'datetime-local';
  return 'date';
};

const createDateTraitDefinition = () =>
  createValueTraitDefinition(
    ({ trait }) =>
      [
        '<div class="gjs-db-field">',
        `<input type="${resolveDateKind(trait)}" class="gjs-db-field-input"${buildTraitAriaLabelAttribute(trait)}>`,
        '</div>',
      ].join(''),
    'input',
  );

export default createDateTraitDefinition;
