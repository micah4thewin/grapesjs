const buildArticleRecordFields = (articleValues, pageUrl) => ({
  headline: articleValues.headline,
  description: articleValues.description,
  image: articleValues.image,
  author: {
    '@type': 'Person',
    name: articleValues.authorName,
  },
  datePublished: articleValues.datePublished,
  dateModified: articleValues.dateModified,
  mainEntityOfPage: pageUrl,
});

export default buildArticleRecordFields;
