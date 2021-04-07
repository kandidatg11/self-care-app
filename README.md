# Behaviour Activation

## Code style

These are only guidelines, and may be ignored if appropriate.

* Use 2 spaces for indentation.
* Use UNIX line endings ([vscode](https://stackoverflow.com/a/48694365),
  [atom](https://stackoverflow.com/a/48686409)).
* Use `const` for constants and `let` for variables. Never use `var`.
* Use Hooks instead of classes.
* Avoid the `any` type whenever possible.
* Write documentation using [TSDoc](https://tsdoc.org/).
* Exported functions must have typing and documentation.

Defining functions

```TypeScript
// preferred
const f = (a: number, b: number): number => {
    return a + b;
}

// avoid
function f(a: number, b: number): number {
    return a + b;
}
```