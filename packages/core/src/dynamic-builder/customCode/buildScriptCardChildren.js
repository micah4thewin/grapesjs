import buildCodeCardChildren from './buildCodeCardChildren.js';
import getCodePreviewLine from './getCodePreviewLine.js';
import getInertChildFlags from './getInertChildFlags.js';

const buildBlockedNote = () => ({
  tagName: 'span',
  name: 'Code card warning',
  classes: ['db-code-card-note', 'db-code-card-blocked'],
  ...getInertChildFlags(),
  components: [
    { type: 'textnode', content: 'Will not ship: script tags are off. ' },
    {
      tagName: 'a',
      name: 'Turn on scripts link',
      classes: ['db-code-card-link'],
      attributes: { href: '#', 'data-db-open-custom-code': 'true' },
      components: 'Turn them on in Custom code',
      ...getInertChildFlags(),
    },
  ],
});

const buildScriptCardChildren = (scriptCode, allowScripts) => {
  const cardChildren = buildCodeCardChildren({
    iconName: 'code',
    titleText: 'Custom script',
    previewText: getCodePreviewLine(scriptCode, 'No script code yet'),
    noteText: allowScripts
      ? 'Runs on the published site. Inert while editing.'
      : 'Inert while editing. Runs on the published site once script tags are allowed.',
  });
  if (!allowScripts) cardChildren[1].components.push(buildBlockedNote());
  return cardChildren;
};

export default buildScriptCardChildren;
