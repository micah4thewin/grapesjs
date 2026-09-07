import createLocalTemplateStore from './createLocalTemplateStore.js';

const hasStoreApi = (storeCandidate) =>
  Boolean(storeCandidate) &&
  typeof storeCandidate.listTemplates === 'function' &&
  typeof storeCandidate.writeTemplate === 'function' &&
  typeof storeCandidate.deleteTemplate === 'function';

const resolveTemplateStore = (moduleOptions) =>
  hasStoreApi(moduleOptions && moduleOptions.store) ? moduleOptions.store : createLocalTemplateStore();

export default resolveTemplateStore;
