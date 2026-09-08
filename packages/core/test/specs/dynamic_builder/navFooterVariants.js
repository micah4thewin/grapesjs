import grapesjs from '../../../src';
import { fixJsDom, fixJsDomIframe } from '../../common';
import buildFooterMarketingCss from '../../../src/dynamic-builder/marketingComponents/buildFooterMarketingCss';
import buildFooterTypeDefinition from '../../../src/dynamic-builder/marketingComponents/buildFooterTypeDefinition';
import buildNavbarStyleCss from '../../../src/dynamic-builder/interactiveComponents/buildNavbarStyleCss';
import buildNavbarTraitDefinitions from '../../../src/dynamic-builder/interactiveComponents/buildNavbarTraitDefinitions';
import cloneBlockContent from '../../../src/dynamic-builder/blocks/cloneBlockContent';
import getBlockHintRecords from '../../../src/dynamic-builder/blocks/getBlockHintRecords';

const listAttributeValues = (cssText, attributeName) => {
  const valuePattern = new RegExp('\\[' + attributeName + '="([a-z-]+)"\\]', 'g');
  const foundValues = [];
  let matchRecord = valuePattern.exec(cssText);
  while (matchRecord) {
    foundValues.indexOf(matchRecord[1]) < 0 && foundValues.push(matchRecord[1]);
    matchRecord = valuePattern.exec(cssText);
  }
  return foundValues.sort();
};

const readTraitOptionIds = (traitDefinitions, traitName) =>
  traitDefinitions
    .find((traitDefinition) => traitDefinition.name === traitName)
    .options.map((optionRecord) => optionRecord.id)
    .sort();

describe('Dynamic builder navigation and footer variants', () => {
  let editor;

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

  const dropBlock = (blockId) => editor.getWrapper().append(cloneBlockContent(editor.BlockManager.get(blockId)))[0];

  test('every navbar style the CSS draws can be picked from the Style setting', () => {
    const styleIds = readTraitOptionIds(buildNavbarTraitDefinitions(), 'data-db-style').filter(
      (styleId) => styleId !== 'default',
    );
    expect(listAttributeValues(buildNavbarStyleCss(), 'data-db-style')).toEqual(styleIds);
    expect(styleIds.length).toBeGreaterThanOrEqual(6);
  });

  test('every footer layout the CSS draws can be picked from the Layout setting', () => {
    const layoutIds = readTraitOptionIds(buildFooterTypeDefinition().model.defaults.traits, 'data-db-footer').filter(
      (layoutId) => layoutId !== 'columns',
    );
    expect(listAttributeValues(buildFooterMarketingCss(), 'data-db-footer')).toEqual(layoutIds);
  });

  test('navbar variant blocks stay navbars and keep their identifying attributes', () => {
    const hintRecords = getBlockHintRecords();
    ['db-navbar', 'db-navbar-centered', 'db-navbar-split', 'db-navbar-minimal'].forEach((blockId) => {
      const navbarComponent = dropBlock(blockId);
      const attributeRecord = navbarComponent.getAttributes();
      expect(navbarComponent.get('type')).toBe('db-navbar');
      expect(attributeRecord['data-db-type']).toBe('navbar');
      expect(attributeRecord['data-db-navbar']).toBe('true');
      expect(hintRecords[blockId].split(' ').length).toBeLessThanOrEqual(2);
      navbarComponent.remove();
    });
    const centeredNavbar = dropBlock('db-navbar-centered');
    expect(centeredNavbar.getAttributes()['data-db-layout']).toBe('center');
    expect(centeredNavbar.getAttributes()['data-db-style']).toBe('underline');
    const minimalNavbar = dropBlock('db-navbar-minimal');
    expect(minimalNavbar.getAttributes()['data-db-cta']).toBe('false');
    expect(minimalNavbar.find('.db-navbar-brand-text').length).toBe(1);
  });

  test('footer layouts add the signup column only when asked and take it away again', () => {
    const footerComponent = dropBlock('db-footer');
    expect(footerComponent.getAttributes()['data-db-type']).toBe('footer');
    expect(footerComponent.find('.db-footer-newsletter').length).toBe(0);
    footerComponent.addAttributes({ 'data-db-footer': 'newsletter' });
    expect(footerComponent.find('.db-footer-newsletter').length).toBe(1);
    expect(
      footerComponent.find('.db-footer-newsletter [data-gjs-type=db-form], .db-footer-newsletter form').length,
    ).toBe(1);
    footerComponent.addAttributes({ 'data-db-footer': 'simple' });
    expect(footerComponent.find('.db-footer-newsletter').length).toBe(0);
    const newsletterFooter = dropBlock('db-footer-newsletter');
    expect(newsletterFooter.get('type')).toBe('db-footer');
    expect(newsletterFooter.find('.db-footer-newsletter').length).toBe(1);
    expect(newsletterFooter.find('.db-footer-newsletter .db-footer-heading')[0].getInnerHTML()).toContain('loop');
  });

  test('the footer renders real social icons instead of object placeholders', () => {
    const footerComponent = dropBlock('db-footer');
    const footerHtml = footerComponent.toHTML();
    expect(footerHtml).not.toContain('[object Object]');
    expect(footerComponent.find('.db-social-link').length).toBe(4);
    expect(footerHtml).toContain('data-db-network="instagram"');
  });

  test('every block hint is two words or fewer', () => {
    const longHints = Object.entries(getBlockHintRecords()).filter(
      ([, hintText]) => hintText.trim().split(/\s+/).length > 2,
    );
    expect(longHints).toEqual([]);
  });
});
