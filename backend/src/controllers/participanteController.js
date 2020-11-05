const connectionDB = require('../database/connection');
const cryptHanddle = require('../handdles/cryptHanddle');
const Moderador = require('../models/Moderador');
const Participante = require('../models/Participante');

module.exports = {
    async list(request, response, next) {
        try {
            const { page=1 } = request.query;
            const participantes = await connectionDB('participantes')
            .select('*')
            .whereNot('status', 'deleted')
            .whereNot('status', 'inactive')
            .limit(5)
            .offset((page - 1) * 5);
            
            return response.json(participantes);
        }catch(err) {
            next(err)
        }
    },

    async listMyEterapias(request, response, next) {
        try {
            const { id } = request.params;

            const participante = new Participante(id);
            const result = await participante.getMyEterapias();

            if (!result.check)
                return response.status(500).send({error: result.error})
            
            return response.status(200).send({
                id: id,
                myEterapias: result.result
            })
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
        
            const [ id ] = await connectionDB('participantes').insert({
                fullName,
                email,
                whatsapp_tel,
                city,
                uf,
                sex
            }).returning('id');
            return response.status(201).send({ 
                id,
                fullName 
            });
        }catch(err) {
            // return response.status(500).send({ error: err.detail});
            next(err)
        }
    },

    async update(request, response, next) {
        try {
            const { id } = request.params;

            const participante = new Participante(id);
            const {check, error} = await participante.checkMe();

            if (!check)
                return response.status(500).send({error: error})
            
            const {
                fullName,
                email,
                whatsapp_tel,
                city,
                uf,
                sex
            } = request.body;

            await connectionDB('participantes').where('id', id).update({
                fullName: fullName,
                email: email,
                whatsapp_tel: whatsapp_tel,
                city: city,
                uf: uf,
                sex: sex,
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
            
            const participante = new Participante(id);
            const result = await participante.setStatusActive(active);

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

    async delete(request, response, next) {
        try {
            const { id } = request.params;
            const participante = new Participante(id);
            const result = await participante.deleteMe();

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