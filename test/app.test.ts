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

markdownEndpoint('should be accessable via a POST request with valid input', async () => {
  const response = await request(server)
    .post(path.markdown)
    .set('Accept', 'application/json')
    .send({ markdown: '# Hello world' });
  assert.is(response.statusCode, 200);
});

markdownEndpoint('should be NOT accessable via a POST request with invalid input', async () => {
  const response = await request(server)
    .post(path.markdown)
    .set('Accept', 'application/json')
    .send({ incorrectMarkdownKey: '# Hello world' });
  assert.is(response.statusCode, 400);
});

/**
 * Covered in marked's tests but we'll add one here for redundancy.
 * Consider this an initial integration test, another solution would be to use a tool like Cypress and test the response as nodes in the DOM.
 * @see {@link https://github.com/markedjs/marked/tree/master/test}
 */
markdownEndpoint('should transform all Gruber-standard markdown syntax to valid HTML', async () => {
  const response = await request(server).post(path.markdown).set('Accept', 'application/json').send({
    markdown:
      '# An H1 header\n## An H2 header\n### An H3 Header\nSome **bold** and *italicized* text.\n> A block quote\n1. An\n2. Ordered\n3. List\n- An\n- Unordered\n- List\nSome `inline code`\n---\nA [link](https://tyhopp.com)\nAn ![image of a grapefruit](https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg)'
  });
  assert.is(response.statusCode, 200);
  assert.is(
    response.body.html,
    '<h1>An H1 header</h1>\n<h2>An H2 header</h2>\n<h3>An H3 Header</h3>\n<p>Some <strong>bold</strong> and <em>italicized</em> text.</p>\n<blockquote>\n<p>A block quote</p>\n</blockquote>\n<ol>\n<li>An</li>\n<li>Ordered</li>\n<li>List</li>\n</ol>\n<ul>\n<li>An</li>\n<li>Unordered</li>\n<li>List\nSome <code>inline code</code></li>\n</ul>\n<hr>\n<p>A <a href="https://tyhopp.com">link</a>\nAn <img src="https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg" alt="image of a grapefruit"></p>\n'
  );
});

/**
 * Also covered in xss's tests but will add a redundacy test as well.
 * @see {@link https://github.com/leizongmin/js-xss/tree/master/test}
 */
markdownEndpoint('should sanitize output HTML', async () => {
  const response = await request(server).post(path.markdown).set('Accept', 'application/json').send({
    markdown: '# An H1 header\n<script>alert("xss");</script>'
  });
  assert.is(response.statusCode, 200);
  assert.is(response.body.html, '<h1>An H1 header</h1>\n&lt;script&gt;alert("xss");&lt;/script&gt;');
});

markdownEndpoint.run();
