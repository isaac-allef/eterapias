const connectionDB = require('../database/connection');
const cryptHanddle = require('../crypt/cryptHanddle');

module.exports = {
    async list(request, response, next) {
        try {
            const { page=1 } = request.query;
            const moderadores = await connectionDB('moderadores')
            .select('*')
            .whereNot('status', 'deleted')
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

            const { status } = await connectionDB('moderadores')
                .select('status')
                .where('id', myId)
                .first();
            
            if (!status || status === 'deleted')
                return response.status(400).send({ error: "Moderador not found"});

            const result = await connectionDB('eterapias')
                .select('eterapias.*')
                .join('eterapias_moderadores', 'eterapias.id', '=', 'eterapias_moderadores.id_eterapia_fk')
                .where('eterapias_moderadores.id_moderador_fk', myId)
                .whereNot('eterapias_moderadores.status_eterapia', 'deleted');
            return response.status(200).send(result)
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

    async updateLoginPass(request, response, next) {
        try {
            const { id } = request.params;
            let { password, newUserName, newPassword } = request.body;
            
            const user = await connectionDB('moderadores')
                .select('*')
                .where('id', id)
                .whereNot('status', 'deleted')
                .whereNot('status', 'no active')
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
            const { status } = await connectionDB('moderadores')
                .select('status')
                .where('id', id)
                .first();
            
            if (!status || status === 'deleted')
                return response.status(400).send({ error: "Not found"});
            
            await connectionDB.transaction(async trans => {
                try {
                    await connectionDB('moderadores').where('id', id).update({status: 'deleted'})
                    await connectionDB('eterapias_moderadores')
                        .update({status_moderador: 'deleted'})
                        .where('id_moderador_fk', id)
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