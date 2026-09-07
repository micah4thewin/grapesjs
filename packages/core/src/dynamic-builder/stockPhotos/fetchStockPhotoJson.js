const describeResponseProblem = (statusCode) => {
  if (statusCode === 401 || statusCode === 403) return 'The photo service did not accept the key saved for this site.';
  if (statusCode === 429) return 'The photo service is busy right now. Wait a moment and search again.';
  return 'The photo service could not be reached. Check the connection and try again.';
};

const fetchStockPhotoJson = (requestUrl, requestHeaders) => {
  if (typeof globalThis.fetch !== 'function')
    return Promise.reject(new Error('This browser cannot reach the photo service.'));
  return globalThis
    .fetch(requestUrl, { headers: requestHeaders || {}, credentials: 'omit', mode: 'cors' })
    .then((responseValue) => {
      if (!responseValue || !responseValue.ok)
        return Promise.reject(new Error(describeResponseProblem(responseValue ? responseValue.status : 0)));
      return responseValue.json();
    });
};

export default fetchStockPhotoJson;
