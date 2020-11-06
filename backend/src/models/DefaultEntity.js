const connectionDB = require('../database/connection');
const cryptHanddle = require('../handdles/cryptHanddle');

module.exports = class DefaultEntity {
    constructor(id, table) {
        this.myId = id;
        this.table = table;
        this.mydata = this.downloadMyData(id);
    }

    async downloadMyData(id) {
        try {
            return await connectionDB(this.table)
                    .select('*')
                    .where('id', id)
                    .first();
        }
        catch(err) {
            return {error: err}
        }
    }

    async getMyData() {
        const {check, error} = await this.checkMe();
        if (!check) return {check, error};

        const result = await this.mydata;

        return { check: true, result: result};
    }

    async iExist() {
        const data = await this.mydata;
        if (data) return true
        return false
    }

    async isDeleted() {
        const data = await this.mydata
        if (!data) return {error: 'Entity not exists'}
        if (data.status === 'deleted')
            return true;
        return false;
    }

    async isActive() {
        const data = await this.mydata
        if (!data) return {error: 'Entity not exists'}
        if (data.status === 'active')
            return true;
        return false;
    }

    async checkMe(check = {activeChech: true}) {
        if (!await this.iExist()) return {check: false, error: "Entity not exists or DB connection failed"}
        if (await this.isDeleted()) return {check: false, error: "Entity deleted"}
        if (check.activeChech && !await this.isActive()) return {check: false, error: "Entity inactive"}
        return {check: true, error: false}
    }

    async getMyRelationshipsWith(config = {}) {
        const {check, error} = await this.checkMe();
        if (!check) return {check, error};

        const { otherTable, 
                intermediateTable, 
                columnMyIdFk, 
                columnOtherIdFk, 
                columnOtherStatus,
                showInactives = false } = config;
        
        const relationships = await connectionDB(otherTable)
            .select(`${otherTable}.*`)
            .join(`${intermediateTable}`, `${otherTable}.id`, '=', `${intermediateTable}.${columnOtherIdFk}`)
            .where(`${intermediateTable}.${columnMyIdFk}`, '=', this.myId)
            .whereNot(`${intermediateTable}.${columnOtherStatus}`, 'deleted')
            .whereNot(showInactives ? false : `${intermediateTable}.${columnOtherStatus}`, 'inactive');
        
            return { check: true, result: relationships};
    }

    async setMyStatusActive(config = {}) {
        const {check, error} = await this.checkMe({ activeCheck: false });
        if (!check) return {check, error};

        const { 
            active = true,
            intermediateTableArray = [
                {tableName, columnMyIdFk, columnMyStatus}
            ]
         } = config;
        
        const isActive = await this.isActive();

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
                intermediateTableArray.forEach(async table => {
                    await connectionDB(table.tableName)
                        .update(`${table.columnMyStatus}`, flag)
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
            intermediateTableArray = [
                {tableName, columnMyIdFk, columnMyStatus}
            ],
         } = config;
        await connectionDB.transaction(async trans => {
            try {
                await connectionDB(this.table).where('id', this.myId).update({
                    status: "deleted",
                    updated_at: connectionDB.fn.now()
                })
                intermediateTableArray.forEach(async table => {
                    await connectionDB(table.tableName)
                        .update(`${table.columnMyStatus}`, "deleted")
                        .where(table.columnMyIdFk, this.myId)
                });
            }catch(err) {
                return {error: err}
            }
        })

        return { check: true, result: 'deleted'};
    }
}