const runPricingToggleBehavior = () => {
  document.querySelectorAll('[data-db-type="pricing"]').forEach((pricingElement) => {
    if (pricingElement.dataset.dbPricingReady) return;
    pricingElement.dataset.dbPricingReady = 'true';
    const applyBillingPeriod = (billingPeriod) => {
      const safePeriod = billingPeriod === 'yearly' ? 'yearly' : 'monthly';
      pricingElement.setAttribute('data-db-billing-active', safePeriod);
      pricingElement.querySelectorAll('[data-db-billing]').forEach((toggleButton) => {
        const isPressed = toggleButton.getAttribute('data-db-billing') === safePeriod;
        toggleButton.setAttribute('aria-pressed', isPressed ? 'true' : 'false');
      });
      pricingElement.querySelectorAll('[data-db-price-monthly]').forEach((priceElement) => {
        const priceText =
          safePeriod === 'yearly'
            ? priceElement.getAttribute('data-db-price-yearly')
            : priceElement.getAttribute('data-db-price-monthly');
        const periodText =
          safePeriod === 'yearly'
            ? priceElement.getAttribute('data-db-period-yearly')
            : priceElement.getAttribute('data-db-period-monthly');
        const priceValueElement = priceElement.querySelector('[data-db-price-value]');
        const pricePeriodElement = priceElement.querySelector('[data-db-price-period]');
        if (priceValueElement && priceText !== null) priceValueElement.textContent = priceText;
        if (pricePeriodElement && periodText !== null) pricePeriodElement.textContent = periodText;
      });
    };
    pricingElement.addEventListener('click', (clickEvent) => {
      const clickTarget = clickEvent.target;
      const toggleButton = clickTarget && clickTarget.closest ? clickTarget.closest('[data-db-billing]') : null;
      if (!toggleButton || !pricingElement.contains(toggleButton)) return;
      applyBillingPeriod(toggleButton.getAttribute('data-db-billing'));
    });
    applyBillingPeriod(pricingElement.getAttribute('data-db-billing-default'));
  });
};

export default runPricingToggleBehavior;
