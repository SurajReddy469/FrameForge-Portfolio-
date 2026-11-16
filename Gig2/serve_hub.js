const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5180;
const HTML_FILE = path.join(__dirname, 'portfolio_hub.html');

const server = http.createServer((req, res) => {
  // Always serve portfolio_hub.html
  fs.readFile(HTML_FILE, 'utf8', (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Error loading Master Portfolio Hub: ' + err.message);
      return;
    }
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Access-Control-Allow-Origin': '*'
    });
    res.end(data);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`[Showroom Hub] Master Portfolio Hub running at http://localhost:${PORT}/`);
});
