import getFlowRuntimeBindingSource from './getFlowRuntimeBindingSource.js';
import getFlowRuntimeDialogActionSource from './getFlowRuntimeDialogActionSource.js';
import getFlowRuntimeElementActionSource from './getFlowRuntimeElementActionSource.js';
import getFlowRuntimeHelperSource from './getFlowRuntimeHelperSource.js';
import getFlowRuntimeStorageActionSource from './getFlowRuntimeStorageActionSource.js';
import getFlowRuntimeWatchSource from './getFlowRuntimeWatchSource.js';

const getFlowRuntimeSource = (allowScripts) =>
  [
    ...getFlowRuntimeHelperSource(allowScripts),
    ...getFlowRuntimeDialogActionSource(),
    ...getFlowRuntimeStorageActionSource(),
    ...getFlowRuntimeElementActionSource(),
    ...getFlowRuntimeBindingSource(),
    ...getFlowRuntimeWatchSource(),
  ].join('\n');

export default getFlowRuntimeSource;
