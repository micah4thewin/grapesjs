const buildDefaultDeadlineDate = (daysAhead = 30) => {
  const millisecondsAhead = daysAhead * 24 * 60 * 60 * 1000;
  return new Date(Date.now() + millisecondsAhead).toISOString().slice(0, 10);
};

export default buildDefaultDeadlineDate;
