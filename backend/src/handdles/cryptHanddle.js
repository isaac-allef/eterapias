const bcrypt = require('bcrypt');

module.exports = {
    async crypt(password) {
        return await bcrypt.hash(password, 10);
    },

    async compareUncryptCrypt(password, passUncrypt) {
        return await bcrypt.compare(password, passUncrypt);
    }
}