const http = require('http');
const fs = require('fs');

const logStream = fs.createWriteStream('access.log', { flags: 'a' });

const server = http.createServer((req, res) => {
    const log = `${new Date().toISOString()} | ${req.method} | ${req.url}\n`;
    logStream.write(log);

    if (req.method === 'GET' && req.url === '/') {
        res.end('server is running');
    } 
    else if (req.method === 'GET' && req.url === '/about') {
        res.end('this is about page');
    } 
    else if (req.method === 'GET' && req.url === '/user') {
        const user = {
            name: 'Aryan',
            age: 21
        };
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(user));
    } 
    else if (req.method === 'POST' && req.url === '/user') {
        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            const data = JSON.parse(body);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
                message: 'data received',
                data: data
            }));
        });
    } 
    else if (req.method === 'POST' && req.url === '/uppercase') {
        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            res.end(body.toUpperCase());
        });
    } 
    else if (req.method === 'POST' && req.url === '/process') {
        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            const result = body.replace(/[aeiouAEIOU]/g, '*');
            res.end(result);
        });
    } 
    else {
        res.statusCode = 404;
        res.end('404 page not found');
    }
});

server.listen(3000);
