const bcrypt = require('bcrypt');
const connectionDB = require('../database/connection');

module.exports = {
    async list(request, response) {
        const moderadores = await connectionDB('moderadores').select('*').whereNot('status', 'deleted');
        
        moderadores.forEach( (moderador) => {
            moderador.password = undefined;
        });
        
        return response.json(moderadores);
    },

    async create(request, response) {
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

        password = await bcrypt.hash(password, 10);

        try {
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
            return response.json( userName );
        }catch(err) {
            return response.status(400).send({ error: err.detail});
        }
    },

    async delete(request, response) {
        const { id } = request.params;

        try {
            const { status } = await connectionDB('moderadores').select('status').where('id', id).first();
            
            if (!status || status === 'deleted')
                return response.status(400).send({ error: "Not found"});
            
            await connectionDB('moderadores').where('id', id).update({status: 'deleted'})
            
            return response.status(204).send();
        }catch(err) {
            return response.status(400).send({ error: err.detail});
        }
    }
}