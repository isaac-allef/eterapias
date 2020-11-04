const connectionDB = require('../database/connection');
const cryptHanddle = require('../crypt/cryptHanddle');
const Eterapia = require('../models/Eterapia');
const { setStatusActive } = require('./moderadorController');

module.exports = {
    async list(request, response, next) {
        try {
            const { page=1 } = request.query;
            const eterapias = await connectionDB('eterapias')
                .select('*')
                .whereNot('status', 'deleted')
                .whereNot('status', 'inactive')
                .limit(5)
                .offset((page - 1) * 5);;
            return response.json(eterapias);
        }catch(err) {
            next(err)
        }
    },

    async listMyModeradores(request, response, next) {
        try {
            const { myId } = request.body;

            const eterapia = new Eterapia(myId);
            const result = await eterapia.getMyModeradores();

            if (!result.check)
                return response.status(500).send({error: result.error})
            
            return response.status(200).send({
                id: myId,
                myModeradores: result.result
            })
        }catch(err) {
            next(err)
        }
    },

    async create(request, response, next) {
        try {
            const {
                title,
                description,
                frequency,
                app
            } = request.body;
        
            await connectionDB('eterapias').insert({
                title,
                description,
                frequency,
                app
            });
            return response.status(201).send();
        }catch(err) {
            // return response.status(500).send({ error: err.detail});
            next(err)
        }
    },

    async update(request, response, next) {
        try {
            const { id } = request.params;
            const eterapia = await connectionDB('eterapias')
                .select('status')
                .where('id', id)
                .first();

            if (!eterapia || eterapia.status === 'deleted')
                return response.status(500).send({ error: "Not found"});
            
            const {
                title,
                description,
                frequency,
                app,
            } = request.body;

            await connectionDB('eterapias').where('id', id).update({
                title: title,
                description: description,
                frequency: frequency,
                app: app
            })

            response.status(200).send();
        }catch(err) {
            next(err)
        }
    },

    async setStatusActive(request, response, next) {
        try {
            const { id } = request.params;
            const { active } = request.body;
            
            const eterapia = new Eterapia(id);
            const result = await eterapia.setStatusActive(active);

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

    async linkModerador(request, response, next) {
        try {
            const { id_eterapia, id_moderador } = request.params;
            
            const eterapia = new Eterapia(id_eterapia);
            const result = await eterapia.linking({
                id_entity: id_moderador,
                table: 'moderadores',
                intermediateTable: 'eterapias_moderadores'
            });

            if (!result.check)
                return response.status(500).send({error: result.error})
            
            return response.status(200).send({
                id_eterapia: id_eterapia,
                id_moderador: id_moderador,
                link: result.result
            })

        }catch(err) {
            next(err)
        }
    },

    async unlinkModerador(request, response, next) {
        try {
            const { id_eterapia, id_moderador } = request.params;

            const eterapia = new Eterapia(id_eterapia);
            const result = await eterapia.unlinking({ 
                intermediateTable: 'eterapias_moderadores', 
                columnMyIdFk: 'id_eterapia_fk', 
                columnOtherIdFk: 'id_moderador_fk', 
                id_otherEntity: id_moderador 
            });

            if (!result.check)
                return response.status(500).send({error: result.error})
            
            return response.status(200).send({
                id_eterapia: id_eterapia,
                id_moderador: id_moderador,
                unlink: result.result
            })

        }catch(err) {
            next(err)
        }
    },

    async delete(request, response, next) {
        try {
            const { id } = request.params;
            const eterapia = new Eterapia(id);
            const result = await eterapia.deleteMe();

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
    }
}