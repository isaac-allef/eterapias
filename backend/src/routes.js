const { request, response } = require('express');
const express = require('express');

const sheet = require('./controllers/sheetsController');

const routes = express.Router();

routes.post('/loadDataSheet', sheet.loadDataSheet);

module.exports = routes;