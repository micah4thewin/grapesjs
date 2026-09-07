const formatAuditRunTimeText = (completedAt) => {
  const timeValue = Number(completedAt);
  if (!Number.isFinite(timeValue) || timeValue <= 0) return '';
  const elapsedMinutes = Math.floor((Date.now() - timeValue) / 60000);
  if (elapsedMinutes < 1) return 'just now';
  if (elapsedMinutes < 60) return elapsedMinutes + (elapsedMinutes === 1 ? ' minute ago' : ' minutes ago');
  const elapsedHours = Math.floor(elapsedMinutes / 60);
  if (elapsedHours < 24) return elapsedHours + (elapsedHours === 1 ? ' hour ago' : ' hours ago');
  return 'on ' + new Date(timeValue).toLocaleDateString();
};

export default formatAuditRunTimeText;
