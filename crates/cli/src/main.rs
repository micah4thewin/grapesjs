//! `lattice` — build, check, dev.
//!
//! The export path gets daily human use from here forward: everything the editor will eventually
//! do to publish a site, this does today from a terminal, against the same compiler.

use lattice_compiler::{budget, Options, Severity};
use std::collections::BTreeMap;
use std::fs;
use std::io::{Read, Write};
use std::net::{TcpListener, TcpStream};
use std::path::{Path, PathBuf};
use std::process::ExitCode;

const USAGE: &str = "\
lattice — the Lattice compiler CLI

USAGE:
    lattice build [SITE...] [--out DIR]   compile IR to a runnable static export
    lattice check [SITE...]               run every pass, emit nothing, report diagnostics
    lattice dev [SITE] [--port N]         build, serve, and rebuild on change

    SITE is a path to a .json IR document, or a directory of them.
    With no SITE, every site under ./corpus/sites is used.

OPTIONS:
    --out DIR     output directory (default: dist/<site id>)
    --port N      dev server port (default 8080)
    --quiet       only print errors
";

fn main() -> ExitCode {
    let args: Vec<String> = std::env::args().skip(1).collect();
    let command = args.first().map(String::as_str).unwrap_or("help");
    let rest: Vec<String> = args.iter().skip(1).cloned().collect();

    match command {
        "build" => run_build(&rest, true),
        "check" => run_build(&rest, false),
        "dev" => run_dev(&rest),
        "help" | "--help" | "-h" => {
            print!("{USAGE}");
            ExitCode::SUCCESS
        }
        other => {
            eprintln!("unknown command {other:?}\n\n{USAGE}");
            ExitCode::FAILURE
        }
    }
}

struct Flags {
    out: Option<PathBuf>,
    port: u16,
    quiet: bool,
    sites: Vec<PathBuf>,
}

fn parse_flags(args: &[String]) -> Flags {
    let mut flags = Flags {
        out: None,
        port: 8080,
        quiet: false,
        sites: Vec::new(),
    };
    let mut i = 0;
    while i < args.len() {
        match args[i].as_str() {
            "--out" => {
                flags.out = args.get(i + 1).map(PathBuf::from);
                i += 2;
            }
            "--port" => {
                flags.port = args.get(i + 1).and_then(|p| p.parse().ok()).unwrap_or(8080);
                i += 2;
            }
            "--quiet" => {
                flags.quiet = true;
                i += 1;
            }
            "--corpus" => {
                i += 1;
            }
            other => {
                flags.sites.push(PathBuf::from(other));
                i += 1;
            }
        }
    }
    if flags.sites.is_empty() {
        flags.sites.push(PathBuf::from("corpus/sites"));
    }
    flags
}

fn expand_sites(paths: &[PathBuf]) -> Vec<PathBuf> {
    let mut out = Vec::new();
    for path in paths {
        if path.is_dir() {
            let mut entries: Vec<PathBuf> = fs::read_dir(path)
                .map(|dir| {
                    dir.filter_map(Result::ok)
                        .map(|e| e.path())
                        .filter(|p| p.extension().map(|e| e == "json").unwrap_or(false))
                        .filter(|p| !p.to_string_lossy().ends_with(".data.json"))
                        .collect()
                })
                .unwrap_or_default();
            // Sorted: the order sites build in must not depend on the filesystem.
            entries.sort();
            out.extend(entries);
        } else {
            out.push(path.clone());
        }
    }
    out
}

fn data_path(site: &Path) -> PathBuf {
    site.with_extension("data.json")
}

fn compile_site(site: &Path, emit_app: bool) -> Result<lattice_compiler::Build, String> {
    let source = fs::read_to_string(site).map_err(|e| format!("{}: {e}", site.display()))?;
    let data = fs::read_to_string(data_path(site)).ok();
    let opts = Options {
        profile: lattice_compiler::Profile::Full,
        emit_app,
    };
    Ok(lattice_compiler::compile_str_with_data(
        &source,
        data.as_deref(),
        &opts,
    ))
}

fn report(site: &Path, build: &lattice_compiler::Build, quiet: bool) -> bool {
    let mut ok = true;
    for diagnostic in &build.diagnostics {
        if diagnostic.severity == Severity::Error {
            ok = false;
            eprintln!("{}\n  --> {}\n", diagnostic, site.display());
        } else if !quiet {
            eprintln!("{}\n  --> {}\n", diagnostic, site.display());
        }
    }
    ok
}

fn run_build(args: &[String], emit: bool) -> ExitCode {
    let flags = parse_flags(args);
    let sites = expand_sites(&flags.sites);
    if sites.is_empty() {
        eprintln!("no sites found");
        return ExitCode::FAILURE;
    }

    let mut failed = false;
    for site in &sites {
        let build = match compile_site(site, emit) {
            Ok(b) => b,
            Err(e) => {
                eprintln!("error: {e}");
                failed = true;
                continue;
            }
        };
        if !report(site, &build, flags.quiet) {
            failed = true;
            continue;
        }
        if !emit {
            if !flags.quiet {
                println!(
                    "check {} — {} route(s) ok",
                    site.display(),
                    build.route_bytes.len()
                );
            }
            continue;
        }

        let out = flags
            .out
            .clone()
            .unwrap_or_else(|| PathBuf::from("dist").join(site.file_stem().unwrap_or_default()));
        if let Err(e) = write_build(&out, &build) {
            eprintln!("error: {e}");
            failed = true;
            continue;
        }
        if !flags.quiet {
            let headroom = budget::headroom_summary(&build);
            println!(
                "built {} -> {} ({} file(s)){headroom}",
                site.display(),
                out.display(),
                build.files.len()
            );
        }
    }

    if failed {
        ExitCode::FAILURE
    } else {
        ExitCode::SUCCESS
    }
}

fn write_build(out: &Path, build: &lattice_compiler::Build) -> Result<(), String> {
    // A build directory is replaced, never merged: a stale file from a previous build is a lie
    // about what the site contains.
    if out.exists() {
        fs::remove_dir_all(out).map_err(|e| format!("{}: {e}", out.display()))?;
    }
    for (path, bytes) in &build.files {
        let full = out.join(path);
        if let Some(parent) = full.parent() {
            fs::create_dir_all(parent).map_err(|e| format!("{}: {e}", parent.display()))?;
        }
        fs::write(&full, bytes).map_err(|e| format!("{}: {e}", full.display()))?;
    }
    // The dependency graph Stage F1's incremental rebuild keys off. Deterministic, no timestamps.
    let manifest = manifest_json(build);
    fs::write(out.join(".lattice-manifest.json"), manifest)
        .map_err(|e| format!("{}: {e}", out.display()))?;
    Ok(())
}

fn manifest_json(build: &lattice_compiler::Build) -> String {
    let deps: BTreeMap<&String, &Vec<String>> = build.route_deps.iter().collect();
    let bytes: BTreeMap<&String, serde_json::Value> = build
        .route_bytes
        .iter()
        .map(|(route, b)| {
            (
                route,
                serde_json::json!({ "html": b.html, "css": b.css, "js": b.js }),
            )
        })
        .collect();
    let value = serde_json::json!({ "routeDeps": deps, "routeBytes": bytes });
    format!(
        "{}\n",
        serde_json::to_string_pretty(&value).unwrap_or_default()
    )
}

fn run_dev(args: &[String]) -> ExitCode {
    let flags = parse_flags(args);
    let sites = expand_sites(&flags.sites);
    let Some(site) = sites.first().cloned() else {
        eprintln!("no site found");
        return ExitCode::FAILURE;
    };
    let out = flags
        .out
        .clone()
        .unwrap_or_else(|| PathBuf::from("dist").join(site.file_stem().unwrap_or_default()));

    let rebuild = |site: &Path, out: &Path| match compile_site(site, true) {
        Ok(build) => {
            if report(site, &build, flags.quiet) {
                if let Err(e) = write_build(out, &build) {
                    eprintln!("error: {e}");
                } else {
                    println!("rebuilt {} ({} files)", site.display(), build.files.len());
                }
            }
        }
        Err(e) => eprintln!("error: {e}"),
    };

    rebuild(&site, &out);

    let listener = match TcpListener::bind(("127.0.0.1", flags.port)) {
        Ok(l) => l,
        Err(e) => {
            eprintln!("cannot listen on port {}: {e}", flags.port);
            return ExitCode::FAILURE;
        }
    };
    println!("lattice dev — http://127.0.0.1:{}", flags.port);

    // Poll-based watch: one thread watches mtimes, the main thread serves. No dependencies, and
    // the same rebuild path the CLI uses, so dev never diverges from build.
    let watch_site = site.clone();
    let watch_out = out.clone();
    std::thread::spawn(move || {
        let mut last = modified(&watch_site);
        loop {
            std::thread::sleep(std::time::Duration::from_millis(300));
            let now = modified(&watch_site);
            if now != last {
                last = now;
                match compile_site(&watch_site, true) {
                    Ok(build) => {
                        if build.ok() {
                            let _ = write_build(&watch_out, &build);
                            println!("rebuilt {}", watch_site.display());
                        } else {
                            for d in build.errors() {
                                eprintln!("{d}");
                            }
                        }
                    }
                    Err(e) => eprintln!("error: {e}"),
                }
            }
        }
    });

    for stream in listener.incoming().flatten() {
        serve(stream, &out);
    }
    ExitCode::SUCCESS
}

fn modified(path: &Path) -> Option<std::time::SystemTime> {
    let site = fs::metadata(path).ok()?.modified().ok()?;
    let data = fs::metadata(data_path(path))
        .ok()
        .and_then(|m| m.modified().ok());
    Some(match data {
        Some(d) if d > site => d,
        _ => site,
    })
}

fn serve(mut stream: TcpStream, root: &Path) {
    let mut buf = [0u8; 8192];
    let Ok(read) = stream.read(&mut buf) else {
        return;
    };
    let request = String::from_utf8_lossy(&buf[..read]);
    let path = request.split_whitespace().nth(1).unwrap_or("/");
    let path = path.split('?').next().unwrap_or("/");
    let mut file = root.join(path.trim_start_matches('/'));
    if file.is_dir() || file.extension().is_none() {
        file = file.join("index.html");
    }
    let (status, content_type, body) = match fs::read(&file) {
        Ok(bytes) => ("200 OK", content_type(&file), bytes),
        Err(_) => (
            "404 Not Found",
            "text/html; charset=utf-8",
            b"<h1>not found</h1>".to_vec(),
        ),
    };
    let header = format!(
        "HTTP/1.1 {status}\r\ncontent-type: {content_type}\r\ncontent-length: {}\r\ncache-control: no-store\r\nconnection: close\r\n\r\n",
        body.len()
    );
    let _ = stream.write_all(header.as_bytes());
    let _ = stream.write_all(&body);
}

fn content_type(path: &Path) -> &'static str {
    match path.extension().and_then(|e| e.to_str()) {
        Some("html") => "text/html; charset=utf-8",
        Some("css") => "text/css; charset=utf-8",
        Some("js") => "text/javascript; charset=utf-8",
        Some("json") => "application/json; charset=utf-8",
        Some("svg") => "image/svg+xml",
        Some("png") => "image/png",
        Some("jpg" | "jpeg") => "image/jpeg",
        Some("webp") => "image/webp",
        _ => "application/octet-stream",
    }
}
