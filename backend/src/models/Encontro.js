const connectionDB = require('../database/connection');
const cryptHanddle = require('../handdles/cryptHanddle');
const DefaultEntity = require('./DefaultEntity');
const DefaultSimpleEntity = require('./DefaultSimpleEntity');

module.exports = class Encontro extends DefaultSimpleEntity{
    constructor(id) {
        super(id, 'encontros');
    }

    // async getMyPresencas() {
    //     return this.getMyRelationshipsWith({
    //         otherTable: 'presencas',
    //         columnMyIdFk: 'id_encontro_fk',
    //         showInactives: false
    //     });
    // }

    // async getMyDiariosDeCampo() {
    //     return this.getMyRelationshipsWith({
    //         otherTable: 'diariosDeCampo',
    //         columnMyIdFk: 'id_encontro_fk',
    //         showInactives = false
    //     });
    // }

    async setStatusActive(active) {
        return this.setMyStatusActive({
            active,
            subTableArray: [
                {
                    tableName: 'presencas',
                    columnMyIdFk: 'id_encontro_fk'
                },
            ]
        });
    }

    async deleteMe() {
        return this.deleteMeDeep({
            subTableArray: [
                {
                    tableName: 'presencas',
                    columnMyIdFk: 'id_encontro_fk'
                },
            ]
        });
    }
}