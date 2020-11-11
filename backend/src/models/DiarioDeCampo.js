const connectionDB = require("../database/connection");
const { stringToArray, mergeStringArray } = require("../handdles/stringHanddle");
const Model = require("./Model")

class DiarioDeCampo extends Model {
    constructor() {
        super('diario_de_campo');
    }

    list( page=1, 
        limit=5, 
        orderBy='id', 
        ascDesc='asc',
        id=null,
        moderador_id=null,
        encontro_id=null,
        get='*'
        ) {

        get = stringToArray(get, ',');
        
        const query = connectionDB(this.table);
        
        if(moderador_id) {
            query
            .where('moderador_id', moderador_id)
            .join('moderador', 'moderador.id', '=', 'diario_de_campo.moderador_id')
            .select('diario_de_campo.*', 'moderador.fullName')
        }

        else if(encontro_id) {
            query
            .where('encontro_id', encontro_id)
            .join('encontro', 'encontro.id', '=', 'diario_de_campo.encontro_id')
            .select(mergeStringArray('diario_de_campo.', get), 'encontro.dateTime')
        }

        else if(id) {
            return query
                .select(get)
                .where('id', id)
        }

        else {
            query.select(get);
        }

        return query.orderBy(orderBy, ascDesc)
                    .limit(limit)
                    .offset((page - 1) * limit);
    }
}

module.exports = new DiarioDeCampo();