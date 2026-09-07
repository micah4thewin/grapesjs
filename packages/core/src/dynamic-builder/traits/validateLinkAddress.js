import normalizeUrlInput from './normalizeUrlInput.js';
import sanitizeUrlValue from '../support/sanitizeUrlValue.js';

const validateLinkAddress = (linkKind, rawAddress) => {
  const addressText = String(rawAddress || '').trim();
  if (!addressText) return { address: '', message: '', addedScheme: false };
  if (linkKind === 'email') {
    const cleanAddress = addressText.replace(/^mailto:/i, '');
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanAddress);
    return {
      address: cleanAddress,
      message: isEmail ? '' : 'Enter an email like name@example.com',
      addedScheme: false,
    };
  }
  if (linkKind === 'phone') {
    const digitCount = addressText.replace(/\D/g, '').length;
    return {
      address: addressText,
      message: digitCount >= 3 ? '' : 'Enter a phone number with digits',
      addedScheme: false,
    };
  }
  const normalized = normalizeUrlInput(addressText);
  const safeValue = sanitizeUrlValue(normalized.value);
  return {
    address: safeValue,
    message: safeValue ? '' : 'This address is not allowed here, so it was not saved',
    addedScheme: normalized.addedScheme,
  };
};

export default validateLinkAddress;
