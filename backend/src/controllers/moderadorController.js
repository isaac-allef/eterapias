const connectionDB = require('../database/connection');
const cryptHanddle = require('../crypt/cryptHanddle');
const Moderador = require('../models/Moderador');

module.exports = {
    async list(request, response, next) {
        try {
            const { page=1 } = request.query;
            const moderadores = await connectionDB('moderadores')
            .select('*')
            .whereNot('status', 'deleted')
            .whereNot('status', 'inactive')
            .limit(5)
            .offset((page - 1) * 5);
            
            moderadores.forEach( (moderador) => {
                moderador.password = undefined;
            });
            
            return response.json(moderadores);
        }catch(err) {
            next(err)
        }
    },

    async listMyEterapias(request, response, next) {
        try {
            const { myId } = request.body;

            const moderador = new Moderador(myId);
            const result = await moderador.getMyEterapias();

            if (!result.check)
                return response.status(500).send({error: result.error})
            
            return response.status(200).send({
                id: myId,
                myEterapias: result.result
            })
        }catch(err) {
            next(err)
        }
    },

    async create(request, response, next) {
        try {
            let { 
                userName,
                password,
                fullName,
                email,
                whatsapp_tel,
                city,
                uf,
                college
            } = request.body;

            password = await cryptHanddle.crypt(password);
        
            await connectionDB('moderadores').insert({
                userName,
                password,
                fullName,
                email,
                whatsapp_tel,
                city,
                uf,
                college
            });
            // return response.json( userName );
            return response.status(201).send({ userName });
        }catch(err) {
            // return response.status(500).send({ error: err.detail});
            next(err)
        }
    },

    async update(request, response, next) {
        try {
            const { id } = request.params;
            const moderador = await connectionDB('moderadores')
                .select('status')
                .where('id', id)
                .first();

            if (!moderador || moderador.status === 'deleted')
                return response.status(500).send({ error: "Not found"});
            
            const {
                fullName,
                email,
                whatsapp_tel,
                city,
                uf,
                college
            } = request.body;

            await connectionDB('moderadores').where('id', id).update({
                fullName: fullName,
                email: email,
                whatsapp_tel: whatsapp_tel,
                city: city,
                uf: uf,
                college: college
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
            
            const moderador = new Moderador(id);
            const result = await moderador.setStatusActive(active);

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

    async updateLoginPass(request, response, next) {
        try {
            const { id } = request.params;
            let { password, newUserName, newPassword } = request.body;
            
            const user = await connectionDB('moderadores')
                .select('*')
                .where('id', id)
                .whereNot('status', 'deleted')
                .whereNot('status', 'inactive')
                .first();
        
            if(!user) {
                return response.status(400).send({ error: 'User not found' });
            }
            if (!await cryptHanddle.compareUncryptCrypt(password, user.password)) {
                return response.status(400).send({ error: 'Invalid password' });
            }

            newPassword = await cryptHanddle.crypt(newPassword);

            await connectionDB('moderadores').where('id', id).update({
                userName: newUserName,
                password: newPassword,
            })

            response.status(200).send();
        }catch(err) {
            next(err)
        }
    },

    async delete(request, response, next) {
        try {
            const { id } = request.params;
            const moderador = new Moderador(id);
            const result = await moderador.deleteMe();

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