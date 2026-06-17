const http = require('http');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, 'dist');
const host = '127.0.0.1';
const port = 4174;

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
};

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
  const relativePath = urlPath === '/' ? 'index.html' : urlPath.replace(/^\/+/, '');
  let filePath = path.resolve(root, relativePath);

  if (!filePath.startsWith(root)) {
    res.statusCode = 403;
    res.end('Forbidden');
    return;
  }

  fs.stat(filePath, (statError, stat) => {
    if (!statError && stat.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    fs.readFile(filePath, (readError, data) => {
      if (readError) {
        const fallbackPath = path.join(root, 'index.html');

        fs.readFile(fallbackPath, (fallbackError, fallbackData) => {
          if (fallbackError) {
            res.statusCode = 404;
            res.end('Not found');
            return;
          }

          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          res.end(fallbackData);
        });

        return;
      }

      res.setHeader('Content-Type', mime[path.extname(filePath).toLowerCase()] || 'application/octet-stream');
      res.end(data);
    });
  });
});

server.listen(port, host);
