const connectionDB = require('../database/connection');
const cryptHanddle = require('../handdles/cryptHanddle');
const DefaultEntity = require('./DefaultEntity');

module.exports = class Presenca extends DefaultEntity{
    constructor(id) {
        super(id, 'presencas');
    }

    async setStatusActive(active) {
        if(active) {
            const data = await this.mydata;
            // console.log(data)
            const participante = await connectionDB('participantes')
                .select('*')
                .where('id', data.id_participante_fk)
                .first()
            const encontro = await connectionDB('encontros')
                .select('*')
                .where('id', data.id_participante_fk)
                .first()
                
            if(participante.status === 'active' && encontro.status === 'active')
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