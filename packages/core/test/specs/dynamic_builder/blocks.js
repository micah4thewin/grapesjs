import grapesjs from '../../../src';
import { fixJsDom, fixJsDomIframe } from '../../common';
import applyBlockPreviews from '../../../src/dynamic-builder/blocks/applyBlockPreviews';
import applyTemplateToPage from '../../../src/dynamic-builder/blocks/applyTemplateToPage';
import buildDataBlocks from '../../../src/dynamic-builder/blocks/buildDataBlocks';
import buildDefaultDataSources from '../../../src/dynamic-builder/dataBinding/buildDefaultDataSources';
import buildTeamMemberSampleRecord from '../../../src/dynamic-builder/blocks/buildTeamMemberSampleRecord';
import buildTestimonialSampleRecord from '../../../src/dynamic-builder/blocks/buildTestimonialSampleRecord';
import cloneBlockContent from '../../../src/dynamic-builder/blocks/cloneBlockContent';
import getBlockHintRecords from '../../../src/dynamic-builder/blocks/getBlockHintRecords';
import getBlockSearchKeywords from '../../../src/dynamic-builder/blocks/getBlockSearchKeywords';
import getPageLevelComponentTypes from '../../../src/dynamic-builder/support/getPageLevelComponentTypes';
import insertBlockContent from '../../../src/dynamic-builder/blocks/insertBlockContent';
import isTemplateBlock from '../../../src/dynamic-builder/blocks/isTemplateBlock';
import listTemplateContentNames from '../../../src/dynamic-builder/blocks/listTemplateContentNames';
import openTemplateChooserModal from '../../../src/dynamic-builder/blocks/openTemplateChooserModal';
import resolveDedicatedPreviewMarkup from '../../../src/dynamic-builder/blockPreviews/resolveDedicatedPreviewMarkup';
import resolveUniquePageName from '../../../src/dynamic-builder/blocks/resolveUniquePageName';
import wrapRootLevelComponents from '../../../src/dynamic-builder/blocks/wrapRootLevelComponents';

const readBlockId = (blockModel) => String(blockModel.get('id') || blockModel.id);

const readCategoryId = (blockModel) => {
  const categoryValue = blockModel.get('category');
  return categoryValue && categoryValue.id ? String(categoryValue.id) : String(categoryValue || '');
};

const countMatches = (haystack, needle) => haystack.split(needle).length - 1;

describe('Dynamic builder block library', () => {
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

  const listSuiteBlocks = () =>
    editor.BlockManager.getAll().filter((blockModel) => {
      const blockId = readBlockId(blockModel);
      return blockId.indexOf('db-') === 0 && blockId.indexOf('db-symbol-block-') !== 0;
    });

  const listTemplateBlocks = () => editor.BlockManager.getAll().filter((blockModel) => isTemplateBlock(blockModel));

  const renderTemplateHtml = (blockModel) => {
    editor.getWrapper().components(cloneBlockContent(blockModel));
    return editor.getWrapper().toHTML();
  };

  test('data blocks only bind data sources that ship with the builder', () => {
    const dataSources = buildDefaultDataSources();
    buildDataBlocks()
      .map(
        (blockDefinition) => blockDefinition.content.attributes && blockDefinition.content.attributes['data-db-source'],
      )
      .filter(Boolean)
      .forEach((sourceKey) => expect(Array.isArray(dataSources[sourceKey])).toBe(true));
  });

  test('every suite block has a plain-English hint and a dedicated preview', () => {
    const hintRecords = getBlockHintRecords();
    const missingHints = listSuiteBlocks()
      .map(readBlockId)
      .filter((blockId) => !hintRecords[blockId]);
    const missingPreviews = listSuiteBlocks()
      .map(readBlockId)
      .filter((blockId) => !resolveDedicatedPreviewMarkup(blockId));
    expect(missingHints).toEqual([]);
    expect(missingPreviews).toEqual([]);
  });

  test('hint and keyword records never point at ids that are not blocks', () => {
    const blockIds = listSuiteBlocks().map(readBlockId);
    const staleHintKeys = Object.keys(getBlockHintRecords()).filter((hintKey) => blockIds.indexOf(hintKey) < 0);
    const staleKeywordKeys = Object.keys(getBlockSearchKeywords()).filter(
      (keywordKey) => blockIds.indexOf(keywordKey) < 0,
    );
    expect(staleHintKeys).toEqual([]);
    expect(staleKeywordKeys).toEqual([]);
  });

  test('block cards are keyboard reachable and describe themselves', () => {
    const imageBlock = editor.BlockManager.get('db-image');
    const cardAttributes = imageBlock.get('attributes');
    expect(cardAttributes.tabindex).toBe('0');
    expect(cardAttributes.role).toBe('button');
    expect(cardAttributes['aria-label']).toContain('A single picture');
    expect(cardAttributes['data-db-block-id']).toBe('db-image');
    const renderedMarkup = imageBlock.get('render')({ model: imageBlock, className: 'gjs-block' });
    expect(renderedMarkup).toContain('gjs-db-block-hint');
    expect(renderedMarkup).toContain('photo');
  });

  test('blocks in the sections category drop as page-level pieces', () => {
    const pageLevelTypes = getPageLevelComponentTypes();
    const looseSectionBlocks = listSuiteBlocks()
      .filter((blockModel) => readCategoryId(blockModel) === 'sections')
      .filter((blockModel) => pageLevelTypes.indexOf(String(blockModel.get('content').type || '')) < 0)
      .map(readBlockId);
    expect(looseSectionBlocks).toEqual([]);
  });

  test('page templates only place page-level pieces at the root', () => {
    const pageLevelTypes = getPageLevelComponentTypes();
    listTemplateBlocks().forEach((blockModel) => {
      const looseRecords = blockModel
        .get('content')
        .filter((componentRecord) => pageLevelTypes.indexOf(String(componentRecord.type || '')) < 0);
      expect({ template: readBlockId(blockModel), loose: looseRecords }).toEqual({
        template: readBlockId(blockModel),
        loose: [],
      });
    });
  });

  test('every page template renders exactly one H1', () => {
    listTemplateBlocks().forEach((blockModel) => {
      const renderedHtml = renderTemplateHtml(blockModel);
      expect({ template: readBlockId(blockModel), h1Count: countMatches(renderedHtml, '<h1') }).toEqual({
        template: readBlockId(blockModel),
        h1Count: 1,
      });
    });
  });

  test('the pricing template shows the pricing title only once', () => {
    const renderedHtml = renderTemplateHtml(editor.BlockManager.get('db-template-pricing'));
    expect(countMatches(renderedHtml, 'Simple, honest pricing')).toBe(1);
    expect(renderedHtml).toContain('Plans that grow with you');
  });

  test('the launch template counts down to a real date and uses the signup form', () => {
    const renderedHtml = renderTemplateHtml(editor.BlockManager.get('db-template-launch'));
    expect(renderedHtml).toMatch(/data-db-deadline-date="\d{4}-\d{2}-\d{2}"/);
    expect(renderedHtml).toContain('newsletter-signup');
    expect(renderedHtml).not.toContain('Free shipping');
  });

  test('template summaries name the pieces a page contains', () => {
    const partNames = listTemplateContentNames(editor.BlockManager.get('db-template-landing').get('content'));
    expect(partNames[0]).toBe('Navigation bar');
    expect(partNames).toContain('Hero');
    expect(partNames).toContain('Features');
    expect(partNames[partNames.length - 1]).toBe('Footer');
  });

  test('grids and templates vary their placeholder people and quotes', () => {
    const memberMarkup = [0, 1, 2].map((sampleIndex) => JSON.stringify(buildTeamMemberSampleRecord(sampleIndex)));
    expect(new Set(memberMarkup).size).toBe(3);
    const quoteMarkup = [0, 1, 2].map((sampleIndex) => JSON.stringify(buildTestimonialSampleRecord(sampleIndex)));
    expect(new Set(quoteMarkup).size).toBe(3);
    const teamGridContent = editor.BlockManager.get('db-team-grid').get('content');
    expect(teamGridContent.components[0].components[1].name).toBe('Team grid');
  });

  test('root-level drops of elements are wrapped in a section and container', () => {
    const [headingComponent] = editor.getWrapper().append({ type: 'db-heading' });
    const sectionComponent = wrapRootLevelComponents(editor, [headingComponent]);
    expect(sectionComponent.get('type')).toBe('db-section');
    const containerComponent = sectionComponent.components().at(0);
    expect(containerComponent.get('type')).toBe('db-container');
    expect(containerComponent.components().length).toBe(1);
    expect(headingComponent.parent()).toBe(containerComponent);
    const [navbarComponent] = editor.getWrapper().append({ type: 'db-navbar' });
    expect(wrapRootLevelComponents(editor, [navbarComponent])).toBeNull();
  });

  test('inserting a block from the keyboard lands inside the selected section', () => {
    const [sectionComponent] = editor.getWrapper().append({ type: 'db-section' });
    editor.select(sectionComponent);
    const addedComponents = insertBlockContent(editor, editor.BlockManager.get('db-text'));
    expect(addedComponents.length).toBe(1);
    expect(addedComponents[0].parent().get('type')).toBe('db-container');
    expect(editor.getSelected()).toBe(addedComponents[0]);
  });

  test('applying a template can replace the page or append while keeping the existing navbar', () => {
    editor.getWrapper().components([{ type: 'db-navbar' }, { type: 'db-section' }]);
    const aboutBlock = editor.BlockManager.get('db-template-about');
    applyTemplateToPage(editor, aboutBlock, 'append');
    const rootTypes = editor
      .getWrapper()
      .components()
      .map((rootComponent) => rootComponent.get('type'));
    expect(rootTypes.filter((typeName) => typeName === 'db-navbar').length).toBe(1);
    expect(rootTypes.filter((typeName) => typeName === 'db-footer').length).toBe(1);
    applyTemplateToPage(editor, aboutBlock, 'replace');
    expect(editor.getWrapper().components().length).toBe(aboutBlock.get('content').length);
  });

  test('the template chooser offers replace, new page and append actions', () => {
    editor.getWrapper().components([{ type: 'db-section' }]);
    const chooserElement = openTemplateChooserModal(editor, editor.BlockManager.get('db-template-landing'));
    const actionNames = Array.from(chooserElement.querySelectorAll('[data-db-template-action]')).map((actionButton) =>
      actionButton.getAttribute('data-db-template-action'),
    );
    expect(actionNames).toEqual(['replace', 'new-page', 'append']);
    expect(chooserElement.textContent).toContain('Includes: Navigation bar');
    expect(editor.Modal.isOpen()).toBe(true);
    chooserElement.querySelector('[data-db-template-action="replace"]').click();
    expect(editor.Modal.isOpen()).toBe(false);
    expect(editor.getWrapper().components().at(0).get('type')).toBe('db-navbar');
  });

  test('a page created from a template gets a unique suggested name', () => {
    editor.Pages.add({ name: 'Landing', component: [{ type: 'db-section' }] });
    expect(resolveUniquePageName(editor, 'Landing')).toBe('Landing 2');
    expect(resolveUniquePageName(editor, 'Portfolio')).toBe('Portfolio');
  });

  test('host-registered blocks keep their own thumbnails unless asked otherwise', () => {
    editor.BlockManager.add('host-box', {
      label: 'Host box',
      category: 'layout',
      media: '<svg data-host-media="true"></svg>',
      content: '<div>host</div>',
    });
    applyBlockPreviews(editor, {});
    expect(editor.BlockManager.get('host-box').get('media')).toContain('data-host-media');
    applyBlockPreviews(editor, { previewForeignBlocks: true });
    expect(editor.BlockManager.get('host-box').get('media')).toContain('gjs-db-block-preview');
  });

  test('composition blocks drop as typed components with their own settings', () => {
    const expectedTraits = {
      'db-figure': 'data-db-show-caption',
      'db-icon-row': 'data-db-align',
      'db-eyebrow-group': 'data-db-align',
    };
    Object.keys(expectedTraits).forEach((typeName) => {
      const [droppedComponent] = editor.getWrapper().append({ type: typeName });
      expect(droppedComponent.get('type')).toBe(typeName);
      const traitNames = droppedComponent.getTraits().map((traitModel) => traitModel.get('name'));
      expect(traitNames).toContain(expectedTraits[typeName]);
    });
    const [figureComponent] = editor.getWrapper().append({ type: 'db-figure' });
    const captionComponent = figureComponent.components().at(1);
    expect(captionComponent.get('tagName')).toBe('figcaption');
  });
});
