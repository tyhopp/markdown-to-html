import { PureHttpResponse } from '../types/pure-http.js';
import { ResponseErrorMessage, ResponseErrorStatus } from '../types/index.js';

/**
 * Parse JSON and return a response with error reason on failure.
 */
async function parseJSON(json: string, response: PureHttpResponse): Promise<Record<symbol, any> | void> {
  try {
    return JSON.parse(json);
  } catch (error) {
    console.error(error);
    response.json({ reason: ResponseErrorMessage.parseJSON }, false, ResponseErrorStatus.parseJSON);
  }
}

export { parseJSON };
