const express = require('express');

const routes = express.Router();

routes.get('/', (request, response) => {
    return response.json({
        'Name': 'Isaac',
        'Age': 24,
    });
});

module.exports = routes;