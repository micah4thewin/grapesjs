const buildPhoneHref = (phoneText) => {
  const compactPhone = String(phoneText || '').replace(/[^0-9+]/g, '');
  if (!compactPhone) return '';
  const leadingPlus = compactPhone.charAt(0) === '+' ? '+' : '';
  return 'tel:' + leadingPlus + compactPhone.replace(/\+/g, '');
};

export default buildPhoneHref;
