# markdown-to-html

Web server that transforms markdown into HTML. It has two implementations: in [Node](./node/README.md) and in [Rust](./rust/README.md).

The Node implementation was originally built for some other purpose and not intended for production. Since I'm learning Rust I thought I'd also implement it in Rust to compare benchmarks, especially number of requests per second.

## Usage

See respective [Node](./node/README.md) and [Rust](./rust/README.md) READMEs for usage.

## Benchmark

Benchmarking is done with [ApacheBench](https://httpd.apache.org/docs/2.4/programs/ab.html), which is built into macOS and [can be installed on Windows systems](https://httpd.apache.org/docs/2.4/platform/win_compiling.html).

To execute the benchmark:

- Make sure one of the servers (Node or Rust) is running at `http://localhost:3000`
- In the benchmark directory, run `bash benchmark.sh`