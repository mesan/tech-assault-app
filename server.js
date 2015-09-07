import Hapi from 'hapi';
import fs from 'fs';
import socketApp from './socketApp';

const envVars = [
    'TECH_DOMAIN_ENDPOINT',
    'TECH_AUTH_ENDPOINT'
];

let undefinedEnvVars = [];

for (let envVar of envVars) {
    if (typeof process.env[envVar] === 'undefined') {
        undefinedEnvVars.push(envVar);
    }
}

if (undefinedEnvVars.length > 0) {
    console.error(`You need to define the following environment variable(s): ${undefinedEnvVars.join(', ')}`);
    process.exit(1);
}

const {
    TECH_AUTH_ENDPOINT
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
        return reply.redirect(`${TECH_AUTH_ENDPOINT}/login/twitter`);
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