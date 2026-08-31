const buildTextUtilityCss = () => `
.db-text-balance {
  text-wrap: balance;
}
.db-clamp-2,
.db-clamp-3 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.db-clamp-2 {
  -webkit-line-clamp: 2;
  line-clamp: 2;
  max-height: 3.4em;
}
.db-clamp-3 {
  -webkit-line-clamp: 3;
  line-clamp: 3;
  max-height: 5.1em;
}
`;

export default buildTextUtilityCss;
