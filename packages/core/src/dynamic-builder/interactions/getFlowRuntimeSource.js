import getFlowRuntimeBindingSource from './getFlowRuntimeBindingSource.js';
import getFlowRuntimeDialogActionSource from './getFlowRuntimeDialogActionSource.js';
import getFlowRuntimeElementActionSource from './getFlowRuntimeElementActionSource.js';
import getFlowRuntimeHelperSource from './getFlowRuntimeHelperSource.js';

const getFlowRuntimeSource = (allowScripts) =>
  [
    ...getFlowRuntimeHelperSource(allowScripts),
    ...getFlowRuntimeDialogActionSource(),
    ...getFlowRuntimeElementActionSource(),
    ...getFlowRuntimeBindingSource(),
  ].join('\n');

export default getFlowRuntimeSource;
