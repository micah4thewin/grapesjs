import buildAlertButtonFlowRecord from '../../../src/dynamic-builder/interactions/buildAlertButtonFlowRecord';
import buildDosDateTimeParts from '../../../src/dynamic-builder/exporter/buildDosDateTimeParts';
import buildZipArchiveBytes from '../../../src/dynamic-builder/exporter/buildZipArchiveBytes';
import computeContrastRatio from '../../../src/dynamic-builder/support/computeContrastRatio';
import computeCrc32Checksum from '../../../src/dynamic-builder/exporter/computeCrc32Checksum';
import countUnbalancedPairs from '../../../src/dynamic-builder/codeEditor/countUnbalancedPairs';
import deepMergeRecords from '../../../src/dynamic-builder/support/deepMergeRecords';
import describeFlowSummary from '../../../src/dynamic-builder/interactions/describeFlowSummary';
import enforceScriptOriginAllowlist from '../../../src/dynamic-builder/customCode/enforceScriptOriginAllowlist';
import escapeHtmlText from '../../../src/dynamic-builder/support/escapeHtmlText';
import evaluateConditionRecord from '../../../src/dynamic-builder/dataBinding/evaluateConditionRecord';
import hoistCssImportRules from '../../../src/dynamic-builder/exporter/hoistCssImportRules';
import isSafeAttributeValue from '../../../src/dynamic-builder/support/isSafeAttributeValue';
import joinCanonicalBaseWithSlug from '../../../src/dynamic-builder/seo/joinCanonicalBaseWithSlug';
import minifyCssText from '../../../src/dynamic-builder/exporter/minifyCssText';
import normalizeTwitterHandle from '../../../src/dynamic-builder/seo/normalizeTwitterHandle';
import parseColorToRgb from '../../../src/dynamic-builder/support/parseColorToRgb';
import parseFlowRecords from '../../../src/dynamic-builder/interactions/parseFlowRecords';
import parseOriginAllowlist from '../../../src/dynamic-builder/customCode/parseOriginAllowlist';
import replaceBindingTokensInText from '../../../src/dynamic-builder/dataBinding/replaceBindingTokensInText';
import resolveBindingPath from '../../../src/dynamic-builder/dataBinding/resolveBindingPath';
import sanitizeCssCode from '../../../src/dynamic-builder/customCode/sanitizeCssCode';
import sanitizeHtmlMarkup from '../../../src/dynamic-builder/support/sanitizeHtmlMarkup';
import sanitizeSvgMarkup from '../../../src/dynamic-builder/support/sanitizeSvgMarkup';
import sanitizeUrlValue from '../../../src/dynamic-builder/support/sanitizeUrlValue';
import serializeComponentDefinition from '../../../src/dynamic-builder/symbols/serializeComponentDefinition';
import serializeFlowRecords from '../../../src/dynamic-builder/interactions/serializeFlowRecords';
import serializeJsonForScript from '../../../src/dynamic-builder/support/serializeJsonForScript';
import setNestedSchemaValue from '../../../src/dynamic-builder/schema/setNestedSchemaValue';
import stripDefinitionElementIds from '../../../src/dynamic-builder/symbols/stripDefinitionElementIds';
import stripNestedSymbolChildren from '../../../src/dynamic-builder/symbols/stripNestedSymbolChildren';
import toSlugText from '../../../src/dynamic-builder/support/toSlugText';
import trimCanonicalBaseUrl from '../../../src/dynamic-builder/seo/trimCanonicalBaseUrl';
import validateCodeText from '../../../src/dynamic-builder/codeEditor/validateCodeText';

describe('Dynamic builder helpers', () => {
  describe('sanitizeHtmlMarkup', () => {
    test('strips script tags and event handler attributes', () => {
      const result = sanitizeHtmlMarkup('<div onclick="alert(1)"><script>alert(2)</script>ok</div>');
      expect(result).not.toContain('<script');
      expect(result).not.toContain('onclick');
      expect(result).toContain('ok');
    });

    test('removes iframe srcdoc and never grants allow-same-origin', () => {
      const result = sanitizeHtmlMarkup('<iframe srcdoc="<script>top.x=1</script>"></iframe>', {
        allowIframes: true,
      });
      expect(result).not.toContain('srcdoc');
      expect(result).not.toContain('allow-same-origin');
      expect(result).toContain('allow-scripts');
    });

    test('drops noscript so mutation XSS cannot survive re-parsing', () => {
      const payload = '<div><noscript><p title="</noscript><img src=x onerror=alert(1)>"></p></noscript></div>';
      const result = sanitizeHtmlMarkup(payload);
      expect(result).not.toContain('noscript');
      expect(result).not.toContain('onerror');
    });

    test('keeps head-only elements that lead the markup', () => {
      const result = sanitizeHtmlMarkup('<link rel="preconnect" href="https://fonts.gstatic.com"><div>hi</div>');
      expect(result).toContain('rel="preconnect"');
      expect(result).toContain('<div>hi</div>');
    });

    test('rejects data:text/html sources on iframes', () => {
      const result = sanitizeHtmlMarkup('<iframe src="data:text/html,<h1>x</h1>"></iframe>', { allowIframes: true });
      expect(result).not.toContain('data:text/html');
    });

    test('strips javascript: hrefs written with entities or control characters', () => {
      const result = sanitizeHtmlMarkup('<a href="java\tscript:alert(1)">x</a>');
      expect(result).not.toContain('script:alert');
    });
  });

  describe('sanitizeSvgMarkup', () => {
    test('removes forbidden elements regardless of case', () => {
      const result = sanitizeSvgMarkup(
        '<svg xmlns="http://www.w3.org/2000/svg"><SCRIPT>alert(1)</SCRIPT><circle r="2"/></svg>',
      );
      expect(result.toLowerCase()).not.toContain('script');
      expect(result).toContain('circle');
    });

    test('returns an empty string for markup that is not an svg root', () => {
      expect(sanitizeSvgMarkup('<div>nope</div>')).toBe('');
    });
  });

  describe('sanitizeUrlValue and isSafeAttributeValue', () => {
    test('keeps relative paths that merely start with javascript', () => {
      expect(sanitizeUrlValue('javascript-basics.html')).toBe('javascript-basics.html');
    });

    test('blocks the javascript scheme', () => {
      expect(sanitizeUrlValue('javascript:alert(1)')).toBe('');
    });

    test('blocks non-image data URIs but keeps data images', () => {
      expect(sanitizeUrlValue('data:text/html;base64,PHNjcmlwdD4=')).toBe('');
      expect(sanitizeUrlValue('data:image/png;base64,iVBORw0KGgo=')).toBe('data:image/png;base64,iVBORw0KGgo=');
      expect(isSafeAttributeValue('data:image/svg+xml,<svg/>')).toBe(true);
    });
  });

  describe('sanitizeCssCode', () => {
    test('neutralises expression and script urls', () => {
      const result = sanitizeCssCode('a { width: expression(alert(1)); background: url(javascript:alert(2)); }');
      expect(result).not.toContain('expression(');
      expect(result).not.toContain('javascript:');
    });
  });

  describe('deepMergeRecords', () => {
    test('ignores __proto__ keys from parsed JSON', () => {
      const merged = deepMergeRecords({ a: 1 }, JSON.parse('{"__proto__":{"polluted":1}}'));
      expect(merged.polluted).toBeUndefined();
      expect({}.polluted).toBeUndefined();
    });

    test('does not alias nested records from the base', () => {
      const baseRecord = { nested: { value: 1 } };
      const merged = deepMergeRecords(baseRecord, {});
      merged.nested.value = 2;
      expect(baseRecord.nested.value).toBe(1);
    });
  });

  describe('setNestedSchemaValue', () => {
    test('refuses prototype-polluting key paths', () => {
      const targetRecord = {};
      setNestedSchemaValue(targetRecord, '__proto__.polluted', 'yes');
      expect({}.polluted).toBeUndefined();
      expect(targetRecord.polluted).toBeUndefined();
    });

    test('writes ordinary dotted keys', () => {
      const targetRecord = {};
      setNestedSchemaValue(targetRecord, 'article.headline', 'Title');
      expect(targetRecord.article.headline).toBe('Title');
    });
  });

  describe('serializeJsonForScript', () => {
    test('escapes angle brackets so script data cannot break out', () => {
      const jsonText = serializeJsonForScript({ description: '<!--<script>' }, 0);
      expect(jsonText).not.toContain('<');
      expect(JSON.parse(jsonText).description).toBe('<!--<script>');
    });
  });

  describe('resolveBindingPath', () => {
    test('reads nested values and array indexes', () => {
      const registry = { team: [{ name: 'Avery' }] };
      expect(resolveBindingPath(registry, 'team.0.name')).toBe('Avery');
    });

    test('does not walk inherited properties', () => {
      expect(resolveBindingPath({ a: 1 }, 'constructor')).toBeUndefined();
      expect(resolveBindingPath({ a: 1 }, 'toString')).toBeUndefined();
    });
  });

  describe('replaceBindingTokensInText', () => {
    test('escapes resolved values', () => {
      const result = replaceBindingTokensInText({ x: '<img onerror=alert(1)>' }, 'v: {{db:x}}');
      expect(result).toContain('&lt;img');
      expect(result).not.toContain('<img');
    });
  });

  describe('evaluateConditionRecord', () => {
    test('handles truthy, equality and never', () => {
      const registry = { flag: true, name: 'Acme', empty: [] };
      expect(evaluateConditionRecord(registry, { kind: 'fieldTruthy', field: 'flag' })).toBe(true);
      expect(evaluateConditionRecord(registry, { kind: 'fieldTruthy', field: 'empty' })).toBe(false);
      expect(evaluateConditionRecord(registry, { kind: 'fieldEquals', field: 'name', value: 'Acme' })).toBe(true);
      expect(evaluateConditionRecord(registry, { kind: 'never' })).toBe(false);
    });
  });

  describe('toSlugText', () => {
    test('keeps letters from non-Latin scripts', () => {
      expect(toSlugText('О нас')).toBe('о-нас');
      expect(toSlugText('会社概要')).toBe('会社概要');
    });

    test('normalises Latin text and trims separators', () => {
      expect(toSlugText('  Café Menu!  ')).toBe('cafe-menu');
    });
  });

  describe('canonical URLs', () => {
    test('rejects a base URL without an absolute scheme', () => {
      expect(trimCanonicalBaseUrl('example.com')).toBe('');
      expect(trimCanonicalBaseUrl('https://www.example.com/')).toBe('https://www.example.com');
    });

    test('builds page URLs from a validated base', () => {
      expect(joinCanonicalBaseWithSlug('https://example.com', 'about')).toBe('https://example.com/about');
      expect(joinCanonicalBaseWithSlug('https://example.com', '')).toBe('https://example.com/');
      expect(joinCanonicalBaseWithSlug('example.com', 'about')).toBe('');
    });
  });

  describe('normalizeTwitterHandle', () => {
    test('extracts a handle from a profile URL and rejects junk', () => {
      expect(normalizeTwitterHandle('https://twitter.com/acme')).toBe('@acme');
      expect(normalizeTwitterHandle('acme')).toBe('@acme');
      expect(normalizeTwitterHandle('https://example.com/acme')).toBe('');
    });
  });

  describe('parseColorToRgb and computeContrastRatio', () => {
    test('parses modern colour syntax', () => {
      expect(parseColorToRgb('rgb(255 0 0 / 50%)')).toEqual({ red: 255, green: 0, blue: 0, alpha: 0.5 });
      expect(parseColorToRgb('hsl(210deg 40% 50%)')).toBeTruthy();
      expect(parseColorToRgb('#abcde')).toBeNull();
    });

    test('composites translucent backgrounds before measuring contrast', () => {
      const ratio = computeContrastRatio('rgb(255, 255, 255)', 'rgba(0, 0, 0, 0.2)');
      expect(ratio).toBeGreaterThan(1.2);
      expect(ratio).toBeLessThan(2.5);
    });
  });

  describe('minifyCssText', () => {
    test('preserves descendant pseudo selectors and string contents', () => {
      expect(minifyCssText('.db-nav :focus-visible { outline: 2px solid red; }')).toBe(
        '.db-nav :focus-visible{outline:2px solid red}',
      );
      expect(minifyCssText('.a::before { content: "a; b: c"; }')).toBe('.a::before{content:"a; b: c"}');
    });

    test('drops comments and trailing semicolons', () => {
      expect(minifyCssText('/* note */ a { color: red; }')).toBe('a{color:red}');
    });
  });

  describe('hoistCssImportRules', () => {
    test('moves @import rules above other rules', () => {
      const result = hoistCssImportRules('.a{color:red}\n@import url("https://fonts.example/x.css");\n.b{color:blue}');
      expect(result.indexOf('@import')).toBe(0);
      expect(result).toContain('.a{color:red}');
    });
  });

  describe('script origin allowlist', () => {
    test('parses origins and drops scripts outside them', () => {
      const allowlist = parseOriginAllowlist('https://cdn.example.com/\nnot a url\nhttps://cdn.example.com');
      expect(allowlist).toEqual(['https://cdn.example.com']);
      const result = enforceScriptOriginAllowlist(
        '<script src="https://cdn.example.com/a.js"></script><script src="https://evil.test/b.js"></script>',
        allowlist,
      );
      expect(result).toContain('cdn.example.com');
      expect(result).not.toContain('evil.test');
    });
  });

  describe('zip archive writer', () => {
    test('produces a valid local header, central directory and end record', () => {
      const archiveBytes = buildZipArchiveBytes(
        [{ fileName: 'a.txt', content: 'hello' }],
        new Date('2024-05-06T07:08:09Z'),
      );
      const archiveView = new DataView(archiveBytes.buffer);
      expect(archiveView.getUint32(0, true)).toBe(0x04034b50);
      const endOffset = archiveBytes.length - 22;
      expect(archiveView.getUint32(endOffset, true)).toBe(0x06054b50);
      expect(archiveView.getUint16(endOffset + 10, true)).toBe(1);
    });

    test('records a central directory size and offset that match the written bytes', () => {
      const archiveBytes = buildZipArchiveBytes(
        [
          { fileName: 'index.html', content: '<p>Ada Lovelace, 12 GBP</p>' },
          { fileName: 'styles.css', content: '.a{content:"em dash"}' },
          { fileName: 'robots.txt', content: 'User-agent: *' },
        ],
        new Date('2024-05-06T07:08:09Z'),
      );
      const archiveView = new DataView(archiveBytes.buffer);
      const endOffset = archiveBytes.length - 22;
      const centralSize = archiveView.getUint32(endOffset + 12, true);
      const centralOffset = archiveView.getUint32(endOffset + 16, true);
      expect(centralOffset + centralSize).toBe(endOffset);
      expect(archiveView.getUint32(centralOffset, true)).toBe(0x02014b50);
    });

    test('keeps offsets correct when entries hold multi byte characters', () => {
      const archiveBytes = buildZipArchiveBytes(
        [
          { fileName: 'page.html', content: 'price 25 \u20ac and \u201cquoted\u201d text \u2014 done' },
          { fileName: 'notes.txt', content: 'plain' },
        ],
        new Date('2024-05-06T07:08:09Z'),
      );
      const archiveView = new DataView(archiveBytes.buffer);
      const endOffset = archiveBytes.length - 22;
      const centralOffset = archiveView.getUint32(endOffset + 16, true);
      expect(archiveView.getUint32(endOffset + 12, true) + centralOffset).toBe(endOffset);
      expect(archiveView.getUint32(centralOffset, true)).toBe(0x02014b50);
      const firstLocalNameLength = archiveView.getUint16(26, true);
      const firstLocalDataLength = archiveView.getUint32(18, true);
      expect(archiveView.getUint32(30 + firstLocalNameLength + firstLocalDataLength, true)).toBe(0x04034b50);
    });

    test('stamps the supplied date instead of a fixed constant', () => {
      const firstParts = buildDosDateTimeParts(new Date('2024-05-06T07:08:10Z'));
      const secondParts = buildDosDateTimeParts(new Date('2030-01-02T03:04:05Z'));
      expect(firstParts.dosDate).not.toBe(secondParts.dosDate);
    });

    test('computes a known CRC32 value', () => {
      expect(computeCrc32Checksum(new TextEncoder().encode('hello'))).toBe(0x3610a686);
    });
  });

  describe('escapeHtmlText', () => {
    test('escapes every dangerous character', () => {
      expect(escapeHtmlText('<a href="x">&\'</a>')).toBe('&lt;a href=&quot;x&quot;&gt;&amp;&#39;&lt;/a&gt;');
    });
  });

  describe('parseFlowRecords', () => {
    test('drops malformed payloads instead of throwing', () => {
      expect(parseFlowRecords('not json')).toEqual([]);
      expect(parseFlowRecords('{"trigger":"click"}')).toEqual([]);
      expect(parseFlowRecords('')).toEqual([]);
    });

    test('keeps known actions and discards unknown ones', () => {
      const parsed = parseFlowRecords(
        JSON.stringify([
          { trigger: 'click', actions: [{ type: 'nope' }, { type: 'hide', options: { target: '#x', junk: 1 } }] },
        ]),
      );
      expect(parsed[0].actions).toEqual([{ type: 'hide', options: { target: '#x' } }]);
      expect(parsed[0].id).toMatch(/^flow-/);
    });

    test('falls back to the first trigger when the stored one is unknown', () => {
      const parsed = parseFlowRecords(JSON.stringify([{ trigger: 'telepathy', actions: [{ type: 'show' }] }]));
      expect(parsed[0].trigger).toBe('click');
    });
  });

  describe('serializeFlowRecords', () => {
    test('drops flows with no steps so empty attributes are never written', () => {
      expect(serializeFlowRecords([{ id: 'a', trigger: 'click', actions: [] }])).toBe('');
      expect(serializeFlowRecords([])).toBe('');
      const serialized = serializeFlowRecords([
        { id: 'a', trigger: 'click', actions: [{ type: 'show', options: {} }] },
      ]);
      expect(JSON.parse(serialized)[0].actions[0].type).toBe('show');
    });
  });

  describe('buildAlertButtonFlowRecord', () => {
    test('builds a click flow and keeps the existing flow id', () => {
      const flowRecord = buildAlertButtonFlowRecord({ 'data-db-alert-title': 'Hi' }, 'flow-keep');
      expect(flowRecord.id).toBe('flow-keep');
      expect(flowRecord.trigger).toBe('click');
      expect(flowRecord.actions[0].options.title).toBe('Hi');
    });

    test('ignores a follow-up step when no target was given', () => {
      const flowRecord = buildAlertButtonFlowRecord({ 'data-db-alert-then': 'open-url', 'data-db-alert-url': '' });
      expect(flowRecord.actions.length).toBe(1);
    });
  });

  describe('describeFlowSummary', () => {
    test('summarises one flow and counts several', () => {
      expect(describeFlowSummary([])).toBe('No flows yet');
      expect(describeFlowSummary([{ trigger: 'click', actions: [{ type: 'alert' }, { type: 'hide' }] }])).toBe(
        'When clicked: Show a dialog +1 more',
      );
      expect(
        describeFlowSummary([
          { trigger: 'click', actions: [{ type: 'alert' }] },
          { trigger: 'hover', actions: [{ type: 'hide' }] },
        ]),
      ).toBe('2 flows, 2 steps');
    });
  });

  describe('countUnbalancedPairs and validateCodeText', () => {
    test('ignores brackets that live inside strings', () => {
      expect(countUnbalancedPairs('a("{") ', '{', '}').depth).toBe(0);
      expect(countUnbalancedPairs("a('}')", '{', '}').lowestDepth).toBe(0);
    });

    test('ignores brackets inside comments so valid code stays valid', () => {
      expect(validateCodeText('css', ".a { /* don't */ color: red; }").valid).toBe(true);
      expect(validateCodeText('javascript', "if (a) { // don't\n b(); }").valid).toBe(true);
      expect(validateCodeText('css', '.a { background: url(http://x/y.png); }').valid).toBe(true);
      expect(countUnbalancedPairs('a /* { */ b', '{', '}').depth).toBe(0);
      expect(countUnbalancedPairs('a // {\nb', '{', '}', { lineComments: true }).depth).toBe(0);
    });

    test('walks past escaped quotes without losing the string state', () => {
      expect(countUnbalancedPairs('var a = "\\\\"; if (b) { c(); }', '{', '}').depth).toBe(0);
    });

    test('uses no regex lookbehind so older engines can parse the bundle', () => {
      const validatorSource = String(validateCodeText);
      expect(validatorSource).not.toContain('(?<');
    });

    test('counts self-closing html tags as open tags', () => {
      expect(validateCodeText('html', '<img src="x"/><br />').valid).toBe(true);
      expect(validateCodeText('html', '<div><p>hi</p></div>').valid).toBe(true);
    });

    test('reports the real problem per language', () => {
      expect(validateCodeText('css', '.a { color: red; }').valid).toBe(true);
      expect(validateCodeText('css', '.a { color: red;').message).toContain('never closed');
      expect(validateCodeText('css', '.a { }\n/* open').message).toContain('comment');
      expect(validateCodeText('javascript', 'if (a) { b(); }').valid).toBe(true);
      expect(validateCodeText('javascript', 'f(1;').message).toContain('bracket');
      expect(validateCodeText('json', '{"a":1}').valid).toBe(true);
      expect(validateCodeText('json', '{a:1}').valid).toBe(false);
      expect(validateCodeText('html', '</div>').message).toContain('closing tags');
      expect(validateCodeText('html', '   ').valid).toBe(true);
    });
  });

  describe('stripNestedSymbolChildren', () => {
    test('keeps a nested symbol as a reference so it still tracks its own master', () => {
      const stripped = stripNestedSymbolChildren({
        type: 'db-section',
        components: [
          {
            type: 'db-symbol',
            attributes: { 'data-db-symbol': 'sym-nav' },
            components: [{ type: 'db-text', components: 'stale copy' }],
          },
          { type: 'db-text', components: 'kept' },
        ],
      });
      expect(stripped.components[0].components).toBeUndefined();
      expect(stripped.components[0].attributes['data-db-symbol']).toBe('sym-nav');
      expect(stripped.components[1].components).toBe('kept');
    });

    test('recognises a symbol by its data attribute alone', () => {
      const stripped = stripNestedSymbolChildren({
        attributes: { 'data-db-type': 'symbol' },
        components: [{ type: 'db-text' }],
      });
      expect(stripped.components).toBeUndefined();
    });
  });

  describe('stripDefinitionElementIds', () => {
    test('removes ids at every depth so instances get fresh ones', () => {
      const stripped = stripDefinitionElementIds({
        id: 'a',
        attributes: { id: 'a', 'data-db-type': 'navbar' },
        components: [{ attributes: { id: 'b', class: 'x' } }],
      });
      expect(stripped.id).toBeUndefined();
      expect(stripped.attributes.id).toBeUndefined();
      expect(stripped.attributes['data-db-type']).toBe('navbar');
      expect(stripped.components[0].attributes.id).toBeUndefined();
      expect(stripped.components[0].attributes.class).toBe('x');
    });
  });

  describe('serializeComponentDefinition', () => {
    test('returns null for anything that cannot be serialised', () => {
      expect(serializeComponentDefinition(null)).toBeNull();
      expect(serializeComponentDefinition({})).toBeNull();
    });

    test('drops editor-only keys from the stored definition', () => {
      const definition = serializeComponentDefinition({
        toJSON: () => ({
          type: 'db-text',
          status: 'selected',
          toolbar: [{ command: 'x' }],
          __symbol: 'abc',
          components: [{ type: 'textnode', content: 'hi', status: 'selected' }],
        }),
      });
      expect(definition.status).toBeUndefined();
      expect(definition.toolbar).toBeUndefined();
      expect(definition.__symbol).toBeUndefined();
      expect(definition.components[0].status).toBeUndefined();
      expect(definition.components[0].content).toBe('hi');
    });
  });
});
