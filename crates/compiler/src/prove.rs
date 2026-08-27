//! Pass 6 — prove (v0).
//!
//! The prove passes are the ones that turn a promise into a build failure. v0 proves two things,
//! both of which need only the IR and the token set:
//!
//! * **Contrast** — every foreground/background token pairing a route actually renders is checked
//!   against WCAG 2.1 contrast, using the type token to decide the large-text threshold.
//! * **Alt completeness** — an image whose alt is present but empty, whitespace, or a filename is
//!   not accessible; the typecheck pass proved the field exists, this proves it says something.
//!
//! The exposure diff (Lattice §7) joins here at Stage E4, once bindings and permissions exist.

use crate::generated::ir::*;
use crate::num;
use crate::passes::resolve::Resolved;
use crate::Diagnostic;

/// Relative luminance per WCAG 2.1.
fn luminance(hex: &str) -> Option<f64> {
    let hex = hex.strip_prefix('#')?;
    if hex.len() != 6 {
        return None;
    }
    let channel = |i: usize| -> Option<f64> {
        let v = u8::from_str_radix(&hex[i..i + 2], 16).ok()? as f64 / 255.0;
        Some(if v <= 0.03928 {
            v / 12.92
        } else {
            ((v + 0.055) / 1.055).powf(2.4)
        })
    };
    Some(0.2126 * channel(0)? + 0.7152 * channel(2)? + 0.0722 * channel(4)?)
}

pub fn contrast_ratio(fg: &str, bg: &str) -> Option<f64> {
    let (a, b) = (luminance(fg)?, luminance(bg)?);
    let (lighter, darker) = if a > b { (a, b) } else { (b, a) };
    Some((lighter + 0.05) / (darker + 0.05))
}

pub fn run(doc: &Document, res: &Resolved, diags: &mut Vec<Diagnostic>) {
    for (route, nodes) in &res.route_nodes {
        for id in nodes {
            let Some(node) = doc.nodes.get(id) else {
                continue;
            };
            prove_alt(node, route, diags);
            prove_contrast(doc, res, node, route, diags);
        }
        prove_heading_order(doc, nodes, route, diags);
    }
    prove_descriptions(doc, diags);
    if doc.icon.is_none() {
        // Not fatal: a site can launch without an icon. It is counted because the cost is a 404 on
        // every first page view and a browser-default icon in every tab.
        diags.push(Diagnostic::warning(
            "prove.icon.missing",
            "the document declares no site icon; browsers will request /favicon.ico and get a 404",
        ));
    }
}

/// A heading level that jumps (h1 straight to h3) breaks the outline screen readers and search
/// engines navigate by. Same rule Lighthouse applies, applied at build time against the IR, where
/// the offending node has a name.
fn prove_heading_order(doc: &Document, nodes: &[String], route: &str, diags: &mut Vec<Diagnostic>) {
    let mut previous: Option<i64> = None;
    for id in nodes {
        let Some(node) = doc.nodes.get(id) else {
            continue;
        };
        if node.kind != NodeKind::Heading {
            continue;
        }
        let level = node.level.unwrap_or(2);
        match previous {
            Some(previous_level) if level > previous_level + 1 => diags.push(
                Diagnostic::error(
                    "prove.heading-order",
                    format!(
                        "heading {:?} is level {level} but follows a level {previous_level} heading; the outline skips level {}",
                        node.id,
                        previous_level + 1
                    ),
                )
                .at_node(node.id.clone())
                .at_route(route.to_string()),
            ),
            None if level != 1 => diags.push(
                Diagnostic::error(
                    "prove.heading-order",
                    format!("route {route:?} opens with heading {:?} at level {level}; every page needs one h1 first", node.id),
                )
                .at_node(node.id.clone())
                .at_route(route.to_string()),
            ),
            _ => {}
        }
        previous = Some(level);
    }
}

/// A route with no description is a route whose search result someone else writes. Cheap to
/// author, invisible when missing, so the build asks for it rather than hoping.
fn prove_descriptions(doc: &Document, diags: &mut Vec<Diagnostic>) {
    for route in &doc.routes {
        let missing = route
            .description
            .as_ref()
            .map(|d| d.trim().is_empty())
            .unwrap_or(true);
        if missing {
            diags.push(
                Diagnostic::error(
                    "prove.seo.description",
                    format!("route {:?} has no description; search engines and link previews will invent one", route.path),
                )
                .at_route(route.path.clone()),
            );
        }
    }
}

fn prove_alt(node: &Node, route: &str, diags: &mut Vec<Diagnostic>) {
    if node.kind != NodeKind::Image {
        return;
    }
    let Some(alt) = &node.alt else { return }; // absence is a typecheck error, already reported
    let trimmed = alt.trim();
    if trimmed.is_empty() {
        diags.push(
            Diagnostic::error(
                "prove.alt.empty",
                format!("image {:?} has empty alt text", node.id),
            )
            .at_node(node.id.clone())
            .at_route(route.to_string()),
        );
        return;
    }
    let looks_like_filename = trimmed.split_whitespace().count() == 1
        && [".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg", ".avif"]
            .iter()
            .any(|ext| trimmed.to_lowercase().ends_with(ext));
    if looks_like_filename {
        diags.push(
            Diagnostic::error(
                "prove.alt.filename",
                format!(
                    "image {:?} uses a filename ({trimmed:?}) as alt text",
                    node.id
                ),
            )
            .at_node(node.id.clone())
            .at_route(route.to_string()),
        );
    }
}

/// The background in force at a node is the nearest ancestor that sets one; the foreground is the
/// node's own, or inherited the same way. Both are token references, which is exactly why this is
/// provable at build time instead of screenshot-time.
fn prove_contrast(
    doc: &Document,
    res: &Resolved,
    node: &Node,
    route: &str,
    diags: &mut Vec<Diagnostic>,
) {
    if !matches!(node.kind, NodeKind::Text | NodeKind::Heading) {
        return;
    }
    let fg = inherited(doc, res, &node.id, |s| s.fg.clone());
    let bg = inherited(doc, res, &node.id, |s| s.bg.clone());
    let (Some(fg), Some(bg)) = (fg, bg) else {
        return;
    };
    let (Some(fg_value), Some(bg_value)) = (token_color(doc, &fg), token_color(doc, &bg)) else {
        return;
    };
    let Some(ratio) = contrast_ratio(&fg_value, &bg_value) else {
        return;
    };

    // WCAG large text: >= 24px, or >= 18.66px when bold.
    let type_token = inherited(doc, res, &node.id, |s| s.type_.clone())
        .and_then(|t| t.split_once('.').map(|(_, n)| n.to_string()))
        .and_then(|name| doc.tokens.type_.get(&name).cloned());
    let large = type_token
        .map(|t| t.size_px >= 24.0 || (t.size_px >= 18.66 && t.weight >= 700))
        .unwrap_or(false);
    let required = if large { 3.0 } else { 4.5 };

    if ratio + 1e-9 < required {
        diags.push(
            Diagnostic::error(
                "prove.contrast",
                format!(
                    "node {:?} renders {fg} ({fg_value}) on {bg} ({bg_value}) at {}:1, below the {}:1 required for {} text",
                    node.id,
                    num::ratio(ratio),
                    num::ratio(required),
                    if large { "large" } else { "body" }
                ),
            )
            .at_node(node.id.clone())
            .at_route(route.to_string()),
        );
    }
}

fn token_color(doc: &Document, token: &str) -> Option<String> {
    let (_, name) = token.split_once('.')?;
    doc.tokens.color.get(name).map(|c| c.value.clone())
}

fn inherited(
    doc: &Document,
    res: &Resolved,
    id: &str,
    pick: impl Fn(&Style) -> Option<String>,
) -> Option<String> {
    let mut current = Some(id.to_string());
    while let Some(node_id) = current {
        if let Some(node) = doc.nodes.get(&node_id) {
            if let Some(style) = &node.style {
                if let Some(value) = pick(style) {
                    return Some(value);
                }
            }
        }
        current = res.parent.get(&node_id).cloned();
    }
    None
}
