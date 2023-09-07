const http = require('http');

const server = http.createServer((req, res) => {
    res.end(`Voilà la réponse du server`);
});

server.listen(process.env.PORT || 5000, () => {
    console.log(`Le server est ouvert sur le port: ${process.env.PORT || 5000}`);
});