# markdown-to-html (Rust implementation)

Rust application serving an endpoint that transforms markdown into HTML.

## Usage

- `cargo run` to download dependencies and run locally

We could try this out with `curl` or a tool like Postman, but lets do a regular `fetch` request in the browser instead to simulate how a client might interact with it in the browser.

Navigate to http://localhost:3000, open the devtools in your browser, paste this in the console and execute:

```javascript
fetch('http://localhost:3000/markdown-to-html', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ markdown: '# Hello world' }),
})
  .then((response) => response.json())
  .then((data) => console.log(data));
```

You should see this as your response:

```ascii
{html: "<h1>Hello world</h1>↵"}
```

## Development

The development loop is make edits > `cargo-run`, that's it.

## Tools

If you're using [rust-analyzer](https://github.com/rust-analyzer/rust-analyzer) in [VSCode](https://code.visualstudio.com), you can use these settings to get it to work:

```json
{
  "rust-analyzer.files.excludeDirs": ["node", "benchmark"],
  "rust-analyzer.linkedProjects": ["rust/Cargo.toml"]
}
```

## Test

TBD

## Benchmark

See instructions in the [root README](../README.md).
