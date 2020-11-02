const connectionDB = require('../database/connection');
const cryptHanddle = require('../crypt/cryptHanddle');

module.exports = {
    async list(request, response, next) {
        try {
            const { page=1 } = request.query;
            const eterapias = await connectionDB('eterapias')
                .select('*')
                .whereNot('status', 'deleted')
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

            const { status } = await connectionDB('eterapias')
                .select('status')
                .where('id', myId)
                .first();
            
            if (!status || status === 'deleted')
                return response.status(400).send({ error: "Eterapia not found"});
            
            const result = await connectionDB('moderadores')
                .select('moderadores.*')
                .join('eterapias_moderadores', 'moderadores.id', '=', 'eterapias_moderadores.id_moderador_fk')
                .where('eterapias_moderadores.id_eterapia_fk', '=', myId)
                .whereNot('eterapias_moderadores.status_moderador', 'deleted');
            return response.status(200).send(result)
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

    async linkModerador(request, response, next) {
        try {
            const { id_eterapia, id_moderador } = request.params;

            const eterapia = await connectionDB('eterapias')
                .select('status')
                .where('id', id_eterapia)
                .first();
            if (!eterapia || eterapia.status === 'deleted')
                return response.status(500).send({ error: "Eterapia not found"});

            const moderador = await connectionDB('moderadores')
                .select('status')
                .where('id', id_moderador)
                .first();
            if (!moderador || moderador.status === 'deleted')
                return response.status(500).send({ error: "Moderador not found"});
            
            const id_eterapia_fk = id_eterapia;
            const id_moderador_fk = id_moderador;
            await connectionDB('eterapias_moderadores').insert({
                id_eterapia_fk,
                id_moderador_fk
            })

            return response.status(200).send();

        }catch(err) {
            next(err)
        }
    },

    async unlinkModerador(request, response, next) {
        try {
            const { id_eterapia, id_moderador } = request.params;

            await connectionDB('eterapias_moderadores')
                .where('id_eterapia_fk', id_eterapia)
                .andWhere('id_moderador_fk', id_moderador)
                .del();
            
            return response.status(200).send();
        }catch(err) {
            next(err)
        }
    },

    async delete(request, response, next) {
        try {
            const { id } = request.params;
            const { status } = await connectionDB('eterapias')
                .select('status')
                .where('id', id)
                .first();
            
            if (!status || status === 'deleted')
                return response.status(400).send({ error: "Not found"});
            
            await connectionDB.transaction(async trans => {
                try {
                    await connectionDB('eterapias').where('id', id).update({status: 'deleted'})
                    await connectionDB('eterapias_moderadores')
                        .update({status_eterapia: 'deleted'})
                        .where('id_eterapia_fk', id)
                }catch(err) {
                    console.log(err)
                    next(err)
                }
            })
            
            return response.status(204).send();
        }catch(err) {
            // return response.status(500).send({ error: err.detail});
            next(err)
        }
    }
}