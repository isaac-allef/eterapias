const bcrypt = require('bcrypt');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('moderador').del()
    .then(async function () {
      // Inserts seed entries
      // const password = await bcrypt.hash('123', 10);
      return knex('moderador').insert([
        {
          userName: 'daniela', 
          password: await bcrypt.hash('111', 10),
          fullName: 'Daniela da Silva Rodrigues', 
          email: 'daniela@hotmail.com', 
          whatsapp_tel: '73988121212', 
          city: 'Ilhéus', 
          uf: 'BA', 
          college: 'UESC',
          professional: 'Psicóloga'
        },
        {
          userName: 'ana', 
          password: await bcrypt.hash('222', 10),
          fullName: 'Ana Maria Alvarenga', 
          email: 'ana@gmail.com', 
          whatsapp_tel: '73988999999', 
          city: 'Salobrinho', 
          uf: 'BA', 
          college: 'UESC',
          professional: 'Ginasta'
        },
        {
          userName: 'rosane', 
          password: await bcrypt.hash('333', 10),
          fullName: 'Rosane Lopes Araújo Magalhães', 
          email: 'ana@gmail.com', 
          whatsapp_tel: '73988656565', 
          city: 'Salobrinho', 
          uf: 'BA', 
          college: 'UESC',
          professional: 'Terapeuta'
        },
        {
          userName: 'jessica', 
          password: await bcrypt.hash('444', 10),
          fullName: 'Jessica Novaes Mascarenhas', 
          email: 'jessica@gmail.com', 
          whatsapp_tel: '73988383838', 
          city: 'Ilhéus', 
          uf: 'BA', 
          college: 'UESC',
          professional: 'Astronauta'
        },
      ]);
    });
};
