//! Diagnostics always name the node. "Something is over budget" is not a build error a person can
//! act on; "route / is 62KB over the HTML budget, largest contributor node `features`" is.

use std::fmt;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Severity {
    Error,
    Warning,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Diagnostic {
    pub severity: Severity,
    /// Pass or rule that produced this, e.g. `typecheck.image.alt`.
    pub code: String,
    pub message: String,
    /// The node the author has to look at, when there is one.
    pub node: Option<String>,
    pub route: Option<String>,
}

impl Diagnostic {
    pub fn error(code: impl Into<String>, message: impl Into<String>) -> Self {
        Diagnostic { severity: Severity::Error, code: code.into(), message: message.into(), node: None, route: None }
    }

    pub fn warning(code: impl Into<String>, message: impl Into<String>) -> Self {
        Diagnostic { severity: Severity::Warning, code: code.into(), message: message.into(), node: None, route: None }
    }

    pub fn at_node(mut self, node: impl Into<String>) -> Self {
        self.node = Some(node.into());
        self
    }

    pub fn at_route(mut self, route: impl Into<String>) -> Self {
        self.route = Some(route.into());
        self
    }
}

impl fmt::Display for Diagnostic {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let kind = match self.severity {
            Severity::Error => "error",
            Severity::Warning => "warning",
        };
        write!(f, "{kind}[{}]: {}", self.code, self.message)?;
        if let Some(node) = &self.node {
            write!(f, "\n  --> node {node}")?;
        }
        if let Some(route) = &self.route {
            write!(f, "\n  --> route {route}")?;
        }
        Ok(())
    }
}
