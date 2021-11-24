import { PureHttpRequest, PureHttpResponse } from '../types/pure-http.js';
import { ResponseErrorMessage, ResponseErrorStatus } from '../types/index.js';

/**
 * Parse the body of the request by concatenating chunks of the stream.
 * Will return a response with error reason on failure.
 */
async function parseBody(request: PureHttpRequest, response: PureHttpResponse): Promise<string> {
  try {
    const buffers: Buffer[] = [];

    for await (const chunk of request) {
      buffers.push(chunk);
    }

    return Buffer.concat(buffers).toString();
  } catch (error) {
    console.error(error);
    response.json({ reason: ResponseErrorMessage.parseBody }, false, ResponseErrorStatus.parseBody);
    return '';
  }
}

export { parseBody };
