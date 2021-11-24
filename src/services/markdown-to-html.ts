import { parseBody } from '../lib/parse-body.js';
import { parseJSON } from '../lib/parse-json.js';
import { ResponseErrorStatus, ResponseErrorMessage } from '../types/index.js';
import { PureHttpRequest, PureHttpResponse } from '../types/pure-http.js';
import { z } from 'zod';
import { marked } from 'marked';

/**
 * Transforms markdown and returns HTML.
 */
async function markdownToHtml(request: PureHttpRequest, response: PureHttpResponse): Promise<void> {
  let body = await parseBody(request, response);
  let json = await parseJSON(body, response);

  // Construct schema for validation
  const inputSchema = z.object({
    markdown: z.string({
      required_error: 'markdown property is required',
      invalid_type_error: 'markdown property must be a string'
    })
  });

  try {
    // Validate markdown input
    const result = await inputSchema.safeParseAsync(json);

    if (!result.success || typeof result.data.markdown !== 'string') {
      response.json({ reason: ResponseErrorMessage.validateInput }, false, ResponseErrorStatus.validateInput);
      return;
    }

    const { markdown = '' } = result.data || {};

    // Transform markdown into HTML
    const html = marked.parse(markdown);

    // TODO - Sanitize output HTML

    response.json({ html }, false, 200);
  } catch (error) {
    console.error(error);
    response.json({ reason: ResponseErrorMessage.validateInput }, false, ResponseErrorStatus.validateInput);
  }
}

export { markdownToHtml };
