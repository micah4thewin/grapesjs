//! Fixed float formatting. Determinism rule 3 (`docs/lattice/determinism.md`): every number that
//! reaches an output file goes through here, so `16` and `16.0` can never both appear depending on
//! how a token happened to be authored.

/// Format a length in CSS pixels: at most three decimals, no trailing zeros, no `-0`.
pub fn px(value: f64) -> String {
    let mut s = format!("{:.3}", value);
    if s.contains('.') {
        s = s.trim_end_matches('0').trim_end_matches('.').to_string();
    }
    if s == "-0" {
        s = "0".to_string();
    }
    s
}

/// Format a unitless ratio (line heights, contrast ratios) the same way.
pub fn ratio(value: f64) -> String {
    px(value)
}

/// Token names become class-name segments; keep that mapping total and stable.
pub fn slug(token_ref: &str) -> String {
    token_ref.replace('.', "-")
}
