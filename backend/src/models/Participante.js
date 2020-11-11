const connectionDB = require("../database/connection");
const { stringToArray, mergeStringArray } = require("../handdles/stringHanddle");
const Model = require("./Model")

class Participante extends Model {
    constructor() {
        super('participante');
    }

    list( page=1, 
        limit=5, 
        orderBy='id', 
        ascDesc='asc', 
        id=null,
        eterapia_id=null,
        get='*'
        ) {
    
        get = stringToArray(get, ',');

        const query = connectionDB(this.table);

        if(id) {
            return query
                .select(get)
                .where('id', id)
        }

        else if(eterapia_id) {
            query
            .join('eterapia_participante', 'eterapia_participante.participante_id', '=', 'participante.id')
            .join('eterapia', 'eterapia.id', '=', 'eterapia_participante.eterapia_id')
            .where('eterapia_id', eterapia_id)
            .select(mergeStringArray('participante.', get), 'eterapia.title')
        }

        else {
            query.select(get);
        }

        return query.orderBy(orderBy, ascDesc)
                    .limit(limit)
                    .offset((page - 1) * limit);;
    }
}

module.exports = new Participante();