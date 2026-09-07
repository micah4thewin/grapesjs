const isRobotsDirectiveLine = (lineText) => {
  const trimmedLine = String(lineText || '').trim();
  if (!trimmedLine) return false;
  if (trimmedLine.startsWith('#')) return true;
  return /^(user-agent|allow|disallow|crawl-delay|sitemap|host|clean-param)\s*:/i.test(trimmedLine);
};

export default isRobotsDirectiveLine;
