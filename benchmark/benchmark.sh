# Test concurrency with ApacheBench
# See https://httpd.apache.org/docs/2.4/programs/ab.html

# -p indicates POST
# -T sets Content-Type header
# -c is concurrent clients
# -n is the total number of requests

ab -p markdown.json -T application/json -c 20 -n 100  "http://localhost:3000/markdown-to-html"