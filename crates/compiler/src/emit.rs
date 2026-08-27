//! Pass 5 — emit.
//!
//! The only place HTML is produced in the entire system. Two properties are load-bearing:
//!
//! * **Deterministic** — the same IR gives the same bytes on any machine, in any build profile.
//!   Nothing here reads a clock, hashes a pointer, or iterates a `HashMap`.
//! * **Addressed** — every element carries `data-lattice-id`, so the canvas can map a click back
//!   to an IR node and CI can prove the projection and the compilation are the same tree.
//!
//! The export is also runnable: `package.json` + `server.js` with no dependencies, so
//! `npm ci && npm start` works in a container with no network route back to us.

use crate::generated::ir::*;
use crate::passes::{resolve::Resolved, style_flatten::Styles};
use crate::{Build, Diagnostic, Options, RouteBytes};
use std::collections::BTreeMap;

/// Records available at build time, keyed by collection name. Stage B reads them from a JSON
/// snapshot next to the site; Stage E2 swaps the source for the database without changing emit.
pub type Records = BTreeMap<String, Vec<BTreeMap<String, serde_json::Value>>>;

pub fn run(doc: &Document, res: &Resolved, styles: &Styles, opts: &Options, build: &mut Build) {
    run_with_data(doc, res, styles, &Records::new(), opts, build)
}

pub fn run_with_data(
    doc: &Document,
    res: &Resolved,
    styles: &Styles,
    records: &Records,
    opts: &Options,
    build: &mut Build,
) {
    for route in &doc.routes {
        let node_ids = res
            .route_nodes
            .get(&route.path)
            .cloned()
            .unwrap_or_default();
        let css = styles.css_for(&node_ids);

        match &route.collection {
            None => {
                let html = render_page(doc, styles, route, &css, None, records);
                let path = file_path(&route.path);
                record_route(build, &route.path, &html, &css);
                build.files.insert(path, html.into_bytes());
            }
            Some(collection) => {
                // A dynamic route is one template and N pages. The record set comes from the
                // snapshot; with no snapshot the route is skipped with a named warning rather
                // than emitting a page that renders blanks.
                let rows = records.get(collection).cloned().unwrap_or_default();
                if rows.is_empty() {
                    build.diagnostics.push(
                        Diagnostic::warning(
                            "emit.no-records",
                            format!("route {:?} renders collection {collection:?}, but no records were supplied; no pages emitted", route.path),
                        )
                        .at_route(route.path.clone()),
                    );
                    continue;
                }
                for row in &rows {
                    let Some(slug) = row.get("slug").and_then(|v| v.as_str()) else {
                        build.diagnostics.push(
                            Diagnostic::error("emit.missing-slug", format!("a {collection:?} record has no slug; dynamic routes address records by slug"))
                                .at_route(route.path.clone()),
                        );
                        continue;
                    };
                    let concrete = route.path.replace(":slug", slug);
                    let html = render_page(doc, styles, route, &css, Some(row), records);
                    record_route(build, &concrete, &html, &css);
                    build.files.insert(file_path(&concrete), html.into_bytes());
                }
            }
        }
    }

    if !doc.redirects.is_empty() {
        build
            .files
            .insert("_redirects".to_string(), redirects_file(doc).into_bytes());
    }

    if opts.emit_app {
        build.files.insert(
            "package.json".to_string(),
            app_package_json(doc).into_bytes(),
        );
        build
            .files
            .insert("server.js".to_string(), SERVER_JS.as_bytes().to_vec());
        build.files.insert(
            "404.html".to_string(),
            not_found_html(doc, styles).into_bytes(),
        );
    }
}

fn record_route(build: &mut Build, path: &str, html: &str, css: &str) {
    build.route_bytes.insert(
        path.to_string(),
        RouteBytes {
            html: html.len(),
            css: css.len(),
            js: 0,
        },
    );
}

/// `/` -> `index.html`, `/pricing` -> `pricing/index.html`. Directory-style so any static host
/// serves it without rewrite rules.
pub fn file_path(route_path: &str) -> String {
    let trimmed = route_path.trim_matches('/');
    if trimmed.is_empty() {
        "index.html".to_string()
    } else {
        format!("{trimmed}/index.html")
    }
}

fn render_page(
    doc: &Document,
    styles: &Styles,
    route: &Route,
    css: &str,
    record: Option<&BTreeMap<String, serde_json::Value>>,
    records: &Records,
) -> String {
    let mut body = String::new();
    let scope = Scope {
        record,
        collection: route.collection.as_deref(),
        index: None,
    };
    render_node(doc, styles, &route.root, &scope, records, &mut body);

    let mut out = String::from("<!doctype html>\n<html lang=\"en\">\n<head>\n");
    out.push_str("<meta charset=\"utf-8\">\n");
    out.push_str("<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n");
    out.push_str(&format!(
        "<title>{}</title>\n",
        escape_text(&interpolate(&route.title, record))
    ));
    if let Some(description) = &route.description {
        out.push_str(&format!(
            "<meta name=\"description\" content=\"{}\">\n",
            escape_attr(&interpolate(description, record))
        ));
    }
    out.push_str(&format!("<style>{css}</style>\n"));
    out.push_str("</head>\n<body>\n");
    out.push_str(&body);
    out.push_str("\n</body>\n</html>\n");
    out
}

struct Scope<'a> {
    record: Option<&'a BTreeMap<String, serde_json::Value>>,
    collection: Option<&'a str>,
    index: Option<usize>,
}

fn render_node(
    doc: &Document,
    styles: &Styles,
    id: &str,
    scope: &Scope,
    records: &Records,
    out: &mut String,
) {
    let Some(node) = doc.nodes.get(id) else {
        return;
    };
    let class_attr = styles
        .classes
        .get(id)
        .filter(|c| !c.is_empty())
        .map(|c| format!(" class=\"{}\"", c.join(" ")))
        .unwrap_or_default();
    let index_attr = scope
        .index
        .map(|i| format!(" data-lattice-index=\"{i}\""))
        .unwrap_or_default();
    let id_attr = format!(" data-lattice-id=\"{}\"{index_attr}", escape_attr(id));

    match node.kind {
        NodeKind::Text | NodeKind::Heading => {
            let tag = if node.kind == NodeKind::Heading {
                format!("h{}", node.level.unwrap_or(2).clamp(1, 6))
            } else {
                "p".to_string()
            };
            out.push_str(&format!("<{tag}{id_attr}{class_attr}>"));
            out.push_str(&render_text(node, scope));
            out.push_str(&format!("</{tag}>"));
        }
        NodeKind::Image => {
            let src = node
                .bind
                .as_ref()
                .and_then(|b| bound_value(b, scope))
                .unwrap_or_else(|| node.src.clone().unwrap_or_default());
            out.push_str(&format!(
                "<img{id_attr}{class_attr} src=\"{}\" alt=\"{}\" width=\"{}\" height=\"{}\" loading=\"lazy\" decoding=\"async\">",
                escape_attr(&src),
                escape_attr(node.alt.as_deref().unwrap_or("")),
                node.width.unwrap_or(0),
                node.height.unwrap_or(0),
            ));
        }
        NodeKind::List => {
            let tag = "div";
            out.push_str(&format!("<{tag}{id_attr}{class_attr}>"));
            let rows = node
                .source
                .as_ref()
                .and_then(|s| records.get(s))
                .cloned()
                .unwrap_or_default();
            let limit = node.limit.unwrap_or(i64::MAX).max(0) as usize;
            for (i, row) in rows.iter().take(limit).enumerate() {
                let child_scope = Scope {
                    record: Some(row),
                    collection: node.source.as_deref(),
                    index: Some(i),
                };
                for child in &node.children {
                    render_node(doc, styles, child, &child_scope, records, out);
                }
            }
            out.push_str(&format!("</{tag}>"));
        }
        _ => {
            let tag = node
                .tag
                .map(|t| match t {
                    NodeTag::Div => "div",
                    NodeTag::Section => "section",
                    NodeTag::Article => "article",
                    NodeTag::Header => "header",
                    NodeTag::Footer => "footer",
                    NodeTag::Nav => "nav",
                    NodeTag::Main => "main",
                    NodeTag::Aside => "aside",
                })
                .unwrap_or(match node.kind {
                    NodeKind::Section => "section",
                    _ => "div",
                });
            out.push_str(&format!("<{tag}{id_attr}{class_attr}>"));
            for child in &node.children {
                render_node(doc, styles, child, scope, records, out);
            }
            out.push_str(&format!("</{tag}>"));
        }
    }
}

fn render_text(node: &Node, scope: &Scope) -> String {
    if let Some(bind) = &node.bind {
        return escape_text(&bound_value(bind, scope).unwrap_or_default());
    }
    let mut out = String::new();
    for span in &node.spans {
        let text = escape_text(&span.text);
        let marked = match span.mark {
            Some(SpanMark::Strong) => format!("<strong>{text}</strong>"),
            Some(SpanMark::Em) => format!("<em>{text}</em>"),
            Some(SpanMark::Code) => format!("<code>{text}</code>"),
            None => text,
        };
        match &span.href {
            Some(href) => out.push_str(&format!("<a href=\"{}\">{marked}</a>", escape_attr(href))),
            None => out.push_str(&marked),
        }
    }
    out
}

fn bound_value(bind: &str, scope: &Scope) -> Option<String> {
    let (collection, field) = bind.split_once('.')?;
    if scope.collection != Some(collection) {
        return None;
    }
    let value = scope.record?.get(field)?;
    Some(match value {
        serde_json::Value::String(s) => s.clone(),
        serde_json::Value::Number(n) => n.to_string(),
        serde_json::Value::Bool(b) => b.to_string(),
        serde_json::Value::Null => String::new(),
        other => other.to_string(),
    })
}

/// `{title}` in a route title/description resolves against the record on dynamic routes.
fn interpolate(text: &str, record: Option<&BTreeMap<String, serde_json::Value>>) -> String {
    let Some(record) = record else {
        return text.to_string();
    };
    let mut out = String::new();
    let mut rest = text;
    while let Some(start) = rest.find('{') {
        out.push_str(&rest[..start]);
        rest = &rest[start + 1..];
        match rest.find('}') {
            Some(end) => {
                let key = &rest[..end];
                match record.get(key) {
                    Some(serde_json::Value::String(s)) => out.push_str(s),
                    Some(other) => out.push_str(&other.to_string()),
                    None => {
                        out.push('{');
                        out.push_str(key);
                        out.push('}');
                    }
                }
                rest = &rest[end + 1..];
            }
            None => {
                out.push('{');
                break;
            }
        }
    }
    out.push_str(rest);
    out
}

pub fn escape_text(text: &str) -> String {
    text.replace('&', "&amp;")
        .replace('<', "&lt;")
        .replace('>', "&gt;")
}

pub fn escape_attr(text: &str) -> String {
    escape_text(text).replace('"', "&quot;")
}

fn redirects_file(doc: &Document) -> String {
    let mut out = String::new();
    for entry in &doc.redirects {
        out.push_str(&format!("{} {} {}\n", entry.from, entry.to, entry.status));
    }
    out
}

fn not_found_html(doc: &Document, styles: &Styles) -> String {
    let css = styles.css_for(&[]);
    format!(
        "<!doctype html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>Not found — {}</title>\n<style>{css}</style>\n</head>\n<body>\n<main class=\"l-section\"><h1>Not found</h1><p>That page does not exist.</p></main>\n</body>\n</html>\n",
        escape_text(&doc.name)
    )
}

fn app_package_json(doc: &Document) -> String {
    // No dependencies, on purpose: `npm ci` must succeed in a container with no network.
    format!(
        "{{\n  \"name\": \"{}\",\n  \"private\": true,\n  \"version\": \"0.0.0\",\n  \"type\": \"commonjs\",\n  \"scripts\": {{\n    \"start\": \"node server.js\"\n  }}\n}}\n",
        doc.id.replace('"', "")
    )
}

pub const SERVER_JS: &str = r#"// Emitted by the Lattice compiler. No dependencies, on purpose: this has to run on a machine
// that cannot reach us. `npm ci && npm start`, then http://localhost:$PORT.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const root = __dirname;
const port = Number(process.env.PORT || 8080);
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.woff2': 'font/woff2',
};

const redirects = (() => {
  try {
    return fs
      .readFileSync(path.join(root, '_redirects'), 'utf8')
      .split('\n')
      .filter(Boolean)
      .map((line) => line.split(/\s+/))
      .map(([from, to, status]) => ({ from, to, status: Number(status) || 301 }));
  } catch {
    return [];
  }
})();

http
  .createServer((req, res) => {
    const url = new URL(req.url, 'http://localhost');
    const redirect = redirects.find((r) => r.from === url.pathname);
    if (redirect) {
      res.writeHead(redirect.status, { location: redirect.to });
      return res.end();
    }
    let filePath = path.join(root, url.pathname);
    if (!filePath.startsWith(root)) {
      res.writeHead(403);
      return res.end('forbidden');
    }
    if (!path.extname(filePath)) filePath = path.join(filePath, 'index.html');
    fs.readFile(filePath, (err, body) => {
      if (err) {
        return fs.readFile(path.join(root, '404.html'), (e2, notFound) => {
          res.writeHead(404, { 'content-type': 'text/html; charset=utf-8' });
          res.end(e2 ? 'not found' : notFound);
        });
      }
      res.writeHead(200, { 'content-type': types[path.extname(filePath)] || 'application/octet-stream' });
      res.end(body);
    });
  })
  .listen(port, () => console.log(`lattice export listening on http://localhost:${port}`));
"#;
