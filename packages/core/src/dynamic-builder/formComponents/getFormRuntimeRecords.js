import hasComponentWithAttribute from '../support/hasComponentWithAttribute.js';
import runConditionalFieldsBehavior from './runConditionalFieldsBehavior.js';
import runFormStepsBehavior from './runFormStepsBehavior.js';

const toRuntimeSource = (runtimeFunction) => {
  const functionText = String(runtimeFunction).trim();
  return functionText.slice(functionText.indexOf('{') + 1, functionText.lastIndexOf('}')).trim();
};

const getFormRuntimeRecords = () => ({
  'db-form-steps': {
    detect: (editor, page) => hasComponentWithAttribute(editor, 'data-db-form-step', page),
    source: () => toRuntimeSource(runFormStepsBehavior),
  },
  'db-form-conditions': {
    detect: (editor, page) => hasComponentWithAttribute(editor, 'data-db-show-when-field', page),
    source: () => toRuntimeSource(runConditionalFieldsBehavior),
  },
});

export default getFormRuntimeRecords;
