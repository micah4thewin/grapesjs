const runStorageRequest = (storageRequest) =>
  new Promise((resolveRequest, rejectRequest) => {
    storageRequest.onsuccess = () => resolveRequest(storageRequest.result);
    storageRequest.onerror = () => rejectRequest(storageRequest.error || new Error('Browser storage request failed'));
  });

export default runStorageRequest;
