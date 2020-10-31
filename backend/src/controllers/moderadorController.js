const connectionDB = require('../database/connection');
const cryptHanddle = require('../crypt/cryptHanddle');

module.exports = {
    async list(request, response, next) {
        try {
            const moderadores = await connectionDB('moderadores').select('*').whereNot('status', 'deleted');
            
            moderadores.forEach( (moderador) => {
                moderador.password = undefined;
            });
            
            return response.json(moderadores);
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
            
            await connectionDB('moderadores').where('id', id).update({status: 'deleted'})
            
            return response.status(204).send();
        }catch(err) {
            // return response.status(500).send({ error: err.detail});
            next(err)
        }
    }
}