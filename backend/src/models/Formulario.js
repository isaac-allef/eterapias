const connectionDB = require("../database/connection");
const { stringToArray, mergeStringArray } = require("../handdles/stringHanddle");
const Model = require("./Model");

class Formulario extends Model {
    constructor() {
        super('formulario');
    }

    list( page=1, 
        limit=5, 
        orderBy='id', 
        ascDesc='asc', 
        id=null,
        participante_id=null,
        get='*'
        ) {

        get = stringToArray(get, ',');

        const query = connectionDB(this.table);

        if(id) {
            return query
                .select(get)
                .where('id', id)
        }

        else if(participante_id) {
            query
            .join('participante_formulario', 'participante_formulario.formulario_id', '=', 'formulario.id')
            .join('participante', 'participante.id', '=', 'participante_formulario.participante_id')
            .where('participante_id', participante_id)
            .select(mergeStringArray('formulario.', get), 'participante.fullName')
        }
        
        else {
            query.select(get);
        }

        return query.orderBy(orderBy, ascDesc)
                    .limit(limit)
                    .offset((page - 1) * limit);
    }

    async linkParticipante(formulario_id, participante_id) {
        return await connectionDB('participante_formulario').insert({
            participante_id: participante_id,
            formulario_id: formulario_id
        })
    }

    async unlinkParticipante(formulario_id, participante_id) {
        return await connectionDB('participante_formulario')
            .where('participante_id', participante_id)
            .andWhere('formulario_id', formulario_id)
            .del();
    }
}

module.exports = new Formulario();