const connectionDB = require('../database/connection');

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
}