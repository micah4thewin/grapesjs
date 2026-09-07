const getSampleTextPatterns = () => [
  /lorem ipsum/i,
  /\bsample (copy|text|content|heading|headline|paragraph|title)\b/i,
  /\b(your|the) (text|copy|heading|headline|title|content|message) (goes )?here\b/i,
  /\bplaceholder (text|copy|content|image)\b/i,
  /\b(edit|replace) this (text|copy|heading|paragraph)\b/i,
  /\bdummy (text|copy|content)\b/i,
];

export default getSampleTextPatterns;
