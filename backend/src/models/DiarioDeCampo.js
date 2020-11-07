const connectionDB = require('../database/connection');
const cryptHanddle = require('../handdles/cryptHanddle');
const DefaultEntity = require('./DefaultEntity');

module.exports = class DiarioDeCampo extends DefaultEntity{
    constructor(id) {
        super(id, 'diarios_de_campo');
    }

    async setStatusActive(active) {
        if(active) {
            const data = await this.mydata;
            // console.log(data)
            const moderador = await connectionDB('moderadores')
                .select('*')
                .where('id', data.id_moderador_fk)
                .first()
            const encontro = await connectionDB('encontros')
                .select('*')
                .where('id', data.id_encontro_fk)
                .first()
                
            if(moderador.status === 'active' && encontro.status === 'active')
                return this.setMyStatus(active);
            else
                return 0;
        }else {
            return this.setMyStatus(active);
        }
        
    }

    async deleteMe() {
        return this.deleteMeSimple();
    }
}