const connectionDB = require('../database/connection');
const cryptHanddle = require('../handdles/cryptHanddle');
const DefaultEntity = require('./DefaultEntity');

module.exports = class Moderador extends DefaultEntity{
    constructor(id) {
        super(id, 'moderadores');
    }

    async getMyEterapias() {
        return this.getMyRelationshipsWithNtoN({
            otherTable: "eterapias", 
            intermediateTable: "eterapias_moderadores", 
            columnMyIdFk: "id_moderador_fk", 
            columnOtherIdFk: "id_eterapia_fk", 
            columnOtherStatus: "status_eterapia",
            showInactives: false
        });
    }

    async setStatusActive(active) {
        this.setMyStatus(active)
        return this.setMyStatusActiveNtoN({
            active: active,
            intermediateTableArray: [
                {
                    tableName: 'eterapias_moderadores',
                    columnMyIdFk: 'id_moderador_fk',
                    columnMyStatus: 'status_moderador'
                },
            ]
        });

        // const {check, error} = await this.checkMe({ activeCheck: false });
        // if (!check) return {check, error};
        // let flag
        //     if (active === false)
        //         flag = 'inactive'
        //     else
        //         flag = 'active'
        // await connectionDB.transaction(async trans => {
        //     try {
        //         await connectionDB('moderadores').where('id', this.myId).update({status: flag})
        //         await connectionDB('eterapias_moderadores')
        //             .update({status_moderador: flag})
        //             .where('id_moderador_fk', this.myId)
        //     }catch(err) {
        //         return {error: err}
        //     }
        // })

        // return { check: true, result: flag};
    }

    async deleteMe() {
        return this.deleteMeDeepNtoN({
            intermediateTableArray: [
                {
                    tableName: 'eterapias_moderadores',
                    columnMyIdFk: 'id_moderador_fk',
                    columnMyStatus: 'status_moderador'
                },
            ]
        });

        // const {check, error} = await this.checkMe();
        // if (!check) return {check, error};
        // await connectionDB.transaction(async trans => {
        //     try {
        //         await connectionDB('moderadores').where('id', this.myId).update({status: 'deleted'})
        //         await connectionDB('eterapias_moderadores')
        //             .update({status_moderador: 'deleted'})
        //             .where('id_moderador_fk', this.myId)
        //     }catch(err) {
        //         return { error: err }
        //     }
        // })

        // return { check: true, result: 'deleted'};
    }
}