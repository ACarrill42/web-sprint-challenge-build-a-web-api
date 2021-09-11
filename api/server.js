const express = require('express');
const helmet = require('helmet');

const server = express();
const projectRouter = require('./projects/projects-router');
const actionRouter = require('./actions/actions-router');
const {logger} = require('./projects/projects-middleware');

server.use(helmet());
server.use(express.json());
server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);
server.use(logger);

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;
