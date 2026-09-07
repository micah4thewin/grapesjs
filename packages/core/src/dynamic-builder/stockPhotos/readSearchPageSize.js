const readSearchPageSize = (adapterOptions) => {
  const parsedNumber = Math.round(Number(adapterOptions && adapterOptions.perPage));
  return Number.isFinite(parsedNumber) && parsedNumber > 0 ? Math.min(parsedNumber, 60) : 24;
};

export default readSearchPageSize;
