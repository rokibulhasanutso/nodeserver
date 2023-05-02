const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;
const publicdir = path.join(__dirname, 'Public');

const tempDirs = {
  '/': { file: 'index.html', type: 'text/html' },
  '/about.html': { file: 'about.html', type: 'text/html' },
  '/contact.html': { file: 'contact.html', type: 'text/html' },
  '/style.css': { file: 'style.css', type: 'text/css' }
};

const server = http.createServer((req, res) => {
  const tempDir = tempDirs[req.url];
  if (tempDir) {
    fs.readFile(path.join(publicdir, tempDir.file), 'utf-8', (err, data) => {
      if (!err) {
        res.writeHead(200, { 'Content-Type': tempDir.type });
        res.end(data);
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>Not Found</h1>');
  }
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
