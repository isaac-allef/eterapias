const connectionDB = require('../database/connection');
const cryptHanddle = require('../crypt/cryptHanddle');
const DefaultEntity = require('./DefaultEntity');

module.exports = class Moderador extends DefaultEntity{
    constructor(id) {
        super(id, 'moderadores');
    }

    async getMyEterapias() {
        const {check, error} = await this.checkMe();
        if (!check) return {check, error};
        
        const myEterapias = await connectionDB('eterapias')
            .select('eterapias.*')
            .join('eterapias_moderadores', 'eterapias.id', '=', 'eterapias_moderadores.id_eterapia_fk')
            .where('eterapias_moderadores.id_moderador_fk', this.myId)
            .whereNot('eterapias_moderadores.status_eterapia', 'deleted');
        return { check: true, result: myEterapias};
    }

    async setStatusActive(active) {
        const {check, error} = await this.checkMe({ activeCheck: false });
        if (!check) return {check, error};
        let flag
            if (active === false)
                flag = 'inactive'
            else
                flag = 'active'
        await connectionDB.transaction(async trans => {
            try {
                await connectionDB('moderadores').where('id', this.myId).update({status: flag})
                await connectionDB('eterapias_moderadores')
                    .update({status_moderador: flag})
                    .where('id_moderador_fk', this.myId)
            }catch(err) {
                return {error: err}
            }
        })

        return { check: true, result: flag};
    }

    async deleteMe() {
        const {check, error} = await this.checkMe();
        if (!check) return {check, error};
        await connectionDB.transaction(async trans => {
            try {
                await connectionDB('moderadores').where('id', this.myId).update({status: 'deleted'})
                await connectionDB('eterapias_moderadores')
                    .update({status_moderador: 'deleted'})
                    .where('id_moderador_fk', this.myId)
            }catch(err) {
                return { error: err }
            }
        })

        return { check: true, result: 'deleted'};
    }
}