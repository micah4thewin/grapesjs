const formatOffsetLabel = (offsetValue) => 'UTC' + offsetValue;

const getTimeZoneOffsetOptions = () => {
  const offsetValues = [];
  for (let hourOffset = -12; hourOffset <= 14; hourOffset += 1) {
    if (hourOffset === 0) continue;
    const signText = hourOffset < 0 ? '-' : '+';
    offsetValues.push(signText + String(Math.abs(hourOffset)).padStart(2, '0') + ':00');
  }
  ['+03:30', '+04:30', '+05:30', '+05:45', '+06:30', '+09:30', '+10:30', '-03:30', '-09:30'].forEach((extraOffset) =>
    offsetValues.push(extraOffset),
  );
  offsetValues.sort((leftOffset, rightOffset) => {
    const toMinutes = (offsetValue) =>
      (offsetValue.charAt(0) === '-' ? -1 : 1) *
      (Number(offsetValue.slice(1, 3)) * 60 + Number(offsetValue.slice(4, 6)));
    return toMinutes(leftOffset) - toMinutes(rightOffset);
  });
  return [
    { id: '', label: "Visitor's local time" },
    { id: 'Z', label: 'UTC' },
    ...offsetValues.map((offsetValue) => ({ id: offsetValue, label: formatOffsetLabel(offsetValue) })),
  ];
};

export default getTimeZoneOffsetOptions;
