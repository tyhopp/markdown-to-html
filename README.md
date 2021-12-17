# markdown-to-html

API that transforms markdown into HTML. It has implementations in [Rust](./rust/README.md) and [Node](./node/README.md).

The goal is to compare the performance of a typical endpoint in each language. The benchmark should be read as a ballpark figure rather than a rigorous test.

Key results:

- **Node** implementation can handle roughly **0.9k to 1k requests per second**
- **Rust** implementation can handle roughly **13k to 14k requests per second**

Things to consider:

- The underlying libraries used are entirely different
- Only one benchmarking tool was used on a single local machine
- I am more familiar with Node than Rust

## Usage

See respective [Rust](./rust/README.md) and [Node](./node/README.md) READMEs for usage.

## Benchmark

Benchmarking is done with [ApacheBench](https://httpd.apache.org/docs/2.4/programs/ab.html), which is built into macOS and [can be installed on Windows systems](https://httpd.apache.org/docs/2.4/platform/win_compiling.html).

To execute the benchmark, see instructions in the [Rust](./rust/README.md) and [Node](./node/README.md) READMEs. Generally you will:

- Make sure one of the servers (Node or Rust) is running at `http://localhost:3000`
- In the benchmark directory, run `bash benchmark.sh`
