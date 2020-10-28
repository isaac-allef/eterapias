const { GoogleSpreadsheet } = require('google-spreadsheet');
const credenciais = require('./credentials.json');
const arquivo = require('./arquivo.json');

module.exports = {

    async conectionWithSheet (link_id) {
        // console.log(this.link_id);
        const doc = new GoogleSpreadsheet(link_id);
    
        await doc.useServiceAccountAuth({
            client_email: credenciais.client_email,
            private_key: credenciais.private_key.replace(/\\n/g, '\n')
        })
        await doc.loadInfo();
        return doc;
    },

    async loadDatas(link_id) {
        const doc = await this.conectionWithSheet(link_id);
        let sheets = doc.sheetsByIndex;
        
        const titleDocument = doc.title;
        
        let page = [];
        for(const sheet of sheets) {
            const titleSheet = sheet.title;
            // console.log(titleSheet)
    
            await sheet.loadHeaderRow();
            const columns = (sheet.headerValues);
            // console.log(columns)
            
            const data = await sheet.getRows();
            const rows = data.map(row => {
                 return (row._rawData);
            })
            page.push({
                "titleSheet": titleSheet, 
                "columns": columns,
                "rows": rows
            });
        };

        const docJson = {"titleDocument": titleDocument, "sheets": page};
        // console.log(docJson)
        return docJson;
    }
}


// -----------------------------------------------------------------------
// const getDoc = async () => {
//     const doc = new GoogleSpreadsheet(arquivo.id);
    
//     await doc.useServiceAccountAuth({
//         client_email: credenciais.client_email,
//         private_key: credenciais.private_key.replace(/\\n/g, '\n')
//     })
//     await doc.loadInfo();
//     return doc;
// }
// getDoc().then(doc => {
//     console.log(doc.title);
// });

// let sheet;
// getDoc().then(doc => {
//     // console.log(doc.loadHeaderRow();
//     sheet = doc.sheetsByIndex[0];

//     sheet.loadHeaderRow().then(() => {
//         console.log(sheet.headerValues);
//     });
    
//     sheet.getRows().then(rows => {
//         // console.log(rows);
//         rows.map(row => {
//             console.log(row._rawData);
//         })
//     });
// })