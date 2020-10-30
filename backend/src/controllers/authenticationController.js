const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const connectionDB = require('../database/connection');
const authConfig = require('../config/auth.json');

module.exports = {
    async authenticationModeradores (request, response) {
        const { userName, password } = request.body;
    
        const user = await connectionDB('moderadores')
            .select('*')
            .where('userName', userName)
            .first();
    
        if(!user) {
            return response.status(400).send({ error: 'User not found' });
        }
        const pass = await bcrypt.hash(user.password, 10)
        if (!await bcrypt.compare(password, /*user.password*/pass)) {
            return response.status(400).send({ error: 'Invalid password' });
        }
    
        user.password = undefined;
    
        const token = jwt.sign({ id: user.id }, authConfig.secret, {
            expiresIn: 86400,
        });

        response.send({ user, token })
    }
}