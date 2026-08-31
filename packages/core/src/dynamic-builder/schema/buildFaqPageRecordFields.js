const buildFaqPageRecordFields = (faqEntries) => ({
  mainEntity: (faqEntries || []).map((faqEntry) => ({
    '@type': 'Question',
    name: faqEntry.questionText,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faqEntry.answerText,
    },
  })),
});

export default buildFaqPageRecordFields;
