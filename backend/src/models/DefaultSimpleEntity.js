const connectionDB = require('../database/connection');
const DefaultEntity = require('./DefaultEntity');

module.exports = class DefaultSimpleEntity extends DefaultEntity {
    constructor(id, table) {
        super(id, table);
    }

    async getMyRelationshipsWith(config = {}) {
        const {check, error} = await this.checkMe();
        if (!check) return {check, error};

        const { otherTable,
                columnMyIdFk,
                showInactives = false } = config;
        
        const relationships = await connectionDB(otherTable)
            .select(`${otherTable}.*`)
            .where(columnMyIdFk, this.myId)
            .whereNot(`${otherTable}.status`, 'deleted')
            .whereNot(showInactives ? false : `${otherTable}.status`, 'inactive');
        
            return { check: true, result: relationships};
    }

    async setMyStatusActive(config = {}) {
        const {check, error} = await this.checkMe({ activeCheck: false });
        if (!check) return {check, error};
        
        const { 
            active = true,
            subTableArray = [ tableName, columnMyIdFk ]
        } = config;

         const isActive = await this.isActive();
        //  console.log(isActive)
        //  console.log(active)

         let flag
             if (active === false && isActive === true)
                 flag = 'inactive'
             else if (active === true && isActive === false)
                 flag = 'active'
             else
                 return { error: "This setting is already working" };
        
        await connectionDB.transaction(async trans => {
            try {
                await connectionDB(this.table).where('id', this.myId).update({
                    status: flag,
                    updated_at: connectionDB.fn.now()
                })
                subTableArray.forEach(async table => {
                    await connectionDB(table.tableName)
                        .update("status", flag)
                        .where(table.columnMyIdFk, this.myId)
                });
            }catch(err) {
                return {error: err}
            }
        })

        return { check: true, result: flag};
    }

    async deleteMeDeep(config = {}) {
        const {check, error} = await this.checkMe();
        if (!check) return {check, error};

        const { 
            subTableArray = [ tableName, columnMyIdFk ]
        } = config;
        
        await connectionDB.transaction(async trans => {
            try {
                await connectionDB(this.table).where('id', this.myId).update({
                    status: 'deleted',
                    updated_at: connectionDB.fn.now()
                })
                subTableArray.forEach(async table => {
                    await connectionDB(table.tableName)
                        .update("status", "deleted")
                        .where(table.columnMyIdFk, this.myId)
                });
            }catch(err) {
                return {error: err}
            }
        })

        return { check: true, result: 'deleted'};
    }

}