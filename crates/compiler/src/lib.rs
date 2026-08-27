//! The Lattice compiler.
//!
//! IR in, a directory of files out. There is exactly one emitter in the system and this is it:
//! the editor never serialises a document tree to HTML, it asks this crate (natively from the
//! CLI, through WASM from the canvas) so that what the canvas shows and what ships are the same
//! bytes from the same code.
//!
//! Pass order (Lattice §5) is fixed and each pass is a pure function of its input:
//!
//! 1. [`passes::resolve`]   — index nodes, check every reference, build the route dependency graph
//! 2. [`passes::typecheck`] — per-kind rules, binds against collections, grid legality
//! 3. *(reserved: lower — behaviours and workflows, Stage E5)*
//! 4. [`passes::style_flatten`] — token styles become atomic classes with stable readable names
//! 5. [`emit`]              — deterministic HTML/CSS/exportable app
//! 6. [`prove`]             — contrast and alt completeness (exposure joins at Stage E4)
//! 7. [`budget`]            — terminal gate; fails the build naming the offending node
//!
//! Determinism rules are documented in `docs/lattice/determinism.md` and enforced by CI. In short:
//! `BTreeMap` everywhere, no timestamps, no hashing of iteration order, fixed float formatting.

pub mod budget;
pub mod diagnostics;
pub mod emit;
pub mod generated;
pub mod num;
pub mod passes;
pub mod prove;

pub use diagnostics::{Diagnostic, Severity};
pub use generated::ir;

use std::collections::BTreeMap;

/// Everything a build produces: files to write, plus what we learned on the way.
#[derive(Debug, Clone, Default)]
pub struct Build {
    /// Relative path -> file bytes. `BTreeMap` so the write order is the same on every machine.
    pub files: BTreeMap<String, Vec<u8>>,
    pub diagnostics: Vec<Diagnostic>,
    /// route path -> node ids that route depends on. Persisted for incremental rebuild (Stage F1).
    pub route_deps: BTreeMap<String, Vec<String>>,
    /// Assets the build actually references. An export carries these and nothing else.
    pub assets_used: std::collections::BTreeSet<String>,
    pub route_bytes: BTreeMap<String, RouteBytes>,
}

#[derive(Debug, Clone, Copy, Default, PartialEq)]
pub struct RouteBytes {
    pub html: usize,
    pub css: usize,
    pub js: usize,
    /// Bytes of image the route asks the browser to fetch. Counted per route, because that is
    /// what a visitor actually pays.
    pub images: usize,
}

impl Build {
    pub fn errors(&self) -> impl Iterator<Item = &Diagnostic> {
        self.diagnostics
            .iter()
            .filter(|d| d.severity == Severity::Error)
    }

    pub fn ok(&self) -> bool {
        self.errors().next().is_none()
    }
}

/// How much work a build does. The editor's live preview uses [`Profile::Fast`], which skips
/// asset work and uses cached metrics; the CLI and CI use [`Profile::Full`]. Both run the same
/// passes in the same order — fast mode never changes what is legal, only what is measured.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Default)]
pub enum Profile {
    #[default]
    Full,
    Fast,
}

#[derive(Debug, Clone, Default)]
pub struct Options {
    pub profile: Profile,
    /// Emit the runnable export (package.json + server.js) alongside the static files.
    pub emit_app: bool,
    /// Asset path -> byte size. Sizes, not bytes: the compiler never needs the pixels, and the
    /// editor already has this metadata cached, so the fast profile costs nothing extra.
    /// Empty means "assets were not supplied"; a non-empty map is authoritative, and an image
    /// whose `src` is missing from it fails the build.
    pub assets: BTreeMap<String, usize>,
}

impl Options {
    pub fn full() -> Self {
        Options {
            profile: Profile::Full,
            emit_app: true,
            assets: BTreeMap::new(),
        }
    }
    pub fn fast() -> Self {
        Options {
            profile: Profile::Fast,
            emit_app: false,
            assets: BTreeMap::new(),
        }
    }
    pub fn with_assets(mut self, assets: BTreeMap<String, usize>) -> Self {
        self.assets = assets;
        self
    }
}

/// Parse + run every pass. The single entry point; both hosts call this.
pub fn compile_str(source: &str, opts: &Options) -> Build {
    compile_str_with_data(source, None, opts)
}

/// As [`compile_str`], with a build-time record snapshot (`{"posts": [{...}]}`). Stage B reads it
/// from a file next to the site; Stage E2 hands over the same shape from the database.
pub fn compile_str_with_data(source: &str, data: Option<&str>, opts: &Options) -> Build {
    let records = match data {
        None => emit::Records::new(),
        Some(raw) => match serde_json::from_str(raw) {
            Ok(r) => r,
            Err(e) => {
                let mut build = Build::default();
                build.diagnostics.push(Diagnostic::error(
                    "parse",
                    format!("record snapshot is not valid JSON: {e}"),
                ));
                return build;
            }
        },
    };
    let doc: ir::Document = match serde_json::from_str(source) {
        Ok(d) => d,
        Err(e) => {
            let mut build = Build::default();
            build.diagnostics.push(Diagnostic::error(
                "parse",
                format!("document is not valid IR JSON: {e}"),
            ));
            return build;
        }
    };
    compile_with_data(&doc, &records, opts)
}

pub fn compile(doc: &ir::Document, opts: &Options) -> Build {
    compile_with_data(doc, &emit::Records::new(), opts)
}

pub fn compile_with_data(doc: &ir::Document, records: &emit::Records, opts: &Options) -> Build {
    let mut build = Build::default();

    if doc.schema != ir::SCHEMA_VERSION {
        build.diagnostics.push(Diagnostic::error(
            "schema",
            format!(
                "document declares schema {:?}, this compiler speaks {:?}",
                doc.schema,
                ir::SCHEMA_VERSION
            ),
        ));
        return build;
    }

    // 1. resolve
    let resolved = match passes::resolve::run(doc, &mut build.diagnostics) {
        Some(r) => r,
        None => return build,
    };
    build.route_deps = resolved.route_deps.clone();

    // 2. typecheck
    passes::typecheck::run(doc, &resolved, &mut build.diagnostics);
    if !build.ok() {
        return build;
    }

    // 4. style-flatten
    let styles = passes::style_flatten::run(doc, &resolved);

    // 5. emit
    emit::run_with_data(doc, &resolved, &styles, records, opts, &mut build);

    // 6. prove
    prove::run(doc, &resolved, &mut build.diagnostics);

    // 7. budget (terminal)
    budget::run(doc, &build.route_bytes, &mut build.diagnostics);

    build
}
