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

http.createServer((req, res) => {
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
    res.end(`<div style="
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        color: gray;
        font-family: sans-serif;
        font-weight: 500;
        flex-direction: column;
        margin-top: -50px;
    ">
      <h1 style="
        font-weight: 500;
        font-size: 50px;
        letter-spacing: 18px;
        margin-bottom: 0;
      ">404</h1>
      <h2 style="
          font-weight: 500;
      ">This page is Not Found.</h2></div>`)
    }
}).listen(port, () => console.log(`Server listening on port ${port}`));
