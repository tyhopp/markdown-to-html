# markdown-to-html (Rust implementation)

Rust application serving an endpoint that transforms markdown into HTML.

## Usage

- `cargo run` to download dependencies and run the server locally
- Navigate to http://localhost:3000
- Open the devtools in your browser
- Paste this in the console and execute:

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

The development loop is to make edits and execute `cargo run`.

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

- In the `rust` directory, execute `cargo run --release` to use the Rust profile optimized for releases
- In the `benchmark` directory, execute `bash benchmark.sh` to see benchmark output from ApacheBench
