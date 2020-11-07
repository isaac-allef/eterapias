const connectionDB = require('../database/connection');
const cryptHanddle = require('../handdles/cryptHanddle');
const DefaultEntity = require('./DefaultEntity');
const Presenca = require('./Presenca');

module.exports = class Encontro extends DefaultEntity{
    constructor(id) {
        super(id, 'encontros');
    }

    async getMyPresencas() {
        return this.getMyRelationshipsWith({
            otherTable: 'presencas',
            columnMyIdFk: 'id_encontro_fk',
            showInactives: false
        });
    }

    // async getMyDiariosDeCampo() {
    //     return this.getMyRelationshipsWith({
    //         otherTable: 'diariosDeCampo',
    //         columnMyIdFk: 'id_encontro_fk',
    //         showInactives = false
    //     });
    // }

    async setStatusActive(active) {

        const result = await this.setMyStatus(active);

        const presencas = await connectionDB('presencas')
                .select('id')
                .whereNot('status', 'deleted')
                .where('id_encontro_fk', this.myId)
        presencas.forEach(async (id) => {
            const presenca = new Presenca(id.id);
            await presenca.setStatusActive(active)
        })

        return result;
    }

    async deleteMe() {

        const result = await this.deleteMeSimple();

        const presencas = await connectionDB('presencas')
                .select('id')
                .whereNot('status', 'deleted')
                .where('id_encontro_fk', this.myId)
        presencas.forEach(async (id) => {
            const presenca = new Presenca(id.id);
            await presenca.deleteMe()
        })

        return result;
    }
}