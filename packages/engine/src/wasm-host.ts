/**
 * Stage B4 — the JS side of "one binary, two hosts".
 *
 * The editor never renders HTML itself. It hands the document to the same compiler the CLI runs,
 * built for wasm32, and gets the exact bytes that would ship. That is what makes "what you see is
 * what ships" a mechanical property instead of an aspiration.
 *
 * The ABI is raw (see crates/compiler-wasm/src/lib.rs), so there is no bindgen runtime here and
 * nothing to keep in version lockstep — just `WebAssembly.instantiate` and a length prefix.
 */

export interface CompileRequest {
  document: string;
  data?: string | null;
  /** `fast` is the editor's live-preview profile: same passes, cheaper measurement. */
  profile?: 'full' | 'fast';
  emit_app?: boolean;
}

export interface CompileDiagnostic {
  severity: 'error' | 'warning';
  code: string;
  message: string;
  node: string | null;
  route: string | null;
}

export interface CompileResult {
  ok: boolean;
  files: Record<string, string>;
  diagnostics: CompileDiagnostic[];
  route_bytes: Record<string, { html: number; css: number; js: number }>;
  route_deps: Record<string, string[]>;
}

interface Exports {
  memory: WebAssembly.Memory;
  lattice_alloc(len: number): number;
  lattice_free(ptr: number, len: number): void;
  lattice_compile(ptr: number, len: number): number;
  lattice_free_result(ptr: number): void;
  lattice_schema_version(): number;
}

export class LatticeCompiler {
  #exports: Exports;

  private constructor(exports: Exports) {
    this.#exports = exports;
  }

  /** Instantiate from raw wasm bytes (fetched, bundled, or read from disk in Node). */
  static async fromBytes(bytes: BufferSource): Promise<LatticeCompiler> {
    const { instance } = await WebAssembly.instantiate(bytes, {});
    return new LatticeCompiler(instance.exports as unknown as Exports);
  }

  /** The schema version the binary speaks. A mismatch with the document is a bug, not a warning. */
  schemaVersion(): string {
    const ptr = this.#exports.lattice_schema_version();
    const value = this.#readResult(ptr);
    this.#exports.lattice_free_result(ptr);
    return value;
  }

  compile(request: CompileRequest): CompileResult {
    const encoded = new TextEncoder().encode(JSON.stringify(request));
    const inPtr = this.#exports.lattice_alloc(encoded.length);
    new Uint8Array(this.#exports.memory.buffer, inPtr, encoded.length).set(encoded);
    const outPtr = this.#exports.lattice_compile(inPtr, encoded.length);
    try {
      return JSON.parse(this.#readResult(outPtr)) as CompileResult;
    } finally {
      this.#exports.lattice_free(inPtr, encoded.length);
      this.#exports.lattice_free_result(outPtr);
    }
  }

  #readResult(ptr: number): string {
    // The memory object is re-read on every access: a wasm allocation can grow memory, which
    // detaches any ArrayBuffer view taken before the call.
    const view = new DataView(this.#exports.memory.buffer);
    const length = view.getUint32(ptr, true);
    const bytes = new Uint8Array(this.#exports.memory.buffer, ptr + 4, length);
    return new TextDecoder().decode(bytes);
  }
}

/** Node convenience: load the wasm the cargo build produced. */
export async function loadCompiler(wasmPath: string): Promise<LatticeCompiler> {
  const { readFile } = await import('node:fs/promises');
  return LatticeCompiler.fromBytes(await readFile(wasmPath));
}

/** Where `cargo build --target wasm32-unknown-unknown --release` puts it. */
export const DEFAULT_WASM_PATH = 'target/wasm32-unknown-unknown/release/lattice_compiler_wasm.wasm';
