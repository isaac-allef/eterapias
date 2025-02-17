const jwt = require('jsonwebtoken');

const connectionDB = require('../database/connection');
const authConfig = require('../config/auth.json');
const cryptHanddle = require('../handdles/cryptHanddle');

module.exports = {
    async authenticationModeradores (request, response) {
        const { userName, password } = request.body;
    
        const user = await connectionDB('moderador')
            .select('*')
            .where('userName', userName)
            // .whereNot('status', 'deleted')
            // .whereNot('status', 'inactive')
            .first();
    
        if(!user) {
            return response.status(404).send({ error: 'User not found' });
        }
        // const pass = await bcrypt.hash(user.password, 10)
        if (!await cryptHanddle.compareUncryptCrypt(password, user.password)) {
            return response.status(400).send({ error: 'Invalid password' });
        }
    
        user.password = undefined;
    
        const token = jwt.sign({ id: user.id }, authConfig.secret, {
            expiresIn: 86400,
        });

        response.send({ user, token })
    }
}