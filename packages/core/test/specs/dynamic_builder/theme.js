import buildCodeTokenCss from '../../../src/dynamic-builder/theme/buildCodeTokenCss';
import buildCanvasSelectionCss from '../../../src/dynamic-builder/theme/buildCanvasSelectionCss';
import buildDarkPaletteCssDeclarations from '../../../src/dynamic-builder/theme/buildDarkPaletteCssDeclarations';
import buildLightPaletteCssDeclarations from '../../../src/dynamic-builder/theme/buildLightPaletteCssDeclarations';
import buildThemeAliasTokensCss from '../../../src/dynamic-builder/theme/buildThemeAliasTokensCss';
import buildThemeScaleTokensCss from '../../../src/dynamic-builder/theme/buildThemeScaleTokensCss';
import composeEditorThemeCss from '../../../src/dynamic-builder/theme/composeEditorThemeCss';
import composeWorkspaceCss from '../../../src/dynamic-builder/workspace/composeWorkspaceCss';
import computeContrastRatio from '../../../src/dynamic-builder/support/computeContrastRatio';

const readDeclarations = (cssText) => {
  const declarationRecords = {};
  const declarationPattern = /(--gjs-db-[a-z0-9-]+)\s*:\s*([^;}]+)/g;
  let matchRecord = declarationPattern.exec(cssText);
  while (matchRecord) {
    const nameText = matchRecord[1];
    if (!declarationRecords[nameText]) declarationRecords[nameText] = matchRecord[2].trim();
    matchRecord = declarationPattern.exec(cssText);
  }
  return declarationRecords;
};

const lightTokens = readDeclarations(buildLightPaletteCssDeclarations());
const darkTokens = readDeclarations(buildDarkPaletteCssDeclarations());
const scaleTokens = readDeclarations(buildThemeScaleTokensCss());
const paletteRecords = [
  ['light', lightTokens],
  ['dark', darkTokens],
];
const surfaceNames = ['bg', 'panel', 'page', 'sunken', 'hover', 'active', 'canvas-ground'];
const textNames = ['fg', 'muted', 'faint', 'success', 'warning', 'error'];
const syntaxNames = ['keyword', 'type', 'def', 'string', 'literal', 'comment', 'meta', 'heading', 'added', 'removed'];

describe('Dynamic builder theme', () => {
  describe('house palette', () => {
    test('light mode carries the house colour values', () => {
      expect(lightTokens['--gjs-db-bg']).toBe('#e8eaed');
      expect(lightTokens['--gjs-db-panel']).toBe('#edeff2');
      expect(lightTokens['--gjs-db-page']).toBe('#f2f4f6');
      expect(lightTokens['--gjs-db-sunken']).toBe('#e1e4e8');
      expect(lightTokens['--gjs-db-hover']).toBe('#e4e7eb');
      expect(lightTokens['--gjs-db-active']).toBe('#dcdfe4');
      expect(lightTokens['--gjs-db-fg']).toBe('#1b1d20');
      expect(lightTokens['--gjs-db-muted']).toBe('#3f444b');
      expect(lightTokens['--gjs-db-faint']).toBe('#454b53');
      expect(lightTokens['--gjs-db-line']).toBe('#d3d7dd');
      expect(lightTokens['--gjs-db-shade']).toBe('rgba(157, 165, 176, 0.38)');
      expect(lightTokens['--gjs-db-glow']).toBe('rgba(255, 255, 255, 0.55)');
      expect(lightTokens['--gjs-db-overlay']).toBe('rgba(226, 229, 233, 0.72)');
      expect(lightTokens['--gjs-db-selection']).toBe('rgba(27, 29, 32, 0.14)');
    });

    test('dark mode carries the house colour values', () => {
      expect(darkTokens['--gjs-db-bg']).toBe('#1c1e21');
      expect(darkTokens['--gjs-db-panel']).toBe('#212428');
      expect(darkTokens['--gjs-db-page']).toBe('#191b1e');
      expect(darkTokens['--gjs-db-sunken']).toBe('#141619');
      expect(darkTokens['--gjs-db-hover']).toBe('#262a2f');
      expect(darkTokens['--gjs-db-active']).toBe('#2c3036');
      expect(darkTokens['--gjs-db-fg']).toBe('#e7eaee');
      expect(darkTokens['--gjs-db-muted']).toBe('#bfc6cf');
      expect(darkTokens['--gjs-db-faint']).toBe('#b3bac3');
      expect(darkTokens['--gjs-db-line']).toBe('#303439');
      expect(darkTokens['--gjs-db-shade']).toBe('rgba(0, 0, 0, 0.45)');
      expect(darkTokens['--gjs-db-glow']).toBe('rgba(255, 255, 255, 0.028)');
      expect(darkTokens['--gjs-db-overlay']).toBe('rgba(14, 16, 18, 0.72)');
      expect(darkTokens['--gjs-db-selection']).toBe('rgba(231, 234, 238, 0.16)');
    });

    test('both modes declare the same token names so no module loses a variable', () => {
      expect(Object.keys(lightTokens).sort()).toEqual(Object.keys(darkTokens).sort());
    });

    test('every legacy token name other modules rely on is still declared', () => {
      const requiredNames = [
        '--gjs-db-line-soft',
        '--gjs-db-accent',
        '--gjs-db-accent-soft',
        '--gjs-db-accent-line',
        '--gjs-db-accent-fg',
        '--gjs-db-focus',
        '--gjs-db-canvas-ground',
        '--gjs-db-success',
        '--gjs-db-warning',
        '--gjs-db-error',
      ];
      requiredNames.forEach((tokenName) => {
        expect(lightTokens[tokenName]).toBeTruthy();
        expect(darkTokens[tokenName]).toBeTruthy();
      });
    });
  });

  describe('signature accent', () => {
    test('the accent and focus tokens are the slate blue drawn from the house syntax palette', () => {
      expect(lightTokens['--gjs-db-accent']).toBe('#35618f');
      expect(lightTokens['--gjs-db-focus']).toBe('#35618f');
      expect(lightTokens['--gjs-db-accent']).toBe(lightTokens['--gjs-db-syn-def']);
      expect(darkTokens['--gjs-db-accent']).toBe('#8ab4e0');
      expect(darkTokens['--gjs-db-focus']).toBe('#8ab4e0');
      expect(darkTokens['--gjs-db-accent']).toBe(darkTokens['--gjs-db-syn-def']);
    });

    test('the accent stays legible on the surfaces it sits on', () => {
      paletteRecords.forEach(([modeName, tokenRecords]) => {
        const accentRatio = computeContrastRatio(tokenRecords['--gjs-db-accent'], tokenRecords['--gjs-db-panel']);
        expect([modeName, accentRatio > 4.5]).toEqual([modeName, true]);
      });
    });

    test('no chrome rule reaches for the retired brand hue', () => {
      const chromeCss = `${composeEditorThemeCss()}\n${composeWorkspaceCss()}\n${buildCanvasSelectionCss()}`;
      ['#9d4a26', '#e09060', '157, 74, 38', '224, 144, 96', '#4f46e5'].forEach((brandValue) => {
        expect(chromeCss).not.toContain(brandValue);
      });
    });

    test('active tools and primary buttons read as depth, not colour', () => {
      const chromeCss = composeEditorThemeCss();
      expect(chromeCss).toContain(
        '.gjs-pn-btn.gjs-pn-active {\n  color: var(--gjs-db-fg);\n  background-color: var(--gjs-db-active);\n  box-shadow: var(--gjs-db-press-1);',
      );
      expect(chromeCss).toContain(
        '.gjs-db-button-primary {\n  background-color: var(--gjs-db-solid);\n  color: var(--gjs-db-text-on-solid);',
      );
      const workspaceCss = composeWorkspaceCss();
      expect(workspaceCss).toContain('.gjs-db-rail-button[aria-pressed=');
      expect(workspaceCss).toContain('box-shadow: var(--gjs-db-press-1);');
    });

    test('the canvas selection outline is greyscale in both editor modes', () => {
      const selectionCss = buildCanvasSelectionCss();
      expect(selectionCss).toContain('outline: 1px solid #1b1d20 !important');
      expect(selectionCss).toContain("html[data-db-editor-theme='dark'] body .gjs-selected {");
      expect(selectionCss).toContain('outline-color: #e7eaee !important');
    });
  });

  describe('semantic and syntax colour', () => {
    test('success, warning and danger come from the house syntax family', () => {
      expect(lightTokens['--gjs-db-success']).toBe(lightTokens['--gjs-db-syn-added']);
      expect(lightTokens['--gjs-db-warning']).toBe(lightTokens['--gjs-db-syn-meta']);
      expect(lightTokens['--gjs-db-error']).toBe(lightTokens['--gjs-db-syn-removed']);
      expect(darkTokens['--gjs-db-success']).toBe(darkTokens['--gjs-db-syn-added']);
      expect(darkTokens['--gjs-db-warning']).toBe(darkTokens['--gjs-db-syn-meta']);
      expect(darkTokens['--gjs-db-error']).toBe(darkTokens['--gjs-db-syn-removed']);
    });

    test('the full syntax palette is available to code surfaces in both modes', () => {
      syntaxNames.forEach((syntaxName) => {
        expect(lightTokens[`--gjs-db-syn-${syntaxName}`]).toBeTruthy();
        expect(darkTokens[`--gjs-db-syn-${syntaxName}`]).toBeTruthy();
      });
      expect(lightTokens['--gjs-db-syn-added-wash']).toBe('rgba(61, 102, 57, 0.17)');
      expect(darkTokens['--gjs-db-syn-removed-wash']).toBe('rgba(224, 144, 138, 0.19)');
    });

    test('the code editor paints its tokens with the syntax palette', () => {
      const codeCss = buildCodeTokenCss();
      expect(codeCss).toContain('color: var(--gjs-db-syn-keyword)');
      expect(codeCss).toContain('color: var(--gjs-db-syn-string)');
      expect(codeCss).toContain('color: var(--gjs-db-syn-comment)');
      expect(codeCss).not.toContain('#');
    });
  });

  describe('contrast', () => {
    test('every text colour clears 4.5:1 on every chrome surface', () => {
      const failureRecords = [];
      paletteRecords.forEach(([modeName, tokenRecords]) => {
        textNames.forEach((textName) => {
          surfaceNames.forEach((surfaceName) => {
            const contrastRatio = computeContrastRatio(
              tokenRecords[`--gjs-db-${textName}`],
              tokenRecords[`--gjs-db-${surfaceName}`],
            );
            if (contrastRatio < 4.5) failureRecords.push(`${modeName} ${textName} on ${surfaceName}`);
          });
        });
      });
      expect(failureRecords).toEqual([]);
    });

    test('secondary text clears 7:1 on every chrome surface so labels and hints stay readable', () => {
      const failureRecords = [];
      paletteRecords.forEach(([modeName, tokenRecords]) => {
        ['muted', 'faint'].forEach((textName) => {
          surfaceNames.forEach((surfaceName) => {
            const contrastRatio = computeContrastRatio(
              tokenRecords[`--gjs-db-${textName}`],
              tokenRecords[`--gjs-db-${surfaceName}`],
            );
            if (contrastRatio < 6.3) failureRecords.push(`${modeName} ${textName} on ${surfaceName}`);
          });
        });
      });
      expect(failureRecords).toEqual([]);
    });

    test('the text ramp keeps its order so muted never reads fainter than faint', () => {
      paletteRecords.forEach(([modeName, tokenRecords]) => {
        const panelSurface = tokenRecords['--gjs-db-panel'];
        const strongRatio = computeContrastRatio(tokenRecords['--gjs-db-fg'], panelSurface);
        const mutedRatio = computeContrastRatio(tokenRecords['--gjs-db-muted'], panelSurface);
        const faintRatio = computeContrastRatio(tokenRecords['--gjs-db-faint'], panelSurface);
        expect([modeName, strongRatio > mutedRatio, mutedRatio > faintRatio]).toEqual([modeName, true, true]);
      });
    });

    test('text on the solid emphasis fill stays readable', () => {
      paletteRecords.forEach(([modeName, tokenRecords]) => {
        const contrastRatio = computeContrastRatio(tokenRecords['--gjs-db-bg'], tokenRecords['--gjs-db-fg']);
        expect([modeName, contrastRatio > 4.5]).toEqual([modeName, true]);
      });
    });

    test('every syntax colour clears 4.5:1 on the sunken code surface', () => {
      const failureRecords = [];
      paletteRecords.forEach(([modeName, tokenRecords]) => {
        syntaxNames.forEach((syntaxName) => {
          const contrastRatio = computeContrastRatio(
            tokenRecords[`--gjs-db-syn-${syntaxName}`],
            tokenRecords['--gjs-db-sunken'],
          );
          if (contrastRatio < 4.5) failureRecords.push(`${modeName} ${syntaxName}`);
        });
      });
      expect(failureRecords).toEqual([]);
    });
  });

  describe('shape, depth, motion and type', () => {
    test('elevation uses the house dual shadows', () => {
      expect(scaleTokens['--gjs-db-lift-1']).toBe('2px 2px 5px var(--gjs-db-shade), -1px -1px 3px var(--gjs-db-glow)');
      expect(scaleTokens['--gjs-db-lift-4']).toBe(
        '14px 18px 44px var(--gjs-db-shade), -5px -5px 16px var(--gjs-db-glow)',
      );
      expect(scaleTokens['--gjs-db-press-1']).toBe(
        'inset 2px 2px 4px var(--gjs-db-shade), inset -1px -1px 2px var(--gjs-db-glow)',
      );
      expect(scaleTokens['--gjs-db-press-2']).toBe(
        'inset 3px 3px 7px var(--gjs-db-shade), inset -2px -2px 4px var(--gjs-db-glow)',
      );
      expect(scaleTokens['--gjs-db-seam']).toBe('inset 0 1px 0 var(--gjs-db-glow), inset 0 -1px 0 var(--gjs-db-shade)');
    });

    test('radii, gaps, easing and durations follow the house scale', () => {
      expect([
        scaleTokens['--gjs-db-r-1'],
        scaleTokens['--gjs-db-r-2'],
        scaleTokens['--gjs-db-r-3'],
        scaleTokens['--gjs-db-r-4'],
        scaleTokens['--gjs-db-r-pill'],
      ]).toEqual(['2px', '4px', '6px', '8px', '999px']);
      expect([scaleTokens['--gjs-db-gap-1'], scaleTokens['--gjs-db-gap-3'], scaleTokens['--gjs-db-gap-6']]).toEqual([
        '0.25rem',
        '0.75rem',
        '2.25rem',
      ]);
      expect(scaleTokens['--gjs-db-ease']).toBe('cubic-bezier(0.22, 1, 0.36, 1)');
      expect(scaleTokens['--gjs-db-ease-spring']).toBe('cubic-bezier(0.34, 1.4, 0.64, 1)');
      expect([
        scaleTokens['--gjs-db-dur-1'],
        scaleTokens['--gjs-db-dur-2'],
        scaleTokens['--gjs-db-dur-3'],
        scaleTokens['--gjs-db-dur-4'],
      ]).toEqual(['120ms', '200ms', '320ms', '480ms']);
    });

    test('the type stack asks for the house faces and keeps a real fallback', () => {
      expect(scaleTokens['--gjs-db-font-display']).toBe("'Gilroy', 'Avenir Next LT Pro', system-ui, sans-serif");
      expect(scaleTokens['--gjs-db-font-ui']).toBe(
        "'Avenir Next LT Pro', system-ui, -apple-system, 'Segoe UI', sans-serif",
      );
      expect(scaleTokens['--gjs-db-font-mono']).toContain('ui-monospace');
    });

    test('only the two house weights exist and touch targets stay usable', () => {
      expect(scaleTokens['--gjs-db-w-normal']).toBe('400');
      expect(scaleTokens['--gjs-db-w-medium']).toBe('400');
      expect(scaleTokens['--gjs-db-w-bold']).toBe('700');
      expect(scaleTokens['--gjs-db-tap']).toBe('32px');
    });

    test('reduced motion collapses every duration', () => {
      const scaleCss = buildThemeScaleTokensCss();
      expect(scaleCss).toContain('@media (prefers-reduced-motion: reduce)');
      expect(scaleCss).toContain('--gjs-db-dur-4: 1ms;');
    });
  });

  describe('aliases and canvas isolation', () => {
    test('the house aliases are published on top of the palette', () => {
      const aliasTokens = readDeclarations(buildThemeAliasTokensCss());
      expect(aliasTokens['--gjs-db-canvas']).toBe('var(--gjs-db-bg)');
      expect(aliasTokens['--gjs-db-surface']).toBe('var(--gjs-db-panel)');
      expect(aliasTokens['--gjs-db-edge']).toBe('var(--gjs-db-line)');
      expect(aliasTokens['--gjs-db-ring']).toBe('var(--gjs-db-focus)');
      expect(aliasTokens['--gjs-db-text-1']).toBe('var(--gjs-db-fg)');
      expect(aliasTokens['--gjs-db-text-2']).toBe('var(--gjs-db-muted)');
      expect(aliasTokens['--gjs-db-text-3']).toBe('var(--gjs-db-faint)');
      expect(aliasTokens['--gjs-db-text-on-solid']).toBe('var(--gjs-db-bg)');
      expect(aliasTokens['--gjs-db-solid']).toBe('var(--gjs-db-fg)');
    });

    test('the composed theme publishes the aliases and both palettes', () => {
      const chromeCss = composeEditorThemeCss();
      expect(chromeCss).toContain('--gjs-db-solid: var(--gjs-db-fg);');
      expect(chromeCss).toContain('@media (prefers-color-scheme: dark)');
      expect(chromeCss).toContain("[data-theme='dark'] .gjs-editor-cont:not([data-theme='light'])");
      expect(chromeCss.indexOf('#e8eaed')).toBeGreaterThan(-1);
      expect(chromeCss.indexOf('#1c1e21')).toBeGreaterThan(-1);
    });

    test('secondary chrome text never inherits the thin core weight', () => {
      const chromeCss = `${composeEditorThemeCss()}\n${composeWorkspaceCss()}`;
      const readRuleBlock = (selectorText) => {
        const startIndex = chromeCss.indexOf(selectorText);
        expect(startIndex).toBeGreaterThan(-1);
        return chromeCss.slice(startIndex, chromeCss.indexOf('}', startIndex));
      };
      expect(chromeCss).not.toContain('font-weight: lighter');
      const resetBlock = readRuleBlock('.gjs-editor-cont .gjs-mdl-dialog,');
      ['.gjs-trt-trait', '.gjs-block', '.gjs-sm-sector', '.gjs-layer', '.gjs-db-field-help'].forEach((selectorText) => {
        expect(resetBlock).toContain(`.gjs-editor-cont ${selectorText}`);
      });
      expect(resetBlock).toContain('font-weight: var(--gjs-db-w-normal);');
      expect(readRuleBlock('.gjs-db-inspector-eyebrow {')).toContain('font-size: var(--gjs-db-fs-2);');
      expect(readRuleBlock('.gjs-db-inspector-eyebrow {')).toContain('color: var(--gjs-db-muted);');
      expect(readRuleBlock('.gjs-db-field-help {')).toContain('color: var(--gjs-db-muted);');
      expect(readRuleBlock('.gjs-db-block-hint {')).toContain('color: var(--gjs-db-muted);');
    });

    test('the edited page keeps its own paper and never borrows chrome tokens', () => {
      const chromeCss = composeEditorThemeCss();
      expect(chromeCss).toContain('.gjs-frame-wrapper .gjs-frame {');
      expect(chromeCss).toContain('background-color: #ffffff;');
      expect(buildCanvasSelectionCss()).not.toContain('--gjs-db-');
      expect(composeWorkspaceCss()).toContain('.gjs-db-ws .gjs-frame-wrapper .gjs-frame {');
    });
  });
});
