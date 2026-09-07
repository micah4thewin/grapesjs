const computeYearlyAmount = (monthlyAmount, discountPercent) => {
  const safeMonthly = Number(monthlyAmount);
  if (!isFinite(safeMonthly)) return 0;
  const safeDiscount = Math.min(100, Math.max(0, Number(discountPercent) || 0));
  const rawYearly = safeMonthly * 12 * (1 - safeDiscount / 100);
  return Number.isInteger(safeMonthly) ? Math.round(rawYearly) : Math.round(rawYearly * 100) / 100;
};

export default computeYearlyAmount;
