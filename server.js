const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {

    if (req.method === 'GET') {
        const parsedUrl = url.parse(req.url, true);
        const path = parsedUrl.pathname;

        if (path === '/') {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Welcome to the Node.js HTTP Server');
        }
        else if (path === '/about') {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`
                <html>
                    <head><title>About</title></head>
                    <body>
                        <h1>About Page</h1>
                        <p>This server is built using Node.js HTTP module.</p>
                    </body>
                </html>
            `);
        }
        else if (path === '/user') {
            const { name, age } = parsedUrl.query;

            const userData = {
                name: name || 'Not provided',
                age: age || 'Not provided'
            };

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(userData));
        }

       
        else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Page Not Found');
        }
    }
});

server.listen(3000, () => {
    console.log('Server started');
});
