const readSearchPageNumber = (pageNumber) => {
  const parsedNumber = Math.round(Number(pageNumber));
  return Number.isFinite(parsedNumber) && parsedNumber > 0 ? parsedNumber : 1;
};

export default readSearchPageNumber;
