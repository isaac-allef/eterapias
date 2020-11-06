const connectionDB = require('../database/connection');
const Eterapia = require('../models/Eterapia');
const Encontro = require('../models/Encontro');

module.exports = {
    async list(request, response, next) {
        try {
            const { page=1 } = request.query;

            const encontros = await connectionDB('encontros')
                .select('*')
                .whereNot('status', 'deleted')
                .whereNot('status', 'inactive')
                .limit(5)
                .offset((page - 1) * 5);;
            return response.json(encontros);
        }catch(err) {
            next(err)
        }
    },

    async create(request, response, next) {
        try {
            const {
                id_eterapia_fk,
                dateTime,
                app
            } = request.body;
        
            const [ id ] = await connectionDB('encontros').insert({
                id_eterapia_fk,
                dateTime,
                app
            }).returning('id');
            return response.status(201).send({
                id,
                dateTime
            });
        }catch(err) {
            next(err)
        }
    },

    async update(request, response, next) {
        try {
            const { id } = request.params;
            
            const encontro = new Encontro(id);
            const {check, error} = await encontro.checkMe();

            if (!check)
                return response.status(500).send({error: error})
            
            const {
                dateTime,
                app
            } = request.body;

            await connectionDB('encontros').where('id', id).update({
                dateTime,
                app,
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

    async setStatusActive(request, response, next) {
        try {
            const { id } = request.params;
            const { active } = request.body;
            
            const encontro = new Encontro(id);
            const result = await encontro.setStatusActive(active);

            if (!result.check)
                return response.status(500).send({error: result.error})
            
            return response.status(200).send({
                id: id,
                status: result.result
            })
        }catch(err) {
            next(err)
        }
    },

    async delete(request, response, next) {
        try {
            const { id } = request.params;
            
            const encontro = new Encontro(id);
            const result = await encontro.deleteMe();

            if (!result.check)
                return response.status(500).send({error: result.error})
            
            return response.status(200).send({
                id: id,
                status: result.result
            })
        }catch(err) {
            next(err)
        }
    }
}