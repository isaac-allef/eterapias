const connectionDB = require("../database/connection");
const { stringToArray, mergeStringArray } = require("../handdles/stringHanddle");
const Model = require("./Model")

class Encontro extends Model {
    constructor() {
        super('encontro');
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

        if(eterapia_id) {
            query
            .where('eterapia_id', eterapia_id)
            .join('eterapia', 'eterapia.id', '=', 'encontro.eterapia_id')
            .select(mergeStringArray('encontro.', get), 'eterapia.title')
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
                    .offset((page - 1) * limit);;
    }
}

module.exports = new Encontro();