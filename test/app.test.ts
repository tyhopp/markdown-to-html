import { suite } from 'uvu';
import * as assert from 'uvu/assert';
import request from 'supertest';
import { app as server } from '../src/app.js';

const path = {
  index: '/',
  random: '/random-path',
  markdown: '/markdown-to-html'
};

/**
 * Suites function like `describe` in Jest tests.
 * @see {@link https://github.com/lukeed/uvu/blob/master/examples/suites/tests/math.js}
 */
const app = suite('app');

app('should return 404 for unknown paths', async () => {
  const indexPathResponse = await request(server).get(path.index);
  const randomPathResponse = await request(server).get(path.random);
  assert.is(indexPathResponse.statusCode, 404);
  assert.is(randomPathResponse.statusCode, 404);
});

app.run();

// ---

const markdownEndpoint = suite('markdown-endpoint');

// TODO - In reality unimplemented REST verbs should return 405, update these when that is fixed

markdownEndpoint('should NOT be accessable via a GET request', async () => {
  const response = await request(server).get(path.markdown);
  assert.is(response.statusCode, 404);
});

markdownEndpoint('should NOT be accessable via a PUT request', async () => {
  const response = await request(server).put(path.markdown);
  assert.is(response.statusCode, 404);
});

markdownEndpoint('should NOT be accessable via a PATCH request', async () => {
  const response = await request(server).patch(path.markdown);
  assert.is(response.statusCode, 404);
});

markdownEndpoint('should NOT be accessable via a DELETE request', async () => {
  const response = await request(server).delete(path.markdown);
  assert.is(response.statusCode, 404);
});

markdownEndpoint('should be accessable via a POST request', async () => {
  const response = await request(server)
    .post(path.markdown)
    .set('Accept', 'application/json')
    .send({ markdown: '# Hello world' });
  assert.is(response.statusCode, 200);
});

markdownEndpoint.run();
