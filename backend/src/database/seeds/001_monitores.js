const bcrypt = require('bcrypt');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('moderador').del()
    .then(async function () {
      // Inserts seed entries
      // const password = await bcrypt.hash('123', 10);
      return knex('moderador').insert([
        {
          userName: 'isaac_allef', 
          password: await bcrypt.hash('123', 10),
          fullName: 'Isaac Allef Santos Cruz', 
          email: 'isaac_allef@hotmail.com', 
          whatsapp_tel: '73988696833', 
          city: 'Itapé', 
          uf: 'BA', 
          college: 'UESC'
        },
        {
          userName: 'curinga_hahaha', 
          password: await bcrypt.hash('321', 10),
          fullName: 'Curinga Santos da Silva', 
          email: 'hahaha@hahaha.com', 
          whatsapp_tel: '73988999999', 
          city: 'Estiva', 
          uf: 'BA', 
          college: 'UESC'
        },
      ]);
    });
};
