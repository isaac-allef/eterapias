const { request, response } = require('express');
const express = require('express');

const sheet = require('./controllers/sheetsController');
const authMiddleware = require('./middlewares/auth');
const authenticationController = require('./controllers/authenticationController');
const moderadorController = require('./controllers/moderadorController');
const eterapiaController = require('./controllers/eterapiaController');
const participanteController = require('./controllers/participanteController');
const encontroController = require('./controllers/encontroController');
const diariosDeCampoController = require('./controllers/diariosDeCampoController');
const presencaController = require('./controllers/presencaController');

const routes = express.Router();

routes.post('/authenticate', authenticationController.authenticationModeradores);

// routes.use(authMiddleware)
// qualquer rota colocada depois dessa linha:
//      precisará ter um token de acesso
//      dada pela rota authorization
//      tem acesso ao id do usuário através do request.userId

// google api
routes.post('/loadDataSheet', sheet.loadDataSheet);

// 
routes.get('/moderadores', moderadorController.list); // ok
routes.get('/moderador/:id', moderadorController.listMyInformations); // ok
routes.post('/moderador', moderadorController.create); // ok
routes.put('/moderador/:id', moderadorController.update); // ok
routes.patch('/moderador/:id/status', moderadorController.setStatusActive); // ok
routes.delete('/moderador/:id', moderadorController.delete); // ok

routes.get('/moderador/:id/eterapias', moderadorController.listMyEterapias); // ok
routes.get('/moderador/:id/diarios', moderadorController.listMyDiariosDeCampo);
routes.put('/moderadorLoginPass/:id', moderadorController.updateLoginPass);
//

//
routes.get('/eterapias', eterapiaController.list); // ok
routes.get('/eterapia/:id', eterapiaController.listMyInformations); // ok
routes.post('/eterapia', eterapiaController.create); // ok
routes.put('/eterapia/:id', eterapiaController.update); // ok
routes.patch('/eterapia/:id/status', eterapiaController.setStatusActive); // ok
routes.delete('/eterapia/:id', eterapiaController.delete); // ok

routes.get('/eterapia/:id/moderadores', eterapiaController.listMyModeradores); // ok
routes.put('/eterapia/:id_eterapia/moderador/:id_moderador', eterapiaController.linkModerador); // ok
routes.delete('/eterapia/:id_eterapia/moderador/:id_moderador', eterapiaController.unlinkModerador); // ok
routes.get('/eterapia/:id/participantes', eterapiaController.listMyParticipantes); // ok
routes.put('/eterapia/:id_eterapia/participante/:id_participante', eterapiaController.linkParticipante); // ok
routes.delete('/eterapia/:id_eterapia/participante/:id_participante', eterapiaController.unlinkParticipante); // ok
routes.get('/eterapia/:id/encontros', eterapiaController.listMyEncontros);
//

//
routes.get('/participantes', participanteController.list); // ok
routes.get('/participante/:id', participanteController.listMyInformations); // ok
routes.post('/participante', participanteController.create); // ok
routes.put('/participante/:id', participanteController.update); // ok
routes.patch('/participante/:id/status', participanteController.setStatusActive); // ok
routes.delete('/participante/:id', participanteController.delete); // ok

routes.get('/participante/:id/eterapias', participanteController.listMyEterapias); // ok
//

//
routes.get('/encontros', encontroController.list); // ok
routes.get('/encontro/:id', encontroController.listMyInformations); // ok
routes.post('/encontro', encontroController.create); // ok
routes.put('/encontro/:id', encontroController.update); // ok
routes.patch('/encontro/:id/status', encontroController.setStatusActive); // ok
routes.delete('/encontro/:id', encontroController.delete); // ok

routes.get('/encontro/:id/presencas', encontroController.listMyPresencas); 
routes.get('/encontro/:id/diarios', encontroController.listMyDiariosDeCampo); 
//

//
routes.get('/presencas', presencaController.list); // ok
routes.post('/presenca', presencaController.create); // ok
routes.delete('/presenca', presencaController.delete); // ok
//

//
routes.get('/diarios', diariosDeCampoController.list); // ok
routes.post('/diario', diariosDeCampoController.create); // ok
routes.put('/diario/:id', diariosDeCampoController.update); // ok
routes.delete('/diario/:id', diariosDeCampoController.delete); // ok
//

// routes.post('/encontro/presenca', encontroController.createPresenca);
// routes.delete('/encontro/:id/presenca', encontroController.deletePresenca);


// routes.post('/moderador/diario', moderadorController.createDiarioDeCampo);
// routes.delete('/moderador/:id_moderador/diario/:id_diario', moderadorController.deleteDiarioDeCampo);

module.exports = routes;