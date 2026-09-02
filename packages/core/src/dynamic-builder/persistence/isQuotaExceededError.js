const isQuotaExceededError = (writeError) => {
  if (!writeError) return false;
  const errorName = String(writeError.name || '');
  const errorCode = Number(writeError.code);
  return (
    errorName === 'QuotaExceededError' ||
    errorName === 'NS_ERROR_DOM_QUOTA_REACHED' ||
    errorCode === 22 ||
    errorCode === 1014
  );
};

export default isQuotaExceededError;
