const connectionDB = require('../database/connection');
const cryptHanddle = require('../handdles/cryptHanddle');
const DefaultEntity = require('./DefaultEntity');

module.exports = class Presenca extends DefaultEntity{
    constructor(id) {
        super(id, 'presencas');
    }

    async setStatusActive(active) {
        return this.setMyStatus(active);
    }

    async deleteMe() {
        return this.deleteMeSimple();
    }
}