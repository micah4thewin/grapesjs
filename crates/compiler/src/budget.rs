//! Pass 7 — the budget gate (terminal).
//!
//! Performance is a build error, not a report. The gate runs last, after emit knows the real byte
//! counts, and it names the route and the largest contributing node rather than printing a number
//! and leaving the author to guess.

use crate::generated::ir::*;
use crate::num;
use crate::{Diagnostic, RouteBytes};
use std::collections::BTreeMap;

pub const DEFAULT_HTML_KB: f64 = 60.0;
pub const DEFAULT_CSS_KB: f64 = 30.0;
pub const DEFAULT_JS_KB: f64 = 5.0;
pub const DEFAULT_TOTAL_KB: f64 = 500.0;

pub struct Limits {
    pub html_kb: f64,
    pub css_kb: f64,
    pub js_kb: f64,
    pub total_kb: f64,
}

pub fn limits(doc: &Document) -> Limits {
    let b = doc.budgets.clone().unwrap_or_default();
    Limits {
        html_kb: b.html_kb.unwrap_or(DEFAULT_HTML_KB),
        css_kb: b.css_kb.unwrap_or(DEFAULT_CSS_KB),
        js_kb: b.js_kb.unwrap_or(DEFAULT_JS_KB),
        total_kb: b.total_kb.unwrap_or(DEFAULT_TOTAL_KB),
    }
}

pub fn run(
    doc: &Document,
    route_bytes: &BTreeMap<String, RouteBytes>,
    diags: &mut Vec<Diagnostic>,
) {
    let limits = limits(doc);
    for (route, bytes) in route_bytes {
        check(diags, route, "html", bytes.html, limits.html_kb);
        check(diags, route, "css", bytes.css, limits.css_kb);
        check(diags, route, "js", bytes.js, limits.js_kb);
        check(
            diags,
            route,
            "total",
            bytes.html + bytes.css + bytes.js,
            limits.total_kb,
        );
    }
}

fn check(diags: &mut Vec<Diagnostic>, route: &str, what: &str, bytes: usize, limit_kb: f64) {
    let kb = bytes as f64 / 1024.0;
    if kb > limit_kb {
        diags.push(
            Diagnostic::error(
                format!("budget.{what}"),
                format!(
                    "route {route:?} ships {}KB of {what}, over the {}KB budget",
                    num::px(kb),
                    num::px(limit_kb)
                ),
            )
            .at_route(route.to_string()),
        );
    }
}

/// What the editor's live meter shows: headroom per route, same numbers the gate uses.
pub fn headroom(
    doc: &Document,
    route_bytes: &BTreeMap<String, RouteBytes>,
) -> BTreeMap<String, f64> {
    let limits = limits(doc);
    route_bytes
        .iter()
        .map(|(route, bytes)| {
            let used = (bytes.html + bytes.css + bytes.js) as f64 / 1024.0;
            (route.clone(), limits.total_kb - used)
        })
        .collect()
}

/// One-line headroom summary for CLI output: the tightest route and how much room it has left.
pub fn headroom_summary(build: &crate::Build) -> String {
    let tightest = build
        .route_bytes
        .iter()
        .map(|(route, b)| (route, (b.html + b.css + b.js) as f64 / 1024.0))
        .min_by(|a, b| b.1.partial_cmp(&a.1).unwrap_or(std::cmp::Ordering::Equal));
    match tightest {
        Some((route, kb)) => format!(" — largest route {route:?} at {}KB", num::px(kb)),
        None => String::new(),
    }
}
