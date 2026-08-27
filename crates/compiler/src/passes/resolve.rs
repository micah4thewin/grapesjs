//! Pass 1 — resolve.
//!
//! Turns the flat node table into something the later passes can walk without ever asking
//! "does this id exist?" again: parent links, per-route reachable sets, and the route dependency
//! graph that Stage F1's incremental rebuild keys off. Every dangling reference dies here, named.

use crate::generated::ir::*;
use crate::{Diagnostic, Severity};
use std::collections::{BTreeMap, BTreeSet};

#[derive(Debug, Clone, Default)]
pub struct Resolved {
    /// node id -> parent node id
    pub parent: BTreeMap<String, String>,
    /// route path -> nodes reachable from its root, in document order
    pub route_nodes: BTreeMap<String, Vec<String>>,
    /// route path -> ids this route depends on (nodes today; content ids join at Stage E)
    pub route_deps: BTreeMap<String, Vec<String>>,
    /// every node reachable from any route
    pub reachable: BTreeSet<String>,
    pub collections: BTreeMap<String, Collection>,
    pub components: BTreeMap<String, ComponentDef>,
}

pub fn run(doc: &Document, diags: &mut Vec<Diagnostic>) -> Option<Resolved> {
    let mut r = Resolved::default();

    // The node table is keyed by id; a key that disagrees with the node's own id would make
    // every later "named node" message a lie.
    for (key, node) in &doc.nodes {
        if &node.id != key {
            diags.push(
                Diagnostic::error("resolve.id-mismatch", format!("node table key {key:?} does not match node id {:?}", node.id))
                    .at_node(key.clone()),
            );
        }
    }

    for c in &doc.collections {
        r.collections.insert(c.name.clone(), c.clone());
    }
    for c in &doc.components {
        r.components.insert(c.name.clone(), c.clone());
        if !doc.nodes.contains_key(&c.root) {
            diags.push(
                Diagnostic::error("resolve.component-root", format!("component {:?} has no root node {:?}", c.name, c.root))
                    .at_node(c.root.clone()),
            );
        }
    }

    // Children references, and the parent index built from them.
    for (id, node) in &doc.nodes {
        let mut seen = BTreeSet::new();
        for child in &node.children {
            if !doc.nodes.contains_key(child) {
                diags.push(
                    Diagnostic::error("resolve.dangling-child", format!("node {id:?} lists child {child:?}, which does not exist"))
                        .at_node(id.clone()),
                );
                continue;
            }
            if !seen.insert(child.clone()) {
                diags.push(
                    Diagnostic::error("resolve.duplicate-child", format!("node {id:?} lists child {child:?} twice"))
                        .at_node(id.clone()),
                );
            }
            if let Some(existing) = r.parent.get(child) {
                if existing != id {
                    diags.push(
                        Diagnostic::error(
                            "resolve.multiple-parents",
                            format!("node {child:?} is a child of both {existing:?} and {id:?}; the tree must stay a tree"),
                        )
                        .at_node(child.clone()),
                    );
                }
            } else {
                r.parent.insert(child.clone(), id.clone());
            }
        }
    }

    if doc.routes.is_empty() {
        diags.push(Diagnostic::error("resolve.no-routes", "document has no routes"));
    }

    let mut route_paths = BTreeSet::new();
    for route in &doc.routes {
        if !route_paths.insert(route.path.clone()) {
            diags.push(Diagnostic::error("resolve.duplicate-route", format!("route {:?} is declared twice", route.path)).at_route(route.path.clone()));
        }
        if !doc.nodes.contains_key(&route.root) {
            diags.push(
                Diagnostic::error("resolve.dangling-root", format!("route {:?} points at root node {:?}, which does not exist", route.path, route.root))
                    .at_route(route.path.clone()),
            );
            continue;
        }
        if let Some(collection) = &route.collection {
            if !r.collections.contains_key(collection) {
                diags.push(
                    Diagnostic::error(
                        "resolve.dangling-collection",
                        format!("route {:?} renders collection {collection:?}, which is not declared", route.path),
                    )
                    .at_route(route.path.clone()),
                );
            }
        }

        let mut order = Vec::new();
        let mut stack_path = BTreeSet::new();
        if let Err(cycle) = walk(doc, &route.root, &mut order, &mut stack_path) {
            diags.push(
                Diagnostic::error("resolve.cycle", format!("node {cycle:?} is its own ancestor; the node graph must be acyclic"))
                    .at_node(cycle)
                    .at_route(route.path.clone()),
            );
            continue;
        }
        for id in &order {
            r.reachable.insert(id.clone());
        }
        r.route_deps.insert(route.path.clone(), order.clone());
        r.route_nodes.insert(route.path.clone(), order);
    }

    for (id, _) in &doc.nodes {
        if !r.reachable.contains(id) && !r.components.values().any(|c| &c.root == id) {
            diags.push(
                Diagnostic::warning("resolve.orphan", format!("node {id:?} is not reachable from any route or component"))
                    .at_node(id.clone()),
            );
        }
    }

    if diags.iter().any(|d| d.severity == Severity::Error) {
        return None;
    }
    Some(r)
}

fn walk(doc: &Document, id: &str, order: &mut Vec<String>, on_path: &mut BTreeSet<String>) -> Result<(), String> {
    if !on_path.insert(id.to_string()) {
        return Err(id.to_string());
    }
    order.push(id.to_string());
    if let Some(node) = doc.nodes.get(id) {
        for child in &node.children {
            walk(doc, child, order, on_path)?;
        }
    }
    on_path.remove(id);
    Ok(())
}
