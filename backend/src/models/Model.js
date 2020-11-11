const { table } = require('../database/connection');
const connectionDB = require('../database/connection');
const cryptHanddle = require('../handdles/cryptHanddle');

module.exports = class Model {
    constructor(table) {
        this.table = table;
    }

    list( page=1, 
                limit=5, 
                orderBy='id', 
                ascDesc='asc', 
                id=null
                ) {

        const query = connectionDB(this.table);

        if (!id) {
            const objectList = query
                            .select('*')
                            .orderBy(orderBy, ascDesc)
                            .limit(limit)
                            .offset((page - 1) * limit);
                            // .where('deleted_at', null)
            return objectList;
        }
        else {
            const object = query
                            .select('*')
                            .where('id', id)
                // .where('deleted_at', null)
            return object;
        }
    }

    async create(attributes) {
        
        const [ id ] = await connectionDB(this.table).insert(attributes).returning('id');
        return id;
    }

    update(id, attributes) {
        return connectionDB(this.table)
            .where('id', id)
            .update(attributes);
        // .where('deleted_at', null)
    }

    delete(id) {
        // return await connectionDB(this.table).where('id', id)
        // .where('deleted_at', null)
        // .update({
        //     deleted_at: connectionDB.fn.now()
        // })
        return connectionDB(this.table).where('id', id).del()
    }
}