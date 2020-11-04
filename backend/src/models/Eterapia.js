const connectionDB = require('../database/connection');
const cryptHanddle = require('../crypt/cryptHanddle');
const DefaultEntity = require('./DefaultEntity');
const Moderador = require('./Moderador');

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

        const { id_entity, table, intermediateTable } = config;
        
        if(table != 'moderadores' && table != 'participantes')
            return {check: false, error: "Table cannot be linked a eterapia in N to N"}

        const entity = new DefaultEntity(id_entity, table);
        const checkError = await entity.checkMe();
        const checkEntity = checkError.check;
        const errorEntity = checkError.error;
        if (!checkEntity) return {checkEntity, errorEntity};
        
        let object = {};
        if (table === 'moderadores') {
            object = {
                id_eterapia_fk: this.myId,
                id_moderador_fk: id_entity
            }
        }else if (table === 'participantes') {
            object = {
                id_eterapia_fk: this.myId,
                id_participante_fk: id_entity
            }
        }
        await connectionDB(intermediateTable).insert(object)
        return { check: true, result: "Ok"};
    }

    async unlinking(config = {}) {
        const {check, error} = await this.checkMe();
        if (!check) return {check, error};

        const { intermediateTable, columnMyIdFk, columnOtherIdFk, id_otherEntity } = config;

        await connectionDB(intermediateTable)
                .where(columnMyIdFk, this.myId)
                .andWhere(columnOtherIdFk, id_otherEntity)
                .del();
        
        return { check: true, result: "Ok"};
    }
}