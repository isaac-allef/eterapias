const connectionDB = require('../database/connection');
const cryptHanddle = require('../handdles/cryptHanddle');
const Moderador = require('../models/Moderador');

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
            const moderadoresList = await Moderador.list(page, limit, orderBy, ascDesc, id, eterapia_id, get)
            return response.json({
                "metadata": {
                    page, 
                    limit, 
                    orderBy, 
                    ascDesc, 
                    id,
                    eterapia_id,
                    get
                },
                "result": moderadoresList
            });
        }catch(err) {
            next(err)
        }
    },

    async create(request, response, next) {
        try {
            const {
                userName,
                password,
                fullName,
                email,
                whatsapp_tel,
                city,
                uf,
                college
            } = request.body;

            const id = await Moderador.create({
                userName,
                password,
                fullName,
                email,
                whatsapp_tel,
                city,
                uf,
                college
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
                userName,
                password,
                fullName,
                email,
                whatsapp_tel,
                city,
                uf,
                college
            } = request.body;

            const numberOfRawUpdated = await Moderador.update(id, {
                userName,
                password,
                fullName,
                email,
                whatsapp_tel,
                city,
                uf,
                college
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

            const numberOfRawDeleted = await Moderador.delete(id)
            
            if(!numberOfRawDeleted)
                return response.status(404).json({status: 'Moderador not found'})

            return response.status(200).json();
        }catch(err) {
            next(err)
        }
    },

    

    async updateLoginPass(request, response, next) {
        try {
            let { userName, password, newUserName, newPassword } = request.body;
            
            const user = await connectionDB('moderador')
                .select('*')
                .where('userName', userName)
                .first();
        
            if(!user) {
                return response.status(400).send({ error: 'User not found' });
            }
            if (!await cryptHanddle.compareUncryptCrypt(password, user.password)) {
                return response.status(400).send({ error: 'Invalid password' });
            }

            newPassword = await cryptHanddle.crypt(newPassword);

            await connectionDB('moderador').where('userName', userName).update({
                userName: newUserName,
                password: newPassword,
            })

            response.status(200).send();
        }catch(err) {
            next(err)
        }
    },

    // Só moderador pode
    async readMe(request, response, next) {
        try{
            const { 
                page=1, 
                limit=5, 
                orderBy='fullName', 
                ascDesc='asc', 
                get='*'
            } = request.query;
            const id = request.userId;
            
            const me = await Moderador.list(page, limit, orderBy, ascDesc, id, null, get)
            return response.json({
                "metadata": {
                    id,
                    get
                },
                "result": me
            });
        }catch(err) {
            next(err)
        }
    }
}