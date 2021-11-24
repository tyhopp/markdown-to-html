import createServer, { IPureHttpServer } from 'pure-http';
import { parseBody } from './lib/parse-body.js';
import { parseJSON } from './lib/parse-json.js';
import { PureHttpRequest, PureHttpResponse } from './types/pure-http.js';

const app: IPureHttpServer = createServer();

// TODO - Confirm CORS/access control requirements
// TODO - Allow different port via process.env
// TODO - Handle 405

app.post('/markdown-to-html', async (request: PureHttpRequest, response: PureHttpResponse) => {
  let body = await parseBody(request, response);
  let json = await parseJSON(body, response);
  // TODO - Validate input
  // TODO - Transform markdown
  // TODO - Sanitize HTML
  let html = { html: '<h1>Hello, world!</h1>' }; // Stub for now
  response.json(html, false, 200);
});

app.listen(3000);

console.log('Listening on http://localhost:3000');

export { app };
