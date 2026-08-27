//! The corpus is the compiler's conscience: every valid site must build clean and identically
//! twice, and every invalid fixture must fail with the *named* diagnostic the plan promises.

use lattice_compiler::{compile_str, compile_str_with_data, Options, Severity};
use std::fs;
use std::path::{Path, PathBuf};

fn repo_root() -> PathBuf {
    Path::new(env!("CARGO_MANIFEST_DIR"))
        .join("../..")
        .canonicalize()
        .unwrap()
}

fn sites() -> Vec<PathBuf> {
    let dir = repo_root().join("corpus/sites");
    let mut out: Vec<PathBuf> = fs::read_dir(dir)
        .unwrap()
        .filter_map(Result::ok)
        .map(|e| e.path())
        .filter(|p| p.extension().map(|e| e == "json").unwrap_or(false))
        .filter(|p| {
            // Sidecars (`x.data.json`, `x.exposure.json`) live beside their site, not as sites.
            let name = p.to_string_lossy().to_string();
            !name.ends_with(".data.json") && !name.ends_with(".exposure.json")
        })
        .collect();
    out.sort();
    out
}

fn build_site(path: &Path) -> lattice_compiler::Build {
    let source = fs::read_to_string(path).unwrap();
    let data = fs::read_to_string(path.with_extension("data.json")).ok();
    compile_str_with_data(&source, data.as_deref(), &Options::full())
}

fn fixture(name: &str) -> lattice_compiler::Build {
    let path = repo_root().join("corpus/invalid").join(name);
    let source = fs::read_to_string(&path).unwrap_or_else(|e| panic!("{}: {e}", path.display()));
    compile_str(&source, &Options::full())
}

fn codes(build: &lattice_compiler::Build) -> Vec<String> {
    build
        .diagnostics
        .iter()
        .filter(|d| d.severity == Severity::Error)
        .map(|d| d.code.clone())
        .collect()
}

#[test]
fn every_corpus_site_builds_clean() {
    let sites = sites();
    assert!(!sites.is_empty(), "corpus is empty");
    for site in sites {
        let build = build_site(&site);
        let errors: Vec<String> = build.errors().map(|d| d.to_string()).collect();
        assert!(
            errors.is_empty(),
            "{} failed to build:\n{}",
            site.display(),
            errors.join("\n")
        );
        assert!(
            !build.files.is_empty(),
            "{} emitted nothing",
            site.display()
        );
        assert!(
            build.files.contains_key("index.html"),
            "{} has no home page",
            site.display()
        );
    }
}

#[test]
fn builds_are_byte_identical_across_runs() {
    // Determinism is lost to a stray HashMap, not to a decision (Lattice §21 risk 7). This is the
    // in-crate half of the guard; CI runs the same check across processes and machines.
    for site in sites() {
        let first = build_site(&site);
        let second = build_site(&site);
        assert_eq!(
            first.files,
            second.files,
            "{} is not deterministic",
            site.display()
        );
        assert_eq!(first.route_deps, second.route_deps);
    }
}

#[test]
fn export_is_runnable_and_self_contained() {
    for site in sites() {
        let build = build_site(&site);
        let package = String::from_utf8(build.files["package.json"].clone()).unwrap();
        assert!(
            build.files.contains_key("server.js"),
            "{} has no server",
            site.display()
        );
        assert!(
            !package.contains("dependencies"),
            "{} export must install with no network",
            site.display()
        );
        for (path, bytes) in &build.files {
            if path.ends_with(".html") {
                let html = String::from_utf8(bytes.clone()).unwrap();
                assert!(
                    !html.contains("http://"),
                    "{path} in {} links out over plain http",
                    site.display()
                );
                assert!(
                    !html.contains("<script"),
                    "{path} in {} ships script it did not declare",
                    site.display()
                );
            }
        }
    }
}

#[test]
fn raw_values_cannot_masquerade_as_tokens() {
    assert!(codes(&fixture("raw-hex-color.json"))
        .iter()
        .any(|c| c == "typecheck.token.malformed"));
}

#[test]
fn dangling_bind_is_a_build_error() {
    let build = fixture("dangling-bind.json");
    let messages: Vec<String> = build.errors().map(|d| d.to_string()).collect();
    assert!(
        codes(&build).iter().any(|c| c == "typecheck.bind.field"),
        "{messages:?}"
    );
    assert!(
        messages.iter().any(|m| m.contains("node \"t\"")),
        "the error must name the node: {messages:?}"
    );
}

#[test]
fn images_must_carry_alt_and_dimensions() {
    let build = fixture("missing-alt.json");
    assert!(codes(&build).iter().any(|c| c == "typecheck.image.alt"));
    assert!(codes(&fixture("filename-alt.json"))
        .iter()
        .any(|c| c == "prove.alt.filename"));
}

#[test]
fn contrast_is_proved_not_eyeballed() {
    let build = fixture("low-contrast.json");
    let messages: Vec<String> = build.errors().map(|d| d.to_string()).collect();
    assert!(
        codes(&build).iter().any(|c| c == "prove.contrast"),
        "{messages:?}"
    );
    assert!(
        messages.iter().any(|m| m.contains("color.faint")),
        "the error must name the tokens: {messages:?}"
    );
}

#[test]
fn grid_placements_must_fit_the_grid() {
    assert!(codes(&fixture("grid-overflow.json"))
        .iter()
        .any(|c| c == "typecheck.place.overflow"));
    assert!(codes(&fixture("missing-place.json"))
        .iter()
        .any(|c| c == "typecheck.place.missing"));
}

#[test]
fn the_tree_must_stay_a_tree() {
    assert!(codes(&fixture("cycle.json"))
        .iter()
        .any(|c| c == "resolve.cycle"));
}

#[test]
fn the_budget_gate_names_the_route_it_fails() {
    let build = fixture("over-budget.json");
    let failures: Vec<&lattice_compiler::Diagnostic> = build
        .errors()
        .filter(|d| d.code.starts_with("budget."))
        .collect();
    assert!(
        !failures.is_empty(),
        "an over-budget site must fail the build"
    );
    assert!(
        failures.iter().all(|d| d.route.is_some()),
        "budget failures must name the route"
    );
}

#[test]
fn the_page_outline_is_proved_not_hoped_for() {
    // These two fixtures are exactly the failures a Lighthouse run found on the corpus before the
    // prove passes existed. Catching them at build time is the point: a browser audit you have to
    // remember to run is not a gate.
    let build = fixture("heading-skip.json");
    assert!(codes(&build).iter().any(|c| c == "prove.heading-order"));
    assert!(build.errors().any(|d| d.node.as_deref() == Some("h3")));

    let build = fixture("no-description.json");
    assert!(codes(&build).iter().any(|c| c == "prove.seo.description"));
    assert!(build.errors().any(|d| d.route.as_deref() == Some("/")));
}

#[test]
fn images_are_measured_against_the_asset_store() {
    use std::collections::BTreeMap;
    let source = fs::read_to_string(repo_root().join("corpus/sites/portfolio.json")).unwrap();

    // No asset table supplied: nothing to check against, images do not count toward the budget.
    let unmeasured = compile_str(&source, &Options::full());
    assert!(unmeasured.ok());
    assert!(unmeasured.route_bytes["/"].images == 0);

    // A table that does not contain a referenced image fails the build, naming the node.
    let mut assets = BTreeMap::new();
    assets.insert("assets/pallet-jack.png".to_string(), 4477);
    let partial = compile_str(&source, &Options::full().with_assets(assets.clone()));
    assert!(partial
        .errors()
        .any(|d| d.code == "emit.missing-asset" && d.node.is_some()));

    for name in ["torque-wrench", "crate", "scanner"] {
        assets.insert(format!("assets/{name}.png"), 4477);
    }
    // The site icon is an asset like any other: shipped, counted, and a build error when missing.
    assets.insert("assets/icon-portfolio.png".to_string(), 165);
    let measured = compile_str(&source, &Options::full().with_assets(assets));
    assert!(
        measured.ok(),
        "{:?}",
        measured.errors().map(|d| d.to_string()).collect::<Vec<_>>()
    );
    assert_eq!(measured.route_bytes["/"].images, 4477 * 4 + 165);
    assert_eq!(measured.assets_used.len(), 5);
}

#[test]
fn a_route_may_not_render_what_it_was_told_is_private() {
    // The fixture looks like an ordinary team page. The leak is one word in the IR, which is
    // exactly why this has to be proved rather than reviewed.
    let build = fixture("exposed-private-field.json");
    let leak = build
        .errors()
        .find(|d| d.code == "prove.exposure.private-field")
        .expect("rendering a private field must fail the build");
    assert_eq!(leak.node.as_deref(), Some("card-email"));
    assert_eq!(leak.route.as_deref(), Some("/"));
    assert!(
        leak.message.contains("members.homeAddress"),
        "the error must name the field: {}",
        leak.message
    );

    // The subtler case: nothing marked private, but nothing marked public either.
    let build = fixture("unpublished-collection.json");
    assert!(build
        .errors()
        .any(|d| d.code == "prove.exposure.not-public" && d.node.as_deref() == Some("row")));
}

#[test]
fn the_exposure_set_is_per_route_and_diffable() {
    let source = fs::read_to_string(repo_root().join("corpus/sites/blog.json")).unwrap();
    let build = compile_str(&source, &Options::full());
    let exposure = &build.exposure;

    assert!(exposure.routes["/"].contains(&"posts.title".to_string()));
    assert!(
        exposure.routes["/about"].is_empty(),
        "a route that binds nothing exposes nothing"
    );
    assert!(
        !exposure.routes["/"].contains(&"posts.authorEmail".to_string()),
        "a field the page does not render is not exposed by it"
    );

    // A newly rendered field is a widening, named by route and field; an unchanged set is not.
    let mut previous = exposure.clone();
    previous
        .routes
        .get_mut("/")
        .unwrap()
        .retain(|f| f != "posts.excerpt");
    let widened = exposure.widened_since(&previous);
    assert_eq!(
        widened,
        vec![("/".to_string(), "posts.excerpt".to_string())]
    );
    assert!(exposure.widened_since(exposure).is_empty());
}

#[test]
fn contrast_ratio_matches_wcag_reference_values() {
    let white_on_black = lattice_compiler::prove::contrast_ratio("#ffffff", "#000000").unwrap();
    assert!((white_on_black - 21.0).abs() < 1e-6);
    let same = lattice_compiler::prove::contrast_ratio("#1d4ed8", "#1d4ed8").unwrap();
    assert!((same - 1.0).abs() < 1e-9);
}
