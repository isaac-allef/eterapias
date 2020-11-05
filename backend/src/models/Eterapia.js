const connectionDB = require('../database/connection');
const cryptHanddle = require('../handdles/cryptHanddle');
const DefaultEntity = require('./DefaultEntity');
const Moderador = require('./Moderador');
const objectHanddle = require('../handdles/objectHanddle');

module.exports = class Eterapia extends DefaultEntity{
    constructor(id) {
        super(id, 'eterapias');
    }

    async getMyModeradores() {
        return this.getMyRelationshipsWith({
            otherTable: "moderadores", 
            intermediateTable: "eterapias_moderadores", 
            columnMyIdFk: "id_eterapia_fk", 
            columnOtherIdFk: "id_moderador_fk", 
            columnOtherStatus: "status_moderador",
            showInactives: false
        });
    }

    async getMyParticipantes() {
        return this.getMyRelationshipsWith({
            otherTable: "participantes", 
            intermediateTable: "eterapias_participantes", 
            columnMyIdFk: "id_eterapia_fk", 
            columnOtherIdFk: "id_participante_fk", 
            columnOtherStatus: "status_participante",
            showInactives: false
        });
    }

    async setStatusActive(active) {
        return this.setMyStatusActive({
            active: active,
            intermediateTableArray: [
                {
                    tableName: 'eterapias_moderadores',
                    columnMyIdFk: 'id_eterapia_fk',
                    columnMyStatus: 'status_eterapia'
                },
            ]
        });
    }

    async deleteMe() {
        return this.deleteMeDeep({
            intermediateTableArray: [
                {
                    tableName: 'eterapias_moderadores',
                    columnMyIdFk: 'id_eterapia_fk',
                    columnMyStatus: 'status_eterapia'
                },
            ]
        });
    }

    async linking(config = {}) {

        const {check, error} = await this.checkMe();
        if (!check) return {check, error};

        const { id_entity, table, intermediateTable, columnMyIdFk, columnOtherIdFk } = config;

        const entity = new DefaultEntity(id_entity, table);
        const checkError = await entity.checkMe();
        const checkEntity = checkError.check;
        const errorEntity = checkError.error;
        if (!checkEntity) return {checkEntity, errorEntity};


        let object = {
            id_eterapia_fk: this.myId,
            id_entity_fk: id_entity
        }

        object = objectHanddle.renameKey(object, 'id_eterapia_fk', columnMyIdFk);
        object = objectHanddle.renameKey(object, 'id_entity_fk', columnOtherIdFk);
        
        await connectionDB(intermediateTable).insert(object)
        return { check: true, result: "Ok"};
    }

    async unlinking(config = {}) {
        const {check, error} = await this.checkMe();
        if (!check) return {check, error};

        const { id_entity, intermediateTable, columnMyIdFk, columnOtherIdFk } = config;

        await connectionDB(intermediateTable)
                .where(columnMyIdFk, this.myId)
                .andWhere(columnOtherIdFk, id_entity)
                .del();
        
        return { check: true, result: "Ok"};
    }
}