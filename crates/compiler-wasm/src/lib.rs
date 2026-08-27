//! Stage B4 — one binary, two hosts.
//!
//! The editor must not have its own renderer. This crate is a facade over `lattice-compiler` with
//! no logic of its own: the canvas asks it to compile the document it is editing and gets back the
//! exact bytes `lattice build` would write. CI compiles the corpus through both hosts and diffs.
//!
//! The ABI is deliberately raw — a length-prefixed byte buffer over `wasm32-unknown-unknown` — so
//! there is no bindgen toolchain between the compiler and the browser, nothing to install, and
//! nothing that can be a different version on someone's machine. `packages/engine/src/wasm-host.ts`
//! is the whole JS side.
//!
//! Protocol:
//!   `lattice_alloc(len) -> ptr`                   host writes UTF-8 JSON at ptr
//!   `lattice_compile(ptr, len) -> ptr`            returns ptr to [u32 length][JSON bytes]
//!   `lattice_free(ptr, len)`                      release an input buffer
//!   `lattice_free_result(ptr)`                    release a result buffer

use lattice_compiler::{compile_str_with_data, Options, Profile, Severity};
use std::collections::BTreeMap;

/// Input envelope: `{ "document": "<ir json>", "data": "<records json|null>", "profile": "full|fast" }`
#[derive(serde::Deserialize)]
struct Request {
    document: String,
    #[serde(default)]
    data: Option<String>,
    #[serde(default)]
    profile: Option<String>,
    #[serde(default)]
    emit_app: Option<bool>,
}

#[derive(serde::Serialize)]
struct Response {
    ok: bool,
    files: BTreeMap<String, String>,
    diagnostics: Vec<Diag>,
    route_bytes: BTreeMap<String, RouteBytes>,
    route_deps: BTreeMap<String, Vec<String>>,
}

#[derive(serde::Serialize)]
struct Diag {
    severity: &'static str,
    code: String,
    message: String,
    node: Option<String>,
    route: Option<String>,
}

#[derive(serde::Serialize)]
struct RouteBytes {
    html: usize,
    css: usize,
    js: usize,
}

/// The whole facade, host-independent so the native tests can exercise the same path the browser
/// takes. Files are UTF-8 strings: the compiler emits text today, and a binary asset pipeline
/// (Stage D/F) will carry its own transport rather than widening this.
pub fn compile_request(input: &str) -> String {
    let request: Request = match serde_json::from_str(input) {
        Ok(r) => r,
        Err(e) => {
            return serde_json::to_string(&Response {
                ok: false,
                files: BTreeMap::new(),
                diagnostics: vec![Diag {
                    severity: "error",
                    code: "wasm.request".into(),
                    message: format!("malformed compile request: {e}"),
                    node: None,
                    route: None,
                }],
                route_bytes: BTreeMap::new(),
                route_deps: BTreeMap::new(),
            })
            .unwrap_or_default()
        }
    };

    let opts = Options {
        profile: if request.profile.as_deref() == Some("fast") {
            Profile::Fast
        } else {
            Profile::Full
        },
        emit_app: request.emit_app.unwrap_or(false),
    };
    let build = compile_str_with_data(&request.document, request.data.as_deref(), &opts);

    let response = Response {
        ok: build.ok(),
        files: build
            .files
            .iter()
            .map(|(path, bytes)| (path.clone(), String::from_utf8_lossy(bytes).to_string()))
            .collect(),
        diagnostics: build
            .diagnostics
            .iter()
            .map(|d| Diag {
                severity: if d.severity == Severity::Error {
                    "error"
                } else {
                    "warning"
                },
                code: d.code.clone(),
                message: d.message.clone(),
                node: d.node.clone(),
                route: d.route.clone(),
            })
            .collect(),
        route_bytes: build
            .route_bytes
            .iter()
            .map(|(route, b)| {
                (
                    route.clone(),
                    RouteBytes {
                        html: b.html,
                        css: b.css,
                        js: b.js,
                    },
                )
            })
            .collect(),
        route_deps: build.route_deps.clone(),
    };
    serde_json::to_string(&response).unwrap_or_default()
}

// --- raw ABI -----------------------------------------------------------------------------------

#[no_mangle]
pub extern "C" fn lattice_alloc(len: usize) -> *mut u8 {
    let mut buf = Vec::with_capacity(len);
    let ptr = buf.as_mut_ptr();
    std::mem::forget(buf);
    ptr
}

/// # Safety
/// `ptr`/`len` must come from a previous [`lattice_alloc`] call with the same length.
#[no_mangle]
pub unsafe extern "C" fn lattice_free(ptr: *mut u8, len: usize) {
    if !ptr.is_null() {
        drop(Vec::from_raw_parts(ptr, 0, len));
    }
}

/// # Safety
/// `ptr`/`len` must describe a UTF-8 request buffer the host wrote after [`lattice_alloc`].
#[no_mangle]
pub unsafe extern "C" fn lattice_compile(ptr: *const u8, len: usize) -> *mut u8 {
    let input = std::slice::from_raw_parts(ptr, len);
    let request = std::str::from_utf8(input).unwrap_or("");
    let response = compile_request(request);
    let bytes = response.into_bytes();

    // [u32 little-endian length][payload]; the host reads the length, then the payload.
    let mut out = Vec::with_capacity(4 + bytes.len());
    out.extend_from_slice(&(bytes.len() as u32).to_le_bytes());
    out.extend_from_slice(&bytes);
    let ptr = out.as_mut_ptr();
    std::mem::forget(out);
    ptr
}

/// # Safety
/// `ptr` must be a result buffer returned by [`lattice_compile`] and not yet freed.
#[no_mangle]
pub unsafe extern "C" fn lattice_free_result(ptr: *mut u8) {
    if ptr.is_null() {
        return;
    }
    let mut len_bytes = [0u8; 4];
    len_bytes.copy_from_slice(std::slice::from_raw_parts(ptr, 4));
    let len = u32::from_le_bytes(len_bytes) as usize;
    drop(Vec::from_raw_parts(ptr, 4 + len, 4 + len));
}

/// The schema version this binary speaks; the host checks it before trusting a build.
#[no_mangle]
pub extern "C" fn lattice_schema_version() -> *mut u8 {
    let bytes = lattice_compiler::ir::SCHEMA_VERSION.as_bytes();
    let mut out = Vec::with_capacity(4 + bytes.len());
    out.extend_from_slice(&(bytes.len() as u32).to_le_bytes());
    out.extend_from_slice(bytes);
    let ptr = out.as_mut_ptr();
    std::mem::forget(out);
    ptr
}
