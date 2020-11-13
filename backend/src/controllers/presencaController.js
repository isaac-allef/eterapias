const connectionDB = require('../database/connection');
const Presenca = require('../models/Presenca');

module.exports = {
    async list(request, response, next) {
        try {
            const { page=1, 
                limit=5, 
                orderBy='id', 
                ascDesc='asc', 
                participante_id,
                encontro_id
            } = request.query;
            const presencaList = await Presenca.list(page, limit, orderBy, ascDesc, participante_id, encontro_id)
            return response.json({
                "metadata": {
                    page, 
                    limit, 
                    orderBy, 
                    ascDesc,
                    participante_id,
                    encontro_id
                },
                "result": presencaList
            });
        }catch(err) {
            next(err)
        }
    },

    async create(request, response, next) {
        try {
            // const {
            //     participante_id,
            //     encontro_id
            // } = request.body;
            const presencaArray = request.body;

            const id = await Presenca.create(presencaArray)
            return response.status(201).json({id: id});
        }catch(err) {
            next(err)
        }
    },

    async delete(request, response, next) {
        try {
            const {
                participante_id,
                encontro_id
            } = request.body;

            const numberOfRawDeleted = await Presenca.delete(participante_id, encontro_id);
            
            if(!numberOfRawDeleted)
                return response.status(404).json({status: 'Presenca not found'})

            return response.status(200).json();
        }catch(err) {
            next(err)
        }
    },
}