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
const formularioController = require('./controllers/formularioController');

const routes = express.Router();

routes.post('/authenticate', authenticationController.authenticationModeradores);

routes.use(authMiddleware)
// qualquer rota colocada depois dessa linha:
//      precisará ter um token de acesso
//      dada pela rota authorization
//      tem acesso ao id do usuário através do request.userId

// google api
routes.post('/loadDataSheet', sheet.loadDataSheet);

// User moderador
routes.get('/usermoderador', moderadorController.readMe);
routes.get('/usermoderador/eterapias', eterapiaController.myEterapias);
//

// 
routes.get('/moderadores', moderadorController.list);
routes.post('/moderador', moderadorController.create);
routes.put('/moderador/:id', moderadorController.update);
routes.delete('/moderador/:id', moderadorController.delete);

routes.put('/moderadorLoginPass/:id', moderadorController.updateLoginPass);
//

//
routes.get('/eterapias', eterapiaController.list);
routes.post('/eterapia', eterapiaController.create);
routes.put('/eterapia/:id', eterapiaController.update);
routes.delete('/eterapia/:id', eterapiaController.delete);

routes.put('/eterapia/:id_eterapia/moderador/:id_moderador', eterapiaController.linkModerador);
routes.delete('/eterapia/:id_eterapia/moderador/:id_moderador', eterapiaController.unlinkModerador);
routes.put('/eterapia/:id_eterapia/participante/:id_participante', eterapiaController.linkParticipante);
routes.delete('/eterapia/:id_eterapia/participante/:id_participante', eterapiaController.unlinkParticipante);
//

//
routes.get('/participantes', participanteController.list);
routes.post('/participante', participanteController.create);
routes.put('/participante/:id', participanteController.update);
routes.delete('/participante/:id', participanteController.delete);
//

//
routes.get('/encontros', encontroController.list);
routes.post('/encontro', encontroController.create);
routes.put('/encontro/:id', encontroController.update);
routes.delete('/encontro/:id', encontroController.delete);
//

//
routes.get('/presencas', presencaController.list);
routes.post('/presenca', presencaController.create);
routes.delete('/presenca', presencaController.delete);
//

//
routes.get('/diarios', diariosDeCampoController.list);
routes.post('/diario', diariosDeCampoController.create);
routes.put('/diario/:id', diariosDeCampoController.update);
routes.delete('/diario/:id', diariosDeCampoController.delete);
//

//
routes.get('/formularios', formularioController.list);
routes.post('/formulario', formularioController.create);
routes.put('/formulario/:id', formularioController.update);
routes.delete('/formulario/:id', formularioController.delete);

routes.put('/formulario/:formulario_id/participante/:participante_id', formularioController.linkParticipante);
routes.delete('/formulario/:formulario_id/participante/:participante_id', formularioController.unlinkParticipante);
//

module.exports = routes;
