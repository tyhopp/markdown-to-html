import { parseBody } from '../lib/parse-body.js';
import { parseJSON } from '../lib/parse-json.js';
import { ResponseErrorStatus, ResponseErrorMessage } from '../types/index.js';
import { PureHttpRequest, PureHttpResponse } from '../types/pure-http.js';
import { z } from 'zod';

/**
 * Transforms markdown and returns HTML.
 */
async function markdownToHtml(request: PureHttpRequest, response: PureHttpResponse): Promise<void> {
  let body = await parseBody(request, response);
  let json = await parseJSON(body, response);

  const inputSchema = z.object({
    markdown: z.string({
      required_error: 'markdown property is required',
      invalid_type_error: 'markdown property must be a string'
    })
  });

  let parsedMarkdown: string = '';

  try {
    const result = await inputSchema.safeParseAsync(json);
    if (!result.success || typeof result.data.markdown !== 'string') {
      response.json({ reason: ResponseErrorMessage.validateInput }, false, ResponseErrorStatus.validateInput);
      return;
    }
    parsedMarkdown = result.data.markdown;
  } catch (error) {
    console.error(error);
    response.json({ reason: ResponseErrorMessage.validateInput }, false, ResponseErrorStatus.validateInput);
  }

  // TODO - Transform markdown
  // TODO - Sanitize HTML

  let html = { html: '<h1>Hello, world!</h1>' }; // Stub for now
  response.json(html, false, 200);
}

export { markdownToHtml };
