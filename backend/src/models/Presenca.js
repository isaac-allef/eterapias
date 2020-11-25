const connectionDB = require("../database/connection");
const Model = require("./Model")

class Presenca extends Model {
    constructor() {
        super('presenca');
    }

    list( page=1, 
        limit=5, 
        orderBy='id', 
        ascDesc='asc',
        participante_id=null,
        encontro_id=null
        ) {
        
        const query = connectionDB(this.table);
        
        if(participante_id) {
            query
            .where('participante_id', participante_id)
            .join('participante', 'participante.id', '=', 'presenca.participante_id')
            .select('presenca.*', 'participante.fullName')
        }
        else if(encontro_id) {
            query
            .where('encontro_id', encontro_id)
            .join('encontro', 'encontro.id', '=', 'presenca.encontro_id')
            .select('presenca.*', 'encontro.dateTime')
        }

        return query.orderBy(orderBy, ascDesc)
                    .limit(limit)
                    .offset((page - 1) * limit);
    }

    delete(participante_id, encontro_id) {
        // return await connectionDB(this.table)
        //     .where('participante_id', participante_id)
        //     .where('encontro_id', encontro_id)
        //     .update({
        //         deleted_at: connectionDB.fn.now()
        //     })
        if(!participante_id) {
        	return connectionDB(this.table)
        		.where('encontro_id', encontro_id)
        		.del()
        }
        return connectionDB(this.table)
            .where('participante_id', participante_id)
            .andWhere('encontro_id', encontro_id)
            .del()
    }
}

module.exports = new Presenca();
