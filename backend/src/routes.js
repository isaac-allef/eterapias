const { request, response } = require('express');
const express = require('express');

const sheet = require('./controllers/sheetsController');
const authMiddleware = require('./middlewares/auth');
const authenticationController = require('./controllers/authenticationController');
const moderadorController = require('./controllers/moderadorController');
const eterapiaController = require('./controllers/eterapiaController');

const routes = express.Router();

routes.post('/authenticate', authenticationController.authenticationModeradores);

// routes.use(authMiddleware)
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
routes.get('/eterapias', eterapiaController.list);
routes.post('/eterapia', eterapiaController.create);
routes.put('/eterapia/:id', eterapiaController.update);
routes.put('/eterapia/:id_eterapia/:id_moderador', eterapiaController.linkModerador);
routes.delete('/eterapia/:id', eterapiaController.delete);
routes.delete('/eterapia/:id_eterapia/:id_moderador', eterapiaController.unlinkModerador);
// routes.get('/participante', participanteController.list);
// routes.post('/participante', participanteController.create);
// routes.put('/participante/:id', participanteController.update);
// routes.delete('/participante/:id', participanteController.delete);

// moderadores
routes.put('/moderadorLoginPass/:id', moderadorController.updateLoginPass);
routes.get('/myeterapias', moderadorController.listMyEterapias);
// routes.get('/encontro', encontroController.list);
// routes.post('/encontro', encontroController.create);
// routes.put('/encontro', encontroController.update);
// routes.delete('/encontro', encontroController.delete);
// routes.get('/presenca', encontroController.list);
// routes.post('/presenca', encontroController.create);
// routes.put('/presenca', encontroController.update);
// routes.delete('/presenca', encontroController.delete);

//eterapias
// routes.get('/myparticpantes', eterapiaController.list);


module.exports = routes;