import createServer, { IPureHttpServer } from 'pure-http';
import { PureHttpRequest, PureHttpResponse } from './types/pure-http.js';
import { markdownToHtml } from './services/markdown-to-html.js';

const app: IPureHttpServer = createServer();

// TODO - Confirm CORS/access control requirements
// TODO - Allow different port via process.env
// TODO - Handle 405

app.post('/markdown-to-html', async (request: PureHttpRequest, response: PureHttpResponse) =>
  markdownToHtml(request, response)
);

app.listen(3000);

console.log('Listening on http://localhost:3000');

export { app };
