const connectionDB = require('../database/connection');
const DiarioDeCampo = require('../models/DiarioDeCampo');
const Encontro = require('../models/Encontro');
const Moderador = require('../models/Moderador');

module.exports = {
    async list(request, response, next) {
        try {
            const { page=1 } = request.query;

            const diarios_de_campo = await connectionDB('diarios_de_campo')
                .select('*')
                .whereNot('status', 'deleted')
                .whereNot('status', 'inactive')
                .limit(5)
                .offset((page - 1) * 5);;
            return response.json(diarios_de_campo);
        }catch(err) {
            next(err)
        }
    },

    async listMyInformations(request, response, next) {
        try {
            const { id } = request.params;

            const diarios_de_campo = new DiarioDeCampo(id);
            let result = await diarios_de_campo.getMyData();

            if (!result.check)
                return response.status(500).send({error: result.error})
            
            return response.status(200).send({
                id: id,
                myInformations: result.result
            })
        }catch(err) {
            next(err)
        }
    },

    async create(request, response, next) {
        try {
            const {
                id_moderador_fk,
                id_encontro_fk,
                description
            } = request.body;

            const moderador = new Moderador(id_moderador_fk);
            const {check, error} = await moderador.checkMe();

            if (!check)
                return response.status(500).send({error: error})
            
            const encontro = new Encontro(id_encontro_fk);
            const {check:c, error:e} = await encontro.checkMe();

            if (!c)
                return response.status(500).send({error: e})
        
            const [ id ] = await connectionDB('diarios_de_campo').insert({
                id_moderador_fk,
                id_encontro_fk,
                description
            }).returning('id');
            return response.status(201).send({
                id,
            });
        }catch(err) {
            next(err)
        }
    },

    async update(request, response, next) {
        try {
            const { id } = request.params;
            
            const diario = new DiarioDeCampo(id);
            const {check, error} = await diario.checkMe();

            if (!check)
                return response.status(500).send({error: error})
            
            const {
                id_moderador_fk,
                id_encontro_fk,
                description
            } = request.body;

            await connectionDB('diarios_de_campo').where('id', id).update({
                id_moderador_fk,
                id_encontro_fk,
                description,
                updated_at: connectionDB.fn.now()
            })

            response.status(200).send({
                id,
                its: 'up to date'
            });
        }catch(err) {
            next(err)
        }
    },

    async delete(request, response, next) {
        try {
            const { id } = request.params;
            
            const diario = new DiarioDeCampo(id);
            const result = await diario.deleteMe();

            if (!result.check)
                return response.status(500).send({error: result.error})
            
            return response.status(200).send({
                id: id,
                status: result.result
            })
        }catch(err) {
            // return response.status(500).send({ error: err.detail});
            next(err)
        }
    },
}