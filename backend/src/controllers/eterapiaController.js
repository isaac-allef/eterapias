const connectionDB = require('../database/connection');
const cryptHanddle = require('../handdles/cryptHanddle');
const Eterapia = require('../models/Eterapia');

module.exports = {
    async list(request, response, next) {
        try {
            const { page=1, 
                limit=5, 
                orderBy='title', 
                ascDesc='asc', 
                id,
                moderador_id,
                participante_id,
                get='*'
            } = request.query;
            const eterapiaList = await Eterapia.list(page, limit, orderBy, ascDesc, id, moderador_id, participante_id, get)
            return response.json({
                "metadata": {
                    page, 
                    limit, 
                    orderBy, 
                    ascDesc, 
                    id,
                    moderador_id,
                    participante_id,
                    get
                },
                "result": eterapiaList
            });
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

            const id = await Eterapia.create({
                title,
                description,
                frequency,
                app
            })
            return response.status(201).json({id: id});
        }catch(err) {
            next(err)
        }
    },

    async update(request, response, next) {
        try {
            const { id } = request.params;

            const {
                title,
                description,
                frequency,
                app
            } = request.body;

            const numberOfRawUpdated = await Eterapia.update(id, {
                title,
                description,
                frequency,
                app
            })

            if(!numberOfRawUpdated)
                return response.status(404).json({status: 'Eterapia not found'})

            return response.status(200).json();
        }catch(err) {
            next(err)
        }
    },

    async delete(request, response, next) {
        try {
            const { id } = request.params;

            const numberOfRawDeleted = await Eterapia.delete(id)

            if(!numberOfRawDeleted)
                return response.status(404).json({status: 'Eterapia not found'})

            return response.status(200).json();
        }catch(err) {
            next(err)
        }
    },

    async linkModerador(request, response, next) {
        try {
            const { id_eterapia, id_moderador } = request.params;

            await Eterapia.linkModerador(id_eterapia, id_moderador);
            
            return response.status(200).send()

        }catch(err) {
            next(err)
        }
    },

    async unlinkModerador(request, response, next) {
        try {
            const { id_eterapia, id_moderador } = request.params;
            
            const numberOfRawDeleted = await Eterapia.unlinkModerador(id_eterapia, id_moderador);
            
            if (!numberOfRawDeleted)
                return response.status(404).send({status: "Relationship not found"})

            return response.status(200).send()

        }catch(err) {
            next(err)
        }
    },

    async linkParticipante(request, response, next) {
        try {
            const { id_eterapia, id_participante } = request.params;
            
            await Eterapia.linkParticipante(id_eterapia, id_participante);
            
            return response.status(200).send()

        }catch(err) {
            next(err)
        }
    },

    async unlinkParticipante(request, response, next) {
        try {
            const { id_eterapia, id_participante } = request.params;
            
            const numberOfRawDeleted = await Eterapia.unlinkParticipante(id_eterapia, id_participante);
            
            if (!numberOfRawDeleted)
                return response.status(404).send({status: "Relationship not found"})

            return response.status(200).send()

        }catch(err) {
            next(err)
        }
    },
}