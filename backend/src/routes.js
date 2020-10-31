const { request, response } = require('express');
const express = require('express');

const sheet = require('./controllers/sheetsController');
const authMiddleware = require('./middlewares/auth');
const authenticationController = require('./controllers/authenticationController');
const moderadorController = require('./controllers/moderadorController');

const routes = express.Router();

routes.post('/authenticate', authenticationController.authenticationModeradores);

routes.use(authMiddleware)
// qualquer rota colocada depois dessa linha:
//      precisará ter um token de acesso
//      dada pela rota authorization
//      tem acesso ao id do usuário através do request.userId

// google api
routes.post('/loadDataSheet', sheet.loadDataSheet);

// administrador
routes.get('/moderadores', moderadorController.list);
routes.post('/moderador', moderadorController.create);
routes.put('/moderador/:id', moderadorController.update);
routes.delete('/moderador/:id', moderadorController.delete);
// routes.get('/eterapia', eterapiaController.list);
// routes.post('/eterapia', eterapiaController.create);
// routes.put('/eterapia/:id', eterapiaController.update);
// routes.delete('/eterapia/:id', eterapiaController.delete);

// moderadores
routes.put('/moderadorLoginPass/:id', moderadorController.updateLoginPass);

//eterapias


//participantes


module.exports = routes;