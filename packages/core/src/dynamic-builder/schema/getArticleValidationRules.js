const getArticleValidationRules = () => ({
  required: ['headline', 'datePublished'],
  recommended: ['description', 'image', 'authorName', 'dateModified'],
});

export default getArticleValidationRules;
