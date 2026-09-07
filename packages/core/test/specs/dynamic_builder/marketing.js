import grapesjs from '../../../src';
import { fixJsDom, fixJsDomIframe } from '../../common';
import appendPricingFeatureRow from '../../../src/dynamic-builder/marketingComponents/appendPricingFeatureRow';
import appendPricingTier from '../../../src/dynamic-builder/marketingComponents/appendPricingTier';
import buildMarketingLookInvertedCss from '../../../src/dynamic-builder/marketingComponents/buildMarketingLookInvertedCss';
import computeYearlyAmount from '../../../src/dynamic-builder/marketingComponents/computeYearlyAmount';
import findDescendantByAttribute from '../../../src/dynamic-builder/marketingComponents/findDescendantByAttribute';
import findDescendantByField from '../../../src/dynamic-builder/marketingComponents/findDescendantByField';
import formatPriceAmount from '../../../src/dynamic-builder/marketingComponents/formatPriceAmount';
import formatStatNumber from '../../../src/dynamic-builder/marketingComponents/formatStatNumber';
import getSiteMetaRecord from '../../../src/dynamic-builder/support/getSiteMetaRecord';
import readComponentPlainText from '../../../src/dynamic-builder/marketingComponents/readComponentPlainText';
import syncCardLinkLabel from '../../../src/dynamic-builder/marketingComponents/syncCardLinkLabel';

describe('Dynamic builder marketing components', () => {
  let editor;

  const appendToPage = (definition) => editor.getWrapper().append(definition)[0];
  const findByType = (rootComponent, typeName) => {
    const matches = [];
    const visit = (component) => {
      if (component.get('type') === typeName) matches.push(component);
      component.components().forEach(visit);
    };
    visit(rootComponent);
    return matches;
  };
  const traitNames = (component) => component.get('traits').map((trait) => trait.get('name'));

  beforeEach(() => {
    document.body.innerHTML = '<div id="fixtures"><div id="db-editor"></div></div>';
    editor = grapesjs.init({
      container: '#db-editor',
      storageManager: { autoload: false, autosave: false, type: '' },
      plugins: [fixJsDom, grapesjs.dynamicBuilder],
    });
    fixJsDomIframe(editor.getModel().shallow);
  });

  afterEach(() => {
    editor.destroy();
  });

  describe('pure helpers', () => {
    test('formatStatNumber keeps the decimals typed by the user', () => {
      expect(formatStatNumber('4.9', 'en-US')).toBe('4.9');
      expect(formatStatNumber('12000', 'en-US')).toBe('12,000');
      expect(formatStatNumber('-3', 'en-US')).toBe('-3');
    });

    test('yearly amounts follow the discount and currency formatting is locale aware', () => {
      expect(computeYearlyAmount(19, 17)).toBe(189);
      expect(computeYearlyAmount(10, 0)).toBe(120);
      expect(formatPriceAmount(19, 'USD', 'en-US')).toBe('$19');
      expect(formatPriceAmount(19.5, 'EUR', 'en-US')).toContain('19.50');
    });

    test('the look CSS flips primary buttons on brand surfaces', () => {
      const cssText = buildMarketingLookInvertedCss();
      expect(cssText).toContain('[data-db-theme=brand] .db-button-primary');
      expect(cssText).toContain('[data-db-theme=dark] .db-pricing-tier');
    });
  });

  describe('hero', () => {
    test('exposes a Look trait with a photo option and slugs the anchor name', () => {
      const heroComponent = appendToPage({ type: 'db-hero' });
      const lookTrait = heroComponent.get('traits').find((trait) => trait.get('name') === 'data-db-theme');
      expect(lookTrait.get('label')).toBe('Look');
      expect(lookTrait.get('options').map((option) => option.id)).toContain('photo');
      heroComponent.addAttributes({ id: 'My Hero' });
      expect(heroComponent.getAttributes().id).toBe('my-hero');
    });

    test('the picture can be removed and restored from the Picture trait', () => {
      const heroComponent = appendToPage({ type: 'db-hero' });
      expect(findDescendantByAttribute(heroComponent, 'data-db-hero-media')).toBeTruthy();
      heroComponent.addAttributes({ 'data-db-media': 'none' });
      expect(findDescendantByAttribute(heroComponent, 'data-db-hero-media')).toBeNull();
      heroComponent.addAttributes({ 'data-db-media': 'image' });
      expect(findDescendantByAttribute(heroComponent, 'data-db-hero-media')).toBeTruthy();
    });

    test('choosing a background photo switches the look to photo', () => {
      const heroComponent = appendToPage({ type: 'db-hero' });
      heroComponent.addAttributes({ 'data-db-bg-image': 'https://example.com/photo.jpg' });
      expect(heroComponent.getAttributes()['data-db-theme']).toBe('photo');
      expect(String(heroComponent.getStyle()['--db-section-bg-image'])).toContain('photo.jpg');
    });
  });

  describe('pricing', () => {
    const readPrice = (tierComponent) => ({
      value: readComponentPlainText(findDescendantByAttribute(tierComponent, 'data-db-price-value')),
      period: readComponentPlainText(findDescendantByAttribute(tierComponent, 'data-db-price-period')),
    });

    test('prices are computed from the monthly amount, currency and discount', () => {
      const pricingComponent = appendToPage({ type: 'db-pricing' });
      const tierComponents = findByType(pricingComponent, 'db-pricing-tier');
      expect(tierComponents.length).toBe(3);
      expect(readPrice(tierComponents[0])).toEqual({ value: '$19', period: '/month' });
      tierComponents[0].addAttributes({ 'data-db-amount': '25' });
      expect(readPrice(tierComponents[0]).value).toBe('$25');
      pricingComponent.addAttributes({ 'data-db-yearly-discount': '50', 'data-db-billing-default': 'yearly' });
      expect(readPrice(tierComponents[0])).toEqual({ value: '$150', period: '/year' });
      const yearlyToggle = findByType(pricingComponent, 'text').find(
        (component) => component.getAttributes()['data-db-billing'] === 'yearly',
      );
      expect(yearlyToggle.getAttributes()['aria-pressed']).toBe('true');
      const saveComponent = findDescendantByAttribute(pricingComponent, 'data-db-pricing-save');
      expect(readComponentPlainText(saveComponent)).toBe('Save 50%');
      pricingComponent.addAttributes({ 'data-db-currency': 'EUR', 'data-db-period-yearly': ' per year' });
      expect(readPrice(tierComponents[0])).toEqual({ value: '€150', period: 'per year' });
    });

    test('only one plan can be highlighted and the badge text is an attribute', () => {
      const pricingComponent = appendToPage({ type: 'db-pricing' });
      const tierComponents = findByType(pricingComponent, 'db-pricing-tier');
      expect(tierComponents[1].getAttributes()['data-db-featured']).toBe('true');
      tierComponents[0].addAttributes({ 'data-db-featured': 'true' });
      expect(tierComponents[1].getAttributes()['data-db-featured']).toBe('false');
      expect(tierComponents[0].getAttributes()['data-db-badge']).toBe('Most popular');
    });

    test('plans and feature rows can be added from the settings buttons', () => {
      const pricingComponent = appendToPage({ type: 'db-pricing' });
      appendPricingTier(editor, pricingComponent);
      const tierComponents = findByType(pricingComponent, 'db-pricing-tier');
      expect(tierComponents.length).toBe(4);
      expect(readPrice(tierComponents[3]).value).toBe('$19');
      const featureList = findDescendantByAttribute(tierComponents[0], 'data-db-pricing-features');
      const rowCount = featureList.components().length;
      appendPricingFeatureRow(editor, tierComponents[0]);
      expect(featureList.components().length).toBe(rowCount + 1);
    });

    test('pricing buttons use the shared button classes', () => {
      const pricingComponent = appendToPage({ type: 'db-pricing' });
      const buttonComponents = findByType(pricingComponent, 'db-button');
      expect(buttonComponents.length).toBe(3);
      expect(buttonComponents[1].getClasses()).toEqual(
        expect.arrayContaining(['db-button', 'db-button-primary', 'db-button-md']),
      );
    });
  });

  describe('stats', () => {
    test('traits live on the stat and decimals are preserved', () => {
      const statsComponent = appendToPage({ type: 'db-stats' });
      const statComponent = findByType(statsComponent, 'db-stat')[0];
      expect(traitNames(statComponent)).toEqual(
        expect.arrayContaining(['data-db-stat-target', 'data-db-stat-prefix', 'data-db-stat-suffix']),
      );
      statComponent.addAttributes({ 'data-db-stat-target': '4.9', 'data-db-stat-suffix': '/5' });
      const valueComponent = findDescendantByAttribute(statComponent, 'data-db-stat-value');
      expect(readComponentPlainText(valueComponent)).toBe('4.9/5');
    });
  });

  describe('contact', () => {
    test('contact traits drive the text, the links and the site settings', () => {
      const contactComponent = appendToPage({ type: 'db-contact' });
      contactComponent.addAttributes({
        'data-db-address': '1 High Street, Bath',
        'data-db-phone': '+44 1225 000 000',
        'data-db-email': 'team@bath.example',
      });
      expect(readComponentPlainText(findDescendantByField(contactComponent, 'address'))).toBe('1 High Street, Bath');
      expect(findDescendantByField(contactComponent, 'phone').getAttributes().href).toBe('tel:+441225000000');
      expect(findDescendantByField(contactComponent, 'email').getAttributes().href).toBe('mailto:team@bath.example');
      expect(findDescendantByField(contactComponent, 'directions').getAttributes().href).toContain(
        encodeURIComponent('1 High Street, Bath'),
      );
      expect(getSiteMetaRecord(editor).contact.phone).toBe('+44 1225 000 000');
    });
  });

  describe('block drops', () => {
    test('a page-level marketing drop is wrapped in a section with an intro heading', () => {
      const featuresComponent = appendToPage({ type: 'db-features' });
      editor.trigger('block:drag:stop', featuresComponent);
      const containerComponent = featuresComponent.parent();
      expect(containerComponent.get('type')).toBe('db-container');
      expect(containerComponent.parent().get('type')).toBe('db-section');
      expect(findByType(containerComponent, 'db-heading').length).toBe(1);
    });

    test('a drop inside a section is left where it landed', () => {
      const sectionComponent = appendToPage({ type: 'db-section' });
      const containerComponent = sectionComponent.components().at(0);
      const statsComponent = containerComponent.append({ type: 'db-stats' })[0];
      editor.trigger('block:drag:stop', statsComponent);
      expect(statsComponent.parent()).toBe(containerComponent);
    });

    test('dropped testimonial trios rotate through different people', () => {
      const columnsComponent = appendToPage({
        type: 'db-columns',
        components: [1, 2, 3].map(() => ({ type: 'db-column', components: [{ type: 'db-testimonial' }] })),
      });
      editor.trigger('block:drag:stop', columnsComponent);
      const nameTexts = findByType(columnsComponent, 'db-testimonial').map((testimonial) =>
        readComponentPlainText(findDescendantByField(testimonial, 'name')),
      );
      expect(new Set(nameTexts).size).toBe(3);
      const portraitAlt = findDescendantByField(findByType(columnsComponent, 'db-testimonial')[1], 'portrait');
      expect(portraitAlt.getAttributes().alt).toBe('Portrait of ' + nameTexts[1]);
    });

    test('a dropped footer links to the real pages when the site has more than one', () => {
      editor.Pages.add({ name: 'About' });
      const footerComponent = appendToPage({ type: 'db-footer' });
      editor.trigger('block:drag:stop', footerComponent);
      const listComponent = findDescendantByAttribute(footerComponent, 'data-db-footer-list');
      const hrefValues = findByType(listComponent, 'link').map((linkComponent) => linkComponent.getAttributes().href);
      expect(hrefValues).toContain('about.html');
      expect(hrefValues).toContain('index.html');
    });
  });

  describe('footer, cards, testimonials and logos', () => {
    test('the footer reuses social links, editable links and the current year', () => {
      const footerComponent = appendToPage({ type: 'db-footer' });
      expect(findByType(footerComponent, 'db-social-links').length).toBe(1);
      expect(findByType(footerComponent, 'link').length).toBeGreaterThan(8);
      const copyrightText = readComponentPlainText(
        findByType(footerComponent, 'text').find((component) => component.getClasses().includes('db-footer-copyright')),
      );
      expect(copyrightText).toContain(String(new Date().getFullYear()));
      expect(footerComponent.getAttributes()['data-db-theme']).toBe('dark');
    });

    test('card links are shared link buttons whose label follows the title', () => {
      const cardComponent = appendToPage({ type: 'db-card' });
      const linkComponent = findDescendantByField(cardComponent, 'link');
      expect(linkComponent.get('type')).toBe('db-button');
      expect(linkComponent.getClasses()).toEqual(expect.arrayContaining(['db-button-link', 'db-stretched-link']));
      findDescendantByField(cardComponent, 'title').components('Spring menu');
      syncCardLinkLabel(cardComponent);
      expect(linkComponent.getAttributes()['aria-label']).toBe('Read more: Spring menu');
    });

    test('testimonial ratings render stars and the quote has no typed quotation marks', () => {
      const testimonialComponent = appendToPage({ type: 'db-testimonial' });
      expect(readComponentPlainText(findDescendantByField(testimonialComponent, 'quote'))).not.toContain('“');
      testimonialComponent.addAttributes({ 'data-db-rating': '4', 'data-db-source': 'via Google' });
      const ratingComponent = findDescendantByAttribute(testimonialComponent, 'data-db-testimonial-rating');
      expect(ratingComponent.getAttributes()['aria-label']).toBe('4 out of 5 stars');
      expect(ratingComponent.toHTML().split('data-db-star="filled"').length - 1).toBe(4);
      const sourceComponent = findDescendantByAttribute(testimonialComponent, 'data-db-testimonial-source');
      expect(readComponentPlainText(sourceComponent)).toBe('via Google');
    });

    test('feature icons are real icon components and logos can link out', () => {
      const featuresComponent = appendToPage({ type: 'db-features' });
      expect(findByType(featuresComponent, 'db-icon').length).toBe(3);
      const logoCloud = appendToPage({ type: 'db-logo-cloud' });
      const logoLink = findDescendantByAttribute(logoCloud, 'data-db-logo-link');
      expect(logoLink.getAttributes().href).toBeUndefined();
      logoLink.addAttributes({ href: 'https://partner.example' });
      expect(logoLink.getAttributes().href).toBe('https://partner.example');
      logoLink.addAttributes({ href: '' });
      expect(logoLink.getAttributes().href).toBeUndefined();
    });
  });
});
