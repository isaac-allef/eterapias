const connectionDB = require('../database/connection');
const cryptHanddle = require('../handdles/cryptHanddle');
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
            const { id } = request.params;

            const eterapia = new Eterapia(id);
            const result = await eterapia.getMyModeradores();

            if (!result.check)
                return response.status(500).send({error: result.error})
            
            return response.status(200).send({
                id: id,
                myModeradores: result.result
            })
        }catch(err) {
            next(err)
        }
    },

    async listMyParticipantes(request, response, next) {
        try {
            const { id } = request.params;

            const eterapia = new Eterapia(id);
            const result = await eterapia.getMyParticipantes();

            if (!result.check)
                return response.status(500).send({error: result.error})
            
            return response.status(200).send({
                id: id,
                myParticipantes: result.result
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
        
            const [ id ] = await connectionDB('eterapias').insert({
                title,
                description,
                frequency,
                app
            }).returning('id');
            return response.status(201).send({
                id,
                title
            });
        }catch(err) {
            // return response.status(500).send({ error: err.detail});
            next(err)
        }
    },

    async update(request, response, next) {
        try {
            const { id } = request.params;
            
            const eterapia = new Eterapia(id);
            const {check, error} = await eterapia.checkMe();

            if (!check)
                return response.status(500).send({error: error})
            
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
                app: app,
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
                intermediateTable: 'eterapias_moderadores',
                columnMyIdFk: 'id_eterapia_fk',
                columnOtherIdFk: 'id_moderador_fk'
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
                id_entity: id_moderador ,
                intermediateTable: 'eterapias_moderadores', 
                columnMyIdFk: 'id_eterapia_fk', 
                columnOtherIdFk: 'id_moderador_fk'
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

    async linkParticipante(request, response, next) {
        try {
            const { id_eterapia, id_participante } = request.params;
            
            const eterapia = new Eterapia(id_eterapia);
            const result = await eterapia.linking({
                id_entity: id_participante,
                table: 'participantes',
                intermediateTable: 'eterapias_participantes',
                columnMyIdFk: 'id_eterapia_fk',
                columnOtherIdFk: 'id_participante_fk'
            });

            if (!result.check)
                return response.status(500).send({error: result.error})
            
            return response.status(200).send({
                id_eterapia: id_eterapia,
                id_participante: id_participante,
                link: result.result
            })

        }catch(err) {
            next(err)
        }
    },

    async unlinkParticipante(request, response, next) {
        try {
            const { id_eterapia, id_participante } = request.params;

            const eterapia = new Eterapia(id_eterapia);
            const result = await eterapia.unlinking({ 
                id_entity: id_participante ,
                intermediateTable: 'eterapias_participantes', 
                columnMyIdFk: 'id_eterapia_fk', 
                columnOtherIdFk: 'id_participante_fk'
            });

            if (!result.check)
                return response.status(500).send({error: result.error})
            
            return response.status(200).send({
                id_eterapia: id_eterapia,
                id_participante: id_participante,
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