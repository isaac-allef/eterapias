const connectionDB = require("../database/connection");
const { mergeStringArray, stringToArray } = require("../handdles/stringHanddle");
const Model = require("./Model")

class Eterapia extends Model {
    constructor() {
        super('eterapia');
    }

    list( page=1, 
        limit=5, 
        orderBy='id', 
        ascDesc='asc', 
        id=null,
        moderador_id=null,
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

        else if(moderador_id) {
            query
            .join('eterapia_moderador', 'eterapia_moderador.eterapia_id', '=', 'eterapia.id')
            .join('moderador', 'moderador.id', '=', 'eterapia_moderador.moderador_id')
            .where('moderador_id', moderador_id)
            .select(mergeStringArray('eterapia.', get), 'moderador.fullName')
        }

        else if(participante_id) {
            query
            .join('eterapia_participante', 'eterapia_participante.eterapia_id', '=', 'eterapia.id')
            .join('participante', 'participante.id', '=', 'eterapia_participante.participante_id')
            .where('participante_id', participante_id)
            .select(mergeStringArray('eterapia.', get), 'participante.fullName')
        }
        
        else {
            query.select(get);
        }

        return query.orderBy(orderBy, ascDesc)
                    .limit(limit)
                    .offset((page - 1) * limit);
    }

    async linkModerador(id_eterapia, id_moderador) {
        return await connectionDB('eterapia_moderador').insert({
            eterapia_id: id_eterapia,
            moderador_id: id_moderador
        })
    }

    async unlinkModerador(id_eterapia, id_moderador) {
        return await connectionDB('eterapia_moderador')
            .where('eterapia_id', id_eterapia)
            .andWhere('moderador_id', id_moderador)
            .del();
    }

    async linkParticipante(id_eterapia, id_participante) {
        return await connectionDB('eterapia_participante').insert({
            eterapia_id: id_eterapia,
            participante_id: id_participante
        })
    }

    async unlinkParticipante(id_eterapia, id_participante) {
        return await connectionDB('eterapia_participante')
            .where('eterapia_id', id_eterapia)
            .andWhere('participante_id', id_participante)
            .del();
    }
}

module.exports = new Eterapia();