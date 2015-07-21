import Hapi from 'hapi';
import fs from 'fs';
import socketApp from './socketApp';

let {
    TECH_APP_LOGIN_TWITTER_URL
} = process.env;

let server = new Hapi.Server();

server.connection({
    port: process.env.PORT || 3000
});

server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: 'public',
            listing: true
        }
    }
});

server.route({
    method: 'GET',
    path: '/login',
    handler: function (request, reply) {
        return reply.redirect(TECH_APP_LOGIN_TWITTER_URL);
    }
});

server.register(socketApp, (err) => {
    if (err) {
        console.log(err);
    }

    server.start(() => {
        console.log('Server running at:', server.info.uri);
    });
});