const formatFaqCountText = (faqEntryCount) => {
  const entryCount = Number(faqEntryCount) || 0;
  if (!entryCount) return 'No accordion found yet. Add an accordion block with questions and answers to this page.';
  return entryCount + (entryCount === 1 ? ' question and answer pair found.' : ' question and answer pairs found.');
};

export default formatFaqCountText;
