const { request, response } = require('express');
const express = require('express');

const sheet = require('./controllers/sheetsController');
const authMiddleware = require('./middlewares/auth');
const authenticationController = require('./controllers/authenticationController');
const moderadorController = require('./controllers/moderadorController');
const eterapiaController = require('./controllers/eterapiaController');
const participanteController = require('./controllers/participanteController');
const encontroController = require('./controllers/encontroController');

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
routes.get('/moderadores', moderadorController.list); // ok
routes.post('/moderador', moderadorController.create); // ok
routes.put('/moderador/:id', moderadorController.update); // ok
routes.put('/moderador/:id/status', moderadorController.setStatusActive); // ok
routes.delete('/moderador/:id', moderadorController.delete); // ok
routes.put('/moderadorLoginPass/:id', moderadorController.updateLoginPass);
routes.get('/moderador/:id/eterapias', moderadorController.listMyEterapias); // ok
routes.get('/moderador/:id/informations', moderadorController.listMyInformations); // ok

routes.get('/eterapias', eterapiaController.list); // ok
routes.post('/eterapia', eterapiaController.create); // ok
routes.put('/eterapia/:id', eterapiaController.update); // ok
routes.put('/eterapia/:id/status', eterapiaController.setStatusActive); // ok
routes.delete('/eterapia/:id', eterapiaController.delete); // ok
routes.put('/eterapia/:id_eterapia/moderador/:id_moderador', eterapiaController.linkModerador); // ok
routes.delete('/eterapia/:id_eterapia/moderador/:id_moderador', eterapiaController.unlinkModerador); // ok
routes.put('/eterapia/:id_eterapia/participante/:id_participante', eterapiaController.linkParticipante); // ok
routes.delete('/eterapia/:id_eterapia/participante/:id_participante', eterapiaController.unlinkParticipante); // ok
routes.get('/eterapia/:id/informations', eterapiaController.listMyInformations); // ok
routes.get('/eterapia/:id/moderadores', eterapiaController.listMyModeradores); // ok
routes.get('/eterapia/:id/participantes', eterapiaController.listMyParticipantes); // ok


routes.get('/participantes', participanteController.list); // ok
routes.post('/participante', participanteController.create); // ok
routes.put('/participante/:id', participanteController.update); // ok
routes.put('/participante/:id/status', participanteController.setStatusActive); // ok
routes.delete('/participante/:id', participanteController.delete); // ok
routes.get('/participante/:id/eterapias', participanteController.listMyEterapias); // ok
routes.get('/participante/:id/informations', participanteController.listMyInformations); // ok


routes.get('/eterapia/:id/encontros', eterapiaController.listMyEncontros);
routes.get('/encontros', encontroController.list);
routes.post('/encontro', encontroController.create);
routes.put('/encontro/:id', encontroController.update);
routes.put('/encontro/:id/status', encontroController.setStatusActive);
routes.delete('/encontro/:id', encontroController.delete);


// routes.get('/presenca', encontroController.list);
// routes.post('/presenca', encontroController.create);
// routes.put('/presenca', encontroController.update);
// routes.delete('/presenca', encontroController.delete);


module.exports = routes;