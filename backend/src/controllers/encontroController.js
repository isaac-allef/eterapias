const connectionDB = require('../database/connection');
const Encontro = require('../models/Encontro');

module.exports = {
    async list(request, response, next) {
        try {
            const { page=1, 
                limit=5, 
                orderBy='id', 
                ascDesc='asc',  
                id,
                eterapia_id,
                get='*'
            } = request.query;
            const encontroList = await Encontro.list(page, limit, orderBy, ascDesc, id, eterapia_id, get)
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
                "result": encontroList
            });
        }catch(err) {
            next(err)
        }
    },

    async create(request, response, next) {
        try {
            const {
                eterapia_id,
                dateTime,
                app
            } = request.body;

            const id = await Encontro.create({
                eterapia_id,
                dateTime,
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
                eterapia_id,
                dateTime,
                app
            } = request.body;

            const numberOfRawUpdated = await Encontro.update(id, {
                eterapia_id,
                dateTime,
                app
            })

            if(!numberOfRawUpdated)
                return response.status(404).json({status: 'Encontro not found'})

            return response.status(200).json();
        }catch(err) {
            next(err)
        }
    },

    async delete(request, response, next) {
        try {
            const { id } = request.params;

            const numberOfRawDeleted = await Encontro.delete(id)
            
            if(!numberOfRawDeleted)
                return response.status(404).json({status: 'Encontro not found'})

            return response.status(200).json();
        }catch(err) {
            next(err)
        }
    },
}