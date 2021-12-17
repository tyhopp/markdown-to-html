# markdown-to-html (Node implementation)

Node application serving an endpoint that transforms markdown into HTML.

## Usage

- `npm install` to install Node dependencies
- `npm run build` to compile the TypeScript to JavaScript
- `npm run serve` to serve the project locally at http://localhost:3000

We could try this out with `curl` or a tool like Postman, but lets do a regular `fetch` request in the browser instead to simulate how a client might interact with it in the browser.

Navigate to http://localhost:3000, open the devtools in your browser, paste this in the console and execute:

```javascript
fetch('http://localhost:3000/markdown-to-html', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ markdown: '# Hello world' })
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
- `services` subdirectory contains the logic used in endpoints (similar to _controllers_ in Express)
- `types` subdirectory contains shared TypeScript types
- `app.ts` file contains the HTTP server and (for now) route handling

I chose this structure to strike a balance between laying a solid foundation and avoiding premature optimization (like adopting the full routing middleware, model, etc. convention often seen in Express). It should be reevaluated if there is further development.

## Test

Tests use [`uvu`](https://github.com/lukeed/uvu) as a runner and [`supertest`](https://github.com/visionmedia/supertest) to test Node http servers.

Make sure the server is not running and use `npm run test` from the project root to execute tests.

There is no watch mode implmented yet since `uvu` takes a modular approach (does not bundle file watching in to the core module) and I didn't add that in the interest of time for this project. It should be fairly trivial to add (famous last words) if this project was to have further development. The author has [a watch example implementation](https://github.com/lukeed/uvu/tree/master/examples/watch).

## Benchmark

See instructions in the [root README](../README.md).
