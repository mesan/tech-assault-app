import Hapi from 'hapi';
import fs from 'fs';

let server = new Hapi.Server();

let tls = (typeof process.env.MODE === 'undefined' || process.env.MODE === 'dev') ? {
    key: fs.readFileSync('./ssl/server.key'),
    cert: fs.readFileSync('./ssl/server.crt'),
    ca: fs.readFileSync('./ssl/ca.crt'),
    requestCert: true,
    rejectUnauthorized: false
} : undefined;

server.connection({
    port: process.env.PORT || 3000,
    tls: tls
});

server.route({
    method: ['GET'],
    path: '/',
    config: {
        auth: false,
        handler: function (request, reply) {
            return reply('Welcome!');
        }
    }
});

server.start(() => {
    console.log('Server running at:', server.info.uri);
});
