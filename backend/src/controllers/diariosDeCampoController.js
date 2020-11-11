const connectionDB = require('../database/connection');
const DiarioDeCampo =  require('../models/DiarioDeCampo');

module.exports = {
    async list(request, response, next) {
        try {
            const { page=1, 
                limit=5, 
                orderBy='id', 
                ascDesc='asc',  
                id,
                moderador_id,
                encontro_id,
                get='*'
            } = request.query;
            const diarioDeCampoList = await DiarioDeCampo.list(page, limit, orderBy, ascDesc, id, moderador_id, encontro_id, get)
            return response.json({
                "metadata": {
                    page, 
                    limit, 
                    orderBy, 
                    ascDesc, 
                    id,
                    moderador_id,
                    encontro_id,
                    get
                },
                "result": diarioDeCampoList
            });
        }catch(err) {
            next(err)
        }
    },

    async create(request, response, next) {
        try {
            const {
                moderador_id,
                encontro_id,
                description
            } = request.body;

            const id = await DiarioDeCampo.create({ 
                moderador_id,
                encontro_id,
                description
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
                id_moderador_fk,
                id_encontro_fk,
                description
            } = request.body;

            const numberOfRawUpdated = await DiarioDeCampo.update(id, {
                id_moderador_fk,
                id_encontro_fk,
                description
            })

            if(!numberOfRawUpdated)
                return response.status(404).json({status: 'Moderador not found'})

            return response.status(200).json();
        }catch(err) {
            next(err)
        }
    },

    async delete(request, response, next) {
        try {
            const { id } = request.params;

            const numberOfRawDeleted = await DiarioDeCampo.delete(id)

            if(!numberOfRawDeleted)
                return response.status(404).json({status: 'Moderador not found'})

            return response.status(200).json();
        }catch(err) {
            next(err)
        }
    },
}