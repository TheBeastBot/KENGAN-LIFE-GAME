import { createReadStream, existsSync } from 'node:fs';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, extname, join, normalize } from 'node:path';

const port = Number.parseInt(process.env.PORT ?? '4173', 10);
const host = process.env.HOST ?? '0.0.0.0';
const root = dirname(fileURLToPath(import.meta.url));

const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
};

createServer((request, response) => {
  const requestedPath = decodeURIComponent(new URL(request.url ?? '/', `http://localhost:${port}`).pathname);
  const safePath = normalize(requestedPath).replace(/^[/\\]+/, '').replace(/^(\.\.[/\\])+/, '');
  const filePath = join(root, safePath === '' ? 'index.html' : safePath);

  if (!filePath.startsWith(root) || !existsSync(filePath)) {
    response.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
    response.end('Not found');
    return;
  }

  response.writeHead(200, { 'content-type': types[extname(filePath)] ?? 'application/octet-stream' });
  createReadStream(filePath).pipe(response);
}).listen(port, host, () => {
  console.log(`Underground Life Sim running at http://localhost:${port}`);
  console.log(`Network access enabled on http://<your-ip>:${port}`);
});
