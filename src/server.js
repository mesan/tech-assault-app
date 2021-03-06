import Hapi from 'hapi';
import fs from 'fs';
import socketApp from './socketApp';

require('./polyfills/Array.findIndex');

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

require("console-stamp")(console, { pattern: 'yymmdd/HHMMss.L'});

const {
    TECH_AUTH_ENDPOINT
    } = process.env;

let server = new Hapi.Server();

server.connection({
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost'
});

var options = {
    opsInterval: 1000,
    reporters: [{
        reporter: require('good-console'),
        events: { log: '*', request: '*', response: '*' }
    }]
};

server.route({
    method: 'GET',
    path: '/presenter/{param*}',
    handler: {
        directory: {
            path: 'public-presenter',
            listing: false
        }
    }
});

server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: __dirname + '/../public',
            listing: false
        }
    }
});

server.route({
    method: 'GET',
    path: '/login/twitter',
    handler: function (request, reply) {
        return reply.redirect(`${TECH_AUTH_ENDPOINT}/login/twitter`);
    }
});

server.route({
    method: 'GET',
    path: '/login/facebook',
    handler: function (request, reply) {
        return reply.redirect(`${TECH_AUTH_ENDPOINT}/login/facebook`);
    }
});

server.register({
    register: require('good'),
    options: options
}, function (err) {

    if (err) {
        console.error(err);
    }
    else {
        server.register(socketApp, (err) => {
            if (err) {
                console.log(err);
            }

            server.start(() => {
                console.log('Server running at:', server.info.uri);
            });
        });
    }
});