const connectionDB = require('../database/connection');
const cryptHanddle = require('../crypt/cryptHanddle');

module.exports = class DefaultEntity {
    constructor(id, table) {
        this.myId = id;
        this.mydata = this.downloadMyData(id, table);
    }

    async downloadMyData(id, table) {
        try {
            return await connectionDB(table)
                    .select('*')
                    .where('id', id)
                    .first();
        }
        catch(err) {
            return {error: err}
        }
    }

    async getMyData() {
        return await this.mydata;
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
}