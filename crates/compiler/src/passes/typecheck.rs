//! Pass 2 — typecheck.
//!
//! Every rule the schema is too blunt to state: what each node kind requires, which token group a
//! style field may point into, whether a grid child fits the grid, whether a bind resolves against
//! a real collection field. This is where "dangling bind is a build error, not a runtime blank"
//! actually happens.

use super::resolve::Resolved;
use crate::generated::ir::*;
use crate::Diagnostic;
use std::collections::BTreeMap;

pub fn run(doc: &Document, res: &Resolved, diags: &mut Vec<Diagnostic>) {
    // Which collection is in scope for a bind, per node: routes with a collection put one in scope
    // for their whole subtree; a `list` node puts its source in scope for its subtree.
    let scopes = bind_scopes(doc, res);

    for (id, node) in &doc.nodes {
        check_style(doc, node, diags);
        check_kind(doc, res, node, diags);
        check_place(doc, res, node, diags);
        if let Some(bind) = &node.bind {
            check_bind(res, id, bind, scopes.get(id).map(String::as_str), diags);
        }
    }

    let escapes = doc
        .nodes
        .values()
        .filter_map(|n| n.style.as_ref())
        .map(|s| s.escape.len())
        .sum::<usize>();
    if escapes > 0 {
        // Not an error — the escape hatch is legal. It is counted, and the count is what the
        // design-debt panel shows.
        diags.push(Diagnostic::warning(
            "typecheck.escape",
            format!("{escapes} raw style declaration(s) escape the token system; they appear in the design-debt panel"),
        ));
    }
}

fn bind_scopes(doc: &Document, res: &Resolved) -> BTreeMap<String, String> {
    let mut scopes: BTreeMap<String, String> = BTreeMap::new();
    for route in &doc.routes {
        if let Some(collection) = &route.collection {
            if let Some(nodes) = res.route_nodes.get(&route.path) {
                for id in nodes {
                    scopes.entry(id.clone()).or_insert_with(|| collection.clone());
                }
            }
        }
    }
    // `list` scopes win over the route scope inside their own subtree.
    for (id, node) in &doc.nodes {
        if node.kind == NodeKind::List {
            if let Some(source) = &node.source {
                let mut stack = vec![id.clone()];
                while let Some(current) = stack.pop() {
                    scopes.insert(current.clone(), source.clone());
                    if let Some(n) = doc.nodes.get(&current) {
                        stack.extend(n.children.iter().cloned());
                    }
                }
            }
        }
    }
    scopes
}

fn is_container(kind: NodeKind) -> bool {
    matches!(kind, NodeKind::Section | NodeKind::Stack | NodeKind::Grid | NodeKind::Frame | NodeKind::List)
}

fn check_kind(doc: &Document, res: &Resolved, node: &Node, diags: &mut Vec<Diagnostic>) {
    let id = &node.id;
    if !is_container(node.kind) && !node.children.is_empty() && node.kind != NodeKind::Instance {
        diags.push(
            Diagnostic::error("typecheck.leaf-children", format!("{:?} node {id:?} cannot have children", node.kind))
                .at_node(id.clone()),
        );
    }
    match node.kind {
        NodeKind::Heading => {
            if node.level.is_none() {
                diags.push(Diagnostic::error("typecheck.heading.level", format!("heading {id:?} has no level")).at_node(id.clone()));
            }
            if node.spans.is_empty() && node.bind.is_none() {
                diags.push(Diagnostic::error("typecheck.heading.empty", format!("heading {id:?} has neither text nor a binding")).at_node(id.clone()));
            }
        }
        NodeKind::Text => {
            if node.spans.is_empty() && node.bind.is_none() {
                diags.push(Diagnostic::error("typecheck.text.empty", format!("text {id:?} has neither text nor a binding")).at_node(id.clone()));
            }
        }
        NodeKind::Image => {
            if node.src.is_none() && node.bind.is_none() {
                diags.push(Diagnostic::error("typecheck.image.src", format!("image {id:?} has no source")).at_node(id.clone()));
            }
            // Intrinsic dimensions and alt are required by the plan, not merely encouraged:
            // layout shift and screen-reader silence are not tradeable against author convenience.
            if node.alt.is_none() {
                diags.push(Diagnostic::error("typecheck.image.alt", format!("image {id:?} has no alt text")).at_node(id.clone()));
            }
            if node.width.is_none() || node.height.is_none() {
                diags.push(
                    Diagnostic::error("typecheck.image.dimensions", format!("image {id:?} is missing intrinsic width/height"))
                        .at_node(id.clone()),
                );
            }
        }
        NodeKind::Grid => {
            if node.cols.is_none() {
                diags.push(Diagnostic::error("typecheck.grid.cols", format!("grid {id:?} does not declare a column count")).at_node(id.clone()));
            }
        }
        NodeKind::List => match &node.source {
            None => diags.push(Diagnostic::error("typecheck.list.source", format!("list {id:?} has no source collection")).at_node(id.clone())),
            Some(source) => {
                if !res.collections.contains_key(source) {
                    diags.push(
                        Diagnostic::error("typecheck.list.dangling", format!("list {id:?} repeats over collection {source:?}, which is not declared"))
                            .at_node(id.clone()),
                    );
                }
            }
        },
        NodeKind::Instance => match &node.component {
            None => diags.push(Diagnostic::error("typecheck.instance.component", format!("instance {id:?} names no component")).at_node(id.clone())),
            Some(name) => match res.components.get(name) {
                None => diags.push(
                    Diagnostic::error("typecheck.instance.dangling", format!("instance {id:?} uses component {name:?}, which is not declared"))
                        .at_node(id.clone()),
                ),
                Some(def) => {
                    for prop in &def.props {
                        if prop.required.unwrap_or(false) && !node.props.contains_key(&prop.name) {
                            diags.push(
                                Diagnostic::error(
                                    "typecheck.instance.prop-missing",
                                    format!("instance {id:?} does not set required prop {:?} of component {name:?}", prop.name),
                                )
                                .at_node(id.clone()),
                            );
                        }
                    }
                    for key in node.props.keys() {
                        if !def.props.iter().any(|p| &p.name == key) {
                            diags.push(
                                Diagnostic::error(
                                    "typecheck.instance.prop-unknown",
                                    format!("instance {id:?} sets prop {key:?}, which component {name:?} does not declare"),
                                )
                                .at_node(id.clone()),
                            );
                        }
                    }
                }
            },
        },
        _ => {}
    }
    let _ = doc;
}

fn check_place(doc: &Document, res: &Resolved, node: &Node, diags: &mut Vec<Diagnostic>) {
    let parent_kind = res.parent.get(&node.id).and_then(|p| doc.nodes.get(p)).map(|p| (p.id.clone(), p.kind, p.cols));
    match (&node.place, parent_kind) {
        (Some(place), Some((parent_id, NodeKind::Grid, cols))) => {
            let cols = cols.unwrap_or(12);
            if place.col + place.span - 1 > cols {
                diags.push(
                    Diagnostic::error(
                        "typecheck.place.overflow",
                        format!(
                            "node {:?} starts at column {} and spans {}, which runs past the {cols}-column grid {parent_id:?}",
                            node.id, place.col, place.span
                        ),
                    )
                    .at_node(node.id.clone()),
                );
            }
        }
        (Some(_), _) => diags.push(
            Diagnostic::error("typecheck.place.orphan", format!("node {:?} carries a grid placement but its parent is not a grid", node.id))
                .at_node(node.id.clone()),
        ),
        (None, Some((parent_id, NodeKind::Grid, _))) => diags.push(
            Diagnostic::error(
                "typecheck.place.missing",
                format!("node {:?} is a child of grid {parent_id:?} but has no placement", node.id),
            )
            .at_node(node.id.clone()),
        ),
        _ => {}
    }
}

/// Style fields point into one token group each. `bg: "space.4"` is nonsense and dies here.
fn check_style(doc: &Document, node: &Node, diags: &mut Vec<Diagnostic>) {
    let Some(style) = &node.style else { return };
    let checks: [(&str, Option<&String>, &str); 7] = [
        ("bg", style.bg.as_ref(), "color"),
        ("fg", style.fg.as_ref(), "color"),
        ("pad", style.pad.as_ref(), "space"),
        ("gap", style.gap.as_ref(), "space"),
        ("maxWidth", style.max_width.as_ref(), "space"),
        ("radius", style.radius.as_ref(), "radius"),
        ("type", style.type_.as_ref(), "type"),
    ];
    for (field, value, group) in checks {
        let Some(token) = value else { continue };
        let Some((prefix, name)) = token.split_once('.') else {
            diags.push(
                Diagnostic::error("typecheck.token.malformed", format!("node {:?} style {field} uses {token:?}, which is not a token reference", node.id))
                    .at_node(node.id.clone()),
            );
            continue;
        };
        if prefix != group {
            diags.push(
                Diagnostic::error(
                    "typecheck.token.group",
                    format!("node {:?} style {field} expects a {group} token but got {token:?}", node.id),
                )
                .at_node(node.id.clone()),
            );
            continue;
        }
        let exists = match group {
            "color" => doc.tokens.color.contains_key(name),
            "space" => doc.tokens.space.contains_key(name),
            "radius" => doc.tokens.radius.contains_key(name),
            "type" => doc.tokens.type_.contains_key(name),
            _ => false,
        };
        if !exists {
            diags.push(
                Diagnostic::error("typecheck.token.dangling", format!("node {:?} style {field} references {token:?}, which is not defined", node.id))
                    .at_node(node.id.clone()),
            );
        }
    }
}

fn check_bind(res: &Resolved, id: &str, bind: &str, scope: Option<&str>, diags: &mut Vec<Diagnostic>) {
    let Some((collection, field)) = bind.split_once('.') else {
        diags.push(Diagnostic::error("typecheck.bind.malformed", format!("node {id:?} binds to {bind:?}, which is not a collection path")).at_node(id.to_string()));
        return;
    };
    let Some(def) = res.collections.get(collection) else {
        diags.push(
            Diagnostic::error("typecheck.bind.dangling", format!("node {id:?} binds to {bind:?}, but collection {collection:?} is not declared"))
                .at_node(id.to_string()),
        );
        return;
    };
    if !def.fields.iter().any(|f| f.name == field) {
        diags.push(
            Diagnostic::error(
                "typecheck.bind.field",
                format!("node {id:?} binds to {bind:?}, but collection {collection:?} has no field {field:?}"),
            )
            .at_node(id.to_string()),
        );
        return;
    }
    match scope {
        Some(scope) if scope == collection => {}
        Some(scope) => diags.push(
            Diagnostic::error(
                "typecheck.bind.scope",
                format!("node {id:?} binds to {bind:?} but the record in scope here is a {scope:?}"),
            )
            .at_node(id.to_string()),
        ),
        None => diags.push(
            Diagnostic::error(
                "typecheck.bind.no-record",
                format!("node {id:?} binds to {bind:?} but no record is in scope; put it inside a list or on a collection route"),
            )
            .at_node(id.to_string()),
        ),
    }
}
