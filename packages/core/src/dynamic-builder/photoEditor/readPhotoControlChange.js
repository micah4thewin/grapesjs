const readPhotoControlChange = (editState, controlElement) => {
  const controlName = controlElement.getAttribute('name');
  const rawValue = controlElement.value;
  const fractionNames = ['cropWidth', 'cropX', 'cropY'];
  if (controlName === 'format') return { ...editState, format: rawValue };
  if (fractionNames.indexOf(controlName) >= 0) {
    const fraction = Number(rawValue) / 100;
    if (controlName === 'cropWidth') return { ...editState, cropWidth: fraction, cropHeight: fraction };
    return { ...editState, [controlName]: fraction };
  }
  return { ...editState, [controlName]: Number(rawValue) };
};

export default readPhotoControlChange;
