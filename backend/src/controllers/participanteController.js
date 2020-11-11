const connectionDB = require('../database/connection');
const cryptHanddle = require('../handdles/cryptHanddle');
const Participante = require('../models/Participante');

module.exports = {
    async list(request, response, next) {
        try {
            const { page=1, 
                limit=5, 
                orderBy='fullName', 
                ascDesc='asc',  
                id,
                eterapia_id,
                get='*'
            } = request.query;
            const participanteList = await Participante.list(page, limit, orderBy, ascDesc, id, eterapia_id, get)
            return response.json({
                "metada": {
                    page, 
                    limit, 
                    orderBy, 
                    ascDesc, 
                    id,
                    eterapia_id,
                    get
                },
                "result": participanteList
            });
        }catch(err) {
            next(err)
        }
    },

    async create(request, response, next) {
        try {
            const {
                fullName,
                email,
                whatsapp_tel,
                city,
                uf,
                sex
            } = request.body;

            const id = await Participante.create({ 
                fullName,
                email,
                whatsapp_tel,
                city,
                uf,
                sex
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
                fullName,
                email,
                whatsapp_tel,
                city,
                uf,
                sex
            } = request.body;

            const numberOfRawUpdated = await Participante.update(id, { 
                fullName,
                email,
                whatsapp_tel,
                city,
                uf,
                sex
            })

            if(!numberOfRawUpdated)
                return response.status(404).json({status: 'Participante not found'})

            return response.status(200).json();
        }catch(err) {
            next(err)
        }
    },

    async delete(request, response, next) {
        try {
            const { id } = request.params;

            const numberOfRawDeleted = await Participante.delete(id)

            if(!numberOfRawDeleted)
                return response.status(404).json({status: 'Participante not found'})

            return response.status(200).json();
        }catch(err) {
            next(err)
        }
    },
}