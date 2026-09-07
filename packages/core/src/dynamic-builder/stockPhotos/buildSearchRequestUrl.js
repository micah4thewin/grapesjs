const buildSearchRequestUrl = (endpointUrl, parameterRecord) => {
  const parameterNames = Object.keys(parameterRecord || {}).filter((parameterName) => {
    const parameterValue = parameterRecord[parameterName];
    return parameterValue !== null && parameterValue !== undefined && String(parameterValue) !== '';
  });
  const queryText = parameterNames
    .map(
      (parameterName) =>
        encodeURIComponent(parameterName) + '=' + encodeURIComponent(String(parameterRecord[parameterName])),
    )
    .join('&');
  return queryText ? endpointUrl + '?' + queryText : endpointUrl;
};

export default buildSearchRequestUrl;
