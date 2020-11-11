const connectionDB = require("../database/connection");
const { stringToArray, mergeStringArray } = require("../handdles/stringHanddle");
const Model = require("./Model")

class Moderador extends Model {
    constructor() {
        super('moderador');
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
            .join('eterapia_moderador', 'eterapia_moderador.moderador_id', '=', 'moderador.id')
            .join('eterapia', 'eterapia.id', '=', 'eterapia_moderador.eterapia_id')
            .where('eterapia_id', eterapia_id)
            .select(mergeStringArray('moderador.', get), 'eterapia.title')
        }

        else {
            query.select(get);
        }

        return query.orderBy(orderBy, ascDesc)
                    .limit(limit)
                    .offset((page - 1) * limit);
    }
}

module.exports = new Moderador();