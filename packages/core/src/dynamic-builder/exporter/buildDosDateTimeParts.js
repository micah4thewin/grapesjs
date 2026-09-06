const buildDosDateTimeParts = (dateValue) => {
  const sourceDate = dateValue instanceof Date && !isNaN(dateValue.getTime()) ? dateValue : new Date();
  const clampedYear = Math.max(1980, Math.min(2107, sourceDate.getFullYear()));
  return {
    dosDate: ((clampedYear - 1980) << 9) | ((sourceDate.getMonth() + 1) << 5) | sourceDate.getDate(),
    dosTime: (sourceDate.getHours() << 11) | (sourceDate.getMinutes() << 5) | Math.floor(sourceDate.getSeconds() / 2),
  };
};

export default buildDosDateTimeParts;
