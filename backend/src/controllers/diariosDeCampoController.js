const connectionDB = require('../database/connection');

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

    async create(request, response, next) {
        try {
            const {
                id_moderador_fk,
                id_encontro_fk,
                description
            } = request.body;
        
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
}