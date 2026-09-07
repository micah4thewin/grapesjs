const hasAdapterApi = (adapterCandidate, methodNames) =>
  Boolean(adapterCandidate) && methodNames.every((methodName) => typeof adapterCandidate[methodName] === 'function');

export default hasAdapterApi;
