/**
 * Schema validation, driven by the schema file itself.
 *
 * A hand-written validator would be a second, drifting definition of the IR. This one reads
 * `schema/lattice-ir.schema.json` at runtime and covers exactly the JSON Schema subset the IR uses;
 * anything outside that subset throws rather than silently passing.
 *
 * Errors are addressed by JSON pointer *and*, wherever the failure is inside the node table, by
 * node id — because "invalid document" is not something an author can act on and
 * "node hero-title: level must be <= 6" is.
 */

export interface ValidationError {
  /** JSON pointer to the offending value, e.g. `/nodes/hero/level`. */
  path: string;
  message: string;
  /** The IR node the author has to look at, when the failure is inside one. */
  node?: string;
}

type Schema = Record<string, any>;

export class Validator {
  #schema: Schema;
  #defs: Record<string, Schema>;

  constructor(schema: Schema) {
    this.#schema = schema;
    this.#defs = schema.$defs ?? {};
  }

  validate(value: unknown): ValidationError[] {
    const errors: ValidationError[] = [];
    this.#check(value, this.#schema, '', errors);
    return errors;
  }

  #resolve(schema: Schema): Schema {
    if (!schema.$ref) return schema;
    const match = /^#\/\$defs\/(\w+)$/.exec(schema.$ref);
    if (!match) throw new Error(`unsupported $ref: ${schema.$ref}`);
    const target = this.#defs[match[1]];
    if (!target) throw new Error(`unknown $ref target: ${schema.$ref}`);
    return target;
  }

  #nodeIdFor(path: string): string | undefined {
    const match = /^\/nodes\/([^/]+)/.exec(path);
    return match ? decodeURIComponent(match[1]) : undefined;
  }

  #fail(errors: ValidationError[], path: string, message: string) {
    errors.push({ path: path || '/', message, node: this.#nodeIdFor(path) });
  }

  #check(value: unknown, rawSchema: Schema, path: string, errors: ValidationError[]) {
    const schema = this.#resolve(rawSchema);

    if (schema.const !== undefined && value !== schema.const) {
      this.#fail(errors, path, `must be ${JSON.stringify(schema.const)}`);
      return;
    }
    if (schema.enum && !schema.enum.includes(value as never)) {
      this.#fail(errors, path, `must be one of ${schema.enum.map((v: unknown) => JSON.stringify(v)).join(', ')}`);
      return;
    }

    switch (schema.type) {
      case 'object':
        this.#checkObject(value, schema, path, errors);
        break;
      case 'array':
        this.#checkArray(value, schema, path, errors);
        break;
      case 'string':
        this.#checkString(value, schema, path, errors);
        break;
      case 'number':
      case 'integer':
        this.#checkNumber(value, schema, path, errors);
        break;
      case 'boolean':
        if (typeof value !== 'boolean') this.#fail(errors, path, 'must be a boolean');
        break;
      case undefined:
        break;
      default:
        throw new Error(`unsupported schema type: ${schema.type}`);
    }
  }

  #checkObject(value: unknown, schema: Schema, path: string, errors: ValidationError[]) {
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
      this.#fail(errors, path, 'must be an object');
      return;
    }
    const record = value as Record<string, unknown>;
    for (const key of schema.required ?? []) {
      if (!(key in record)) this.#fail(errors, `${path}/${key}`, `required property ${key} is missing`);
    }
    for (const [key, child] of Object.entries(record)) {
      const childPath = `${path}/${key.replace(/~/g, '~0').replace(/\//g, '~1')}`;
      const propertySchema = schema.properties?.[key];
      if (propertySchema) {
        this.#check(child, propertySchema, childPath, errors);
        continue;
      }
      if (schema.additionalProperties === false) {
        this.#fail(errors, childPath, `unknown property ${key}`);
        continue;
      }
      if (typeof schema.additionalProperties === 'object') {
        this.#check(child, schema.additionalProperties, childPath, errors);
      }
    }
  }

  #checkArray(value: unknown, schema: Schema, path: string, errors: ValidationError[]) {
    if (!Array.isArray(value)) {
      this.#fail(errors, path, 'must be an array');
      return;
    }
    if (schema.minItems !== undefined && value.length < schema.minItems) {
      this.#fail(errors, path, `must have at least ${schema.minItems} item(s)`);
    }
    value.forEach((item, index) => this.#check(item, schema.items, `${path}/${index}`, errors));
  }

  #checkString(value: unknown, schema: Schema, path: string, errors: ValidationError[]) {
    if (typeof value !== 'string') {
      this.#fail(errors, path, 'must be a string');
      return;
    }
    if (schema.minLength !== undefined && value.length < schema.minLength) {
      this.#fail(errors, path, `must not be empty`);
    }
    if (schema.pattern && !new RegExp(schema.pattern, 'u').test(value)) {
      this.#fail(errors, path, `${JSON.stringify(value)} does not match ${schema.pattern}`);
    }
  }

  #checkNumber(value: unknown, schema: Schema, path: string, errors: ValidationError[]) {
    if (typeof value !== 'number' || Number.isNaN(value)) {
      this.#fail(errors, path, 'must be a number');
      return;
    }
    if (schema.type === 'integer' && !Number.isInteger(value)) this.#fail(errors, path, 'must be an integer');
    if (schema.minimum !== undefined && value < schema.minimum)
      this.#fail(errors, path, `must be >= ${schema.minimum}`);
    if (schema.maximum !== undefined && value > schema.maximum)
      this.#fail(errors, path, `must be <= ${schema.maximum}`);
  }
}

let cached: Validator | undefined;

/** The validator for the bundled schema. Loaded once; the schema never changes at runtime. */
export async function schemaValidator(): Promise<Validator> {
  if (cached) return cached;
  const { readFile } = await import('node:fs/promises');
  const { fileURLToPath } = await import('node:url');
  const url = new URL('../schema/lattice-ir.schema.json', import.meta.url);
  cached = new Validator(JSON.parse(await readFile(fileURLToPath(url), 'utf8')));
  return cached;
}

export function formatErrors(errors: ValidationError[]): string {
  return errors
    .map((e) => (e.node ? `node ${e.node}: ${e.message} (${e.path})` : `${e.path}: ${e.message}`))
    .join('\n');
}
