# markdown-to-html

Node application serving an endpoint that transforms markdown into HTML.
## Usage

- `git clone git@github.com:tyhopp/markdown-to-html.git` to clone the project locally
- `cd markdown-to-html && npm install` to navigate to the project and install Node dependencies
- `npm run build` to compile the TypeScript to JavaScript
- `npm run serve` to serve the project locally at http://localhost:3000

We could try this out with `curl` or a tool like Postman, but lets do a regular `fetch` request in the browser instead to simulate how a client might interact with it in the browser.

Navigate to http://localhost:3000, open the devtools in your browser, paste this in the console and execute:

```javascript
fetch('http://localhost:3000/markdown-to-html', {
  method: 'POST',
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

To continue development on the project, run `npm run dev` to start the TypeScript compiler in watch mode. This will watch any changes you make and compile them to JavaScript in the `dist` directory.

At present the project is structured in the `src` directory in this way:

- `lib` subdirectory contains generic functions that could be used in any service
- `services` subdirectory contains the logic used in endpoints (similar to *controllers* in Express)
- `types` subdirectory contains shared TypeScript types
- `app.ts` file contains the HTTP server and (for now) route handling

I chose this structure to strike a balance between laying a solid foundation and avoiding premature optimization (like adopting the full routing middleware, model, etc. convention often seen in Express). It should be reevaluated if there is further development.

## Test

Tests use [`uvu`](https://github.com/lukeed/uvu) as a runner and [`supertest`](https://github.com/visionmedia/supertest) to test Node http servers.

Run `npm run test` from the project root to execute tests.

There is no watch mode implmented yet since `uvu` takes a modular approach (does not bundle file watching in to the core module) and I didn't add that in the interest of time for this project. It should be fairly trivial to add (famous last words) if this project was to have further development. The author has [a watch example implementation](https://github.com/lukeed/uvu/tree/master/examples/watch).

## Benchmark

Benchmarking is done with [ApacheBench](https://httpd.apache.org/docs/2.4/programs/ab.html), which is built into macOS and [can be installed on Windows systems](https://httpd.apache.org/docs/2.4/platform/win_compiling.html).

To execute the benchmark, first make sure the server is running with `npm run serve`. Then, navigate to the benchmark subdirectory (`cd benchmark`) and run `bash benchmark.sh`. The output should look something like this:

```ascii
This is ApacheBench, Version 2.3 <$Revision: 1879490 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking localhost (be patient).....done


Server Software:        
Server Hostname:        localhost
Server Port:            3000

Document Path:          /markdown-to-html
Document Length:        542 bytes

Concurrency Level:      20
Time taken for tests:   0.107 seconds
Complete requests:      100
Failed requests:        0
Total transferred:      72800 bytes
Total body sent:        50800
HTML transferred:       54200 bytes
Requests per second:    938.16 [#/sec] (mean)
Time per request:       21.318 [ms] (mean)
Time per request:       1.066 [ms] (mean, across all concurrent requests)
Transfer rate:          666.97 [Kbytes/sec] received
                        465.41 kb/s sent
                        1132.38 kb/s total

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    1   0.4      1       1
Processing:     3   18   5.8     17      29
Waiting:        2   13   5.4     12      28
Total:          4   19   5.6     18      30

Percentage of the requests served within a certain time (ms)
  50%     18
  66%     21
  75%     21
  80%     26
  90%     26
  95%     26
  98%     30
  99%     30
 100%     30 (longest request)
```