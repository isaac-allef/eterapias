const connectionDB = require('../database/connection');
const cryptHanddle = require('../handdles/cryptHanddle');
const Formulario = require('../models/Formulario');

module.exports = {
    async list(request, response, next) {
        try {
            const { page=1, 
                limit=5, 
                orderBy='id', 
                ascDesc='asc',  
                id,
                participante_id=null,
                get='*'
            } = request.query;
            const formularioList = await Formulario.list(page, limit, orderBy, ascDesc, id, participante_id, get)
            return response.json({
                "metada": {
                    page, 
                    limit, 
                    orderBy, 
                    ascDesc, 
                    id
                },
                "result": formularioList
            });
        }catch(err) {
            next(err)
        }
    },

    async create(request, response, next) {
        try {
            const {
                codigo_participante_formulario,
                link_formulario
            } = request.body;

            const id = await Formulario.create({ 
                codigo_participante_formulario,
                link_formulario
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
                codigo_participante_formulario,
                link_formulario
            } = request.body;

            const numberOfRawUpdated = await Formulario.update(id, { 
                codigo_participante_formulario,
                link_formulario
            })

            if(!numberOfRawUpdated)
                return response.status(404).json({status: 'Formulario not found'})

            return response.status(200).json();
        }catch(err) {
            next(err)
        }
    },

    async delete(request, response, next) {
        try {
            const { id } = request.params;

            const numberOfRawDeleted = await Formulario.delete(id)

            if(!numberOfRawDeleted)
                return response.status(404).json({status: 'Formulario not found'})

            return response.status(200).json();
        }catch(err) {
            next(err)
        }
    },


    async linkParticipante(request, response, next) {
        try {
            const { formulario_id, participante_id } = request.params;

            await Formulario.linkParticipante(formulario_id, participante_id);
            
            return response.status(200).send()

        }catch(err) {
            next(err)
        }
    },

    async unlinkParticipante(request, response, next) {
        try {
            const { formulario_id, participante_id } = request.params;
            
            const numberOfRawDeleted = await Formulario.unlinkParticipante(formulario_id, participante_id);
            
            if (!numberOfRawDeleted)
                return response.status(404).send({status: "Relationship not found"})

            return response.status(200).send()

        }catch(err) {
            next(err)
        }
    },
}