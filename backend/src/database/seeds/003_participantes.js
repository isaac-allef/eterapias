
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('participante').del()
    .then(async function () {
      return knex('participante').insert([
        {
          fullName: 'Lavinia Santos Trindade', 
          email: 'lavinia@gmail.com', 
          whatsapp_tel: '73988109997', 
          city: 'Itapé', 
          uf: 'BA', 
          sex: 'F'
        },
        {
          fullName: 'Harleen Frances Quinzel', 
          email: 'arlequina@gmail.com', 
          whatsapp_tel: '73988000000', 
          city: 'Gotan', 
          uf: 'BA', 
          sex: 'F'
        },
      ]);
    });
};
