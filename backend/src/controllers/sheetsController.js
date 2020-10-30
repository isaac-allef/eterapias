const sheet = require('../apiGoogleSheets/connection');

module.exports = {
    async loadDataSheet (request, response) {
        const { link_id } = request.body;
        const data = await sheet.loadDatas(link_id)
        console.log(request.userId)
        return response.json( data );
        // FAZER MAIS PARA FRENTE:
        // aqui ao invés de devolver todos os dados,
        // deve guardar os dados em um banco de dados
        // e devolver apenas uma resposta de confirmação,
        // informando que os dados foram gravados no banco de dados
    }
}