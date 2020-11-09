const connectionDB = require('../database/connection');
const DiarioDeCampo = require('../models/DiarioDeCampo');
const Encontro = require('../models/Encontro');
const Participante = require('../models/Participante');

module.exports = {
    async list(request, response, next) {
        try {
            const { page=1 } = request.query;

            const presencas = await connectionDB('presencas')
                .select('*')
                .whereNot('status', 'deleted')
                .whereNot('status', 'inactive')
                .limit(5)
                .offset((page - 1) * 5);;
            return response.json(presencas);
        }catch(err) {
            next(err)
        }
    },

    async create(request, response, next) {
        try {
            const {
                id_participante_fk,
                id_encontro_fk
            } = request.body;

            const participante = new Participante(id_participante_fk);
            const {check, error} = await participante.checkMe();

            if (!check)
                return response.status(500).send({error: error})
            
            const encontro = new Encontro(id_encontro_fk);
            const {check:c, error:e} = await encontro.checkMe();

            if (!c)
                return response.status(500).send({error: e})
        
            const [ id ] = await connectionDB('presencas').insert({
                id_participante_fk,
                id_encontro_fk
            }).returning('id');
            return response.status(201).send({
                id,
            });
        }catch(err) {
            next(err)
        }
    },

    async delete(request, response, next) {
        try {
            // const { id } = request.params;
            // const id_encontro_fk = parseInt(id);
            const {
                id_participante_fk,
                id_encontro_fk
            } = request.body;

            const participante = new Participante(id_participante_fk);
            const {check, error} = await participante.checkMe();

            if (!check)
                return response.status(500).send({error: error})
            
            const encontro = new Encontro(id_encontro_fk);
            const {check:c, error:e} = await encontro.checkMe();

            if (!c)
                return response.status(500).send({error: e})
            
            const result = await connectionDB('presencas')
                .select('id')
                .where('id_participante_fk', id_participante_fk)
                .where('id_encontro_fk', id_encontro_fk)
                .whereNot('status', 'deleted')
            
            if(Object.keys(result).length === 0) {
                return response.status(200).send({
                    id_participante_fk, 
                    id_encontro_fk,
                    error: 'Presenca not exists or has already been deleted'
                })
            }
            
            await connectionDB('presencas')
                .update({
                    status: 'deleted',
                    updated_at: connectionDB.fn.now()
                })
                .where('id_participante_fk', id_participante_fk)
                .where('id_encontro_fk', id_encontro_fk)
            
            return response.status(200).send({
                id_participante_fk, 
                id_encontro_fk,
                result: 'Presenca deleted'
            })
        }catch(err) {
            next(err)
        }
    },
}