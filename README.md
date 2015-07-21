# TechAssault Web Application

## Description

TechAssault service serving the frontend web application to the client and handling WS events between the server
and the client.

## Contributors

- Jan Eirik H.
- Hans Kristian R.
- Christian J.
- Arild T.

## Requirements

* Environment variables set up:
    * TECH_AUTH_ENDPOINT: The address to the authentication service endpoints. (eg. `"http://localhost:3002"`)
    * TECH_DOMAIN_ENDPOINT: The address to the domain service endpoints. (eg. `"http://localhost:3001"`)

## Set Up

    npm install
    npm start

## Develop

    nodemon
    webpack --w