const sheet = require('../apiGoogleSheets/connection');

module.exports = {
    async loadDataSheet (request, response) {
        const { link_id } = request.body;
        console.log(request.userId)
        try {
            const data = await sheet.loadDatas(link_id)
            return response.json( data );
        }catch(err) {
            return response.status(500).send({ error: err.message});
        }
        // FAZER MAIS PARA FRENTE:
        // aqui ao invés de devolver todos os dados,
        // deve guardar os dados em um banco de dados
        // e devolver apenas uma resposta de confirmação,
        // informando que os dados foram gravados no banco de dados
    }
}