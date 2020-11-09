const connectionDB = require('../database/connection');
const cryptHanddle = require('../handdles/cryptHanddle');
const DiarioDeCampo = require('../models/DiarioDeCampo');
const Encontro = require('../models/Encontro');
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

    async listMyInformations(request, response, next) {
        try {
            const { id } = request.params;

            const moderador = new Moderador(id);
            let result = await moderador.getMyData();
            
            if (!result.check)
                return response.status(500).send({error: result.error})

            result.result.password = undefined;
            
            return response.status(200).send({
                id: id,
                myInformations: result.result
            })
        }catch(err) {
            next(err)
        }
    },

    async listMyEterapias(request, response, next) {
        try {
            const { id } = request.params;

            const moderador = new Moderador(id);
            const result = await moderador.getMyEterapias();

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
        
            const [ id ] = await connectionDB('moderadores').insert({
                userName,
                password,
                fullName,
                email,
                whatsapp_tel,
                city,
                uf,
                college
            }).returning('id');
            return response.status(201).send({ 
                id,
                userName 
            });
        }catch(err) {
            // return response.status(500).send({ error: err.detail});
            next(err)
        }
    },

    async update(request, response, next) {
        try {
            const { id } = request.params;

            const moderador = new Moderador(id);
            const {check, error} = await moderador.checkMe();

            if (!check)
                return response.status(500).send({error: error})
            
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
                college: college,
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
    },



    async listMyDiariosDeCampo(request, response, next) {
        try {
            const { page=1 } = request.query;
            const { id } = request.params;

            const moderador = new Moderador(id);
            const result = await moderador.checkMe();

            if (!result.check)
                return response.status(500).send({error: result.error})

            const diarios_de_campo = await connectionDB('diarios_de_campo')
                .select('*')
                .whereNot('status', 'deleted')
                .whereNot('status', 'inactive')
                .where('id_moderador_fk', id)
                .limit(5)
                .offset((page - 1) * 5);;
            return response.json(diarios_de_campo);
        }catch(err) {
            next(err)
        }
    },

    // async createDiarioDeCampo(request, response, next) {
    //     try {
    //         const {
    //             id_moderador_fk,
    //             id_encontro_fk,
    //             description
    //         } = request.body;

    //         const moderador = new Moderador(id_moderador_fk);
    //         const {check, error} = await moderador.checkMe();

    //         if (!check)
    //             return response.status(500).send({error: error})
            
    //         const encontro = new Encontro(id_encontro_fk);
    //         const {check:c, error:e} = await encontro.checkMe();

    //         if (!c)
    //             return response.status(500).send({error: e})
        
    //         const [ id ] = await connectionDB('diarios_de_campo').insert({
    //             id_moderador_fk,
    //             id_encontro_fk,
    //             description
    //         }).returning('id');
    //         return response.status(201).send({
    //             id,
    //         });
    //     }catch(err) {
    //         next(err)
    //     }
    // },

    // async deleteDiarioDeCampo(request, response, next) {
    //     try {
    //         const { id_moderador, id_diario } = request.params;
            
    //         const moderador = new Moderador(id_moderador);
    //         const {check, error} = await moderador.checkMe();

    //         if (!check)
    //             return response.status(500).send({error: error})
            
    //         const diario = new DiarioDeCampo(id_diario);
    //         const result = await diario.deleteMe();

    //         if (!result.check)
    //             return response.status(500).send({error: result.error})
            
    //         return response.status(200).send({
    //             id_diario: id_diario,
    //             status: result.result
    //         })
    //     }catch(err) {
    //         // return response.status(500).send({ error: err.detail});
    //         next(err)
    //     }
    // },
}