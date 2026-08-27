//! Pass 4 — style flatten.
//!
//! Token references on nodes become atomic classes with stable, readable names (`pad-5`,
//! `bg-surface`, `col-1-span-4`). Two properties matter and both are load-bearing:
//!
//! * **Stable** — a class name is a pure function of the token it came from, never of a hash or of
//!   iteration order, so a diff of two builds shows what actually changed.
//! * **Per-route critical CSS** — a route ships the rules it uses and the token variables those
//!   rules reference, nothing else.

use super::resolve::Resolved;
use crate::generated::ir::*;
use crate::num;
use std::collections::{BTreeMap, BTreeSet};

#[derive(Debug, Clone, Default)]
pub struct Styles {
    /// node id -> classes, in emission order
    pub classes: BTreeMap<String, Vec<String>>,
    /// class -> declaration block body, e.g. `padding:var(--space-5)`
    pub rules: BTreeMap<String, String>,
    /// css variable name -> value
    pub vars: BTreeMap<String, String>,
    /// class -> variables its declarations reference
    pub class_vars: BTreeMap<String, BTreeSet<String>>,
}

/// Reset plus the layout primitives every route needs. Deliberately tiny and deliberately not
/// configurable: this is the part of the output that is the same for every Lattice site.
pub const BASE_CSS: &str = concat!(
    "*,*::before,*::after{box-sizing:border-box}",
    "body,h1,h2,h3,h4,h5,h6,p,figure{margin:0}",
    "html{-webkit-text-size-adjust:100%}",
    "body{min-height:100vh;font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif}",
    "img{max-width:100%;height:auto;display:block}",
    "a{color:inherit}",
    ".l-section{display:block;container-type:inline-size;margin-inline:auto;width:100%}",
    ".l-stack{display:flex;flex-direction:column;container-type:inline-size}",
    ".l-grid{display:grid;container-type:inline-size}",
    ".l-frame{position:relative;container-type:inline-size}",
    ".l-list{display:flex;flex-direction:column}",
);

pub fn run(doc: &Document, res: &Resolved) -> Styles {
    let mut s = Styles::default();

    for (name, token) in &doc.tokens.color {
        s.vars
            .insert(format!("--color-{name}"), token.value.clone());
    }
    for (name, token) in &doc.tokens.space {
        s.vars.insert(
            format!("--space-{name}"),
            format!("{}px", num::px(token.px)),
        );
    }
    for (name, token) in &doc.tokens.radius {
        s.vars.insert(
            format!("--radius-{name}"),
            format!("{}px", num::px(token.px)),
        );
    }
    for (name, token) in &doc.tokens.type_ {
        s.vars.insert(
            format!("--type-{name}-size"),
            format!("{}px", num::px(token.size_px)),
        );
        s.vars
            .insert(format!("--type-{name}-lh"), num::ratio(token.line_height));
        s.vars
            .insert(format!("--type-{name}-weight"), token.weight.to_string());
    }

    for (id, node) in &doc.nodes {
        let mut classes = Vec::new();
        match node.kind {
            NodeKind::Section => classes.push("l-section".into()),
            NodeKind::Stack => classes.push("l-stack".into()),
            NodeKind::Grid => {
                classes.push("l-grid".into());
                let cols = node.cols.unwrap_or(12);
                let class = format!("cols-{cols}");
                rule(
                    &mut s,
                    &class,
                    format!("grid-template-columns:repeat({cols},minmax(0,1fr))"),
                    &[],
                );
                classes.push(class);
            }
            NodeKind::Frame => classes.push("l-frame".into()),
            NodeKind::List => classes.push("l-list".into()),
            _ => {}
        }

        if let Some(place) = &node.place {
            let class = format!("col-{}-span-{}", place.col, place.span);
            rule(
                &mut s,
                &class,
                format!("grid-column:{} / span {}", place.col, place.span),
                &[],
            );
            classes.push(class);
            if let Some(row) = place.row {
                let class = format!("row-{row}");
                rule(&mut s, &class, format!("grid-row:{row}"), &[]);
                classes.push(class);
            }
        }

        if let Some(style) = &node.style {
            classes.extend(style_classes(&mut s, style, id));
        }

        if !classes.is_empty() {
            s.classes.insert(id.clone(), classes);
        }
    }

    let _ = res;
    s
}

fn rule(s: &mut Styles, class: &str, body: String, vars: &[String]) {
    s.class_vars
        .entry(class.to_string())
        .or_default()
        .extend(vars.iter().cloned());
    s.rules.insert(class.to_string(), body);
}

fn add_token_class(
    s: &mut Styles,
    out: &mut Vec<String>,
    prefix: &str,
    token: &Option<String>,
    decl: impl Fn(&str) -> String,
) {
    let Some(token) = token else { return };
    let (group, name) = token.split_once('.').unwrap_or(("", token.as_str()));
    let class = format!("{prefix}-{}", num::slug(name));
    let body = decl(&format!("--{group}-{name}"));
    let vars = collect_vars(&body);
    rule(s, &class, body, &vars);
    out.push(class);
}

fn style_classes(s: &mut Styles, style: &Style, node_id: &str) -> Vec<String> {
    let mut out = Vec::new();
    add_token_class(s, &mut out, "bg", &style.bg, |v| {
        format!("background-color:var({v})")
    });
    add_token_class(s, &mut out, "text", &style.fg, |v| {
        format!("color:var({v})")
    });
    add_token_class(s, &mut out, "pad", &style.pad, |v| {
        format!("padding:var({v})")
    });
    add_token_class(s, &mut out, "gap", &style.gap, |v| format!("gap:var({v})"));
    add_token_class(s, &mut out, "radius", &style.radius, |v| {
        format!("border-radius:var({v})")
    });
    add_token_class(s, &mut out, "mw", &style.max_width, |v| {
        format!("max-width:var({v})")
    });

    if let Some(token) = &style.type_ {
        let name = token
            .split_once('.')
            .map(|(_, n)| n)
            .unwrap_or(token.as_str());
        let class = format!("type-{}", num::slug(name));
        let body =
            format!("font-size:var(--type-{name}-size);line-height:var(--type-{name}-lh);font-weight:var(--type-{name}-weight)");
        let vars = collect_vars(&body);
        rule(s, &class, body, &vars);
        out.push(class);
    }
    if let Some(align) = style.align {
        let name = match align {
            StyleAlign::Start => "start",
            StyleAlign::Center => "center",
            StyleAlign::End => "end",
            StyleAlign::Stretch => "stretch",
        };
        let class = format!("align-{name}");
        rule(s, &class, format!("align-items:{name}"), &[]);
        out.push(class);
    }
    if let Some(justify) = style.justify {
        let (name, value) = match justify {
            StyleJustify::Start => ("start", "flex-start"),
            StyleJustify::Center => ("center", "center"),
            StyleJustify::End => ("end", "flex-end"),
            StyleJustify::Between => ("between", "space-between"),
        };
        let class = format!("justify-{name}");
        rule(s, &class, format!("justify-content:{value}"), &[]);
        out.push(class);
    }

    // The counted exit hatch. One class per node that uses it, named after the node so the
    // design-debt panel can point at it and a reviewer reading the CSS sees the debt.
    if !style.escape.is_empty() {
        let class = format!("esc-{}", num::slug(node_id));
        let body = style
            .escape
            .iter()
            .map(|(property, value)| format!("{property}:{value}"))
            .collect::<Vec<_>>()
            .join(";");
        let vars = collect_vars(&body);
        rule(s, &class, body, &vars);
        out.push(class);
    }
    out
}

fn collect_vars(body: &str) -> Vec<String> {
    let mut out = Vec::new();
    let mut rest = body;
    while let Some(start) = rest.find("var(") {
        rest = &rest[start + 4..];
        if let Some(end) = rest.find(')') {
            out.push(rest[..end].to_string());
            rest = &rest[end..];
        } else {
            break;
        }
    }
    out
}

impl Styles {
    /// Critical CSS for one route: base, the token variables the route's rules touch, then the
    /// rules themselves in class-name order.
    pub fn css_for(&self, node_ids: &[String]) -> String {
        let mut used: BTreeSet<&str> = BTreeSet::new();
        for id in node_ids {
            if let Some(classes) = self.classes.get(id) {
                for class in classes {
                    used.insert(class.as_str());
                }
            }
        }
        let mut vars: BTreeSet<&str> = BTreeSet::new();
        for class in &used {
            if let Some(class_vars) = self.class_vars.get(*class) {
                for var in class_vars {
                    vars.insert(var.as_str());
                }
            }
        }

        let mut css = String::from(BASE_CSS);
        if !vars.is_empty() {
            css.push_str(":root{");
            for var in &vars {
                if let Some(value) = self.vars.get(*var) {
                    css.push_str(var);
                    css.push(':');
                    css.push_str(value);
                    css.push(';');
                }
            }
            css.pop();
            css.push('}');
        }
        for class in &used {
            if let Some(body) = self.rules.get(*class) {
                css.push('.');
                css.push_str(class);
                css.push('{');
                css.push_str(body);
                css.push('}');
            }
        }
        css
    }
}
