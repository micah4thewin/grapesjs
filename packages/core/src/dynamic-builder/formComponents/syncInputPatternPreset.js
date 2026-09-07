import getPatternPresetRecords from './getPatternPresetRecords.js';

const syncInputPatternPreset = (component) => {
  if (!component || !component.is || !component.is('db-input')) return;
  const presetId = String(component.getAttributes()['data-db-pattern-preset'] || '');
  const presetRecord = getPatternPresetRecords().find((candidate) => candidate.id === presetId);
  if (!presetRecord || presetRecord.pattern === null) return;
  if (!presetRecord.pattern) {
    component.removeAttributes(['pattern', 'data-db-pattern-message']);
    return;
  }
  component.addAttributes({ pattern: presetRecord.pattern, 'data-db-pattern-message': presetRecord.message });
};

export default syncInputPatternPreset;
