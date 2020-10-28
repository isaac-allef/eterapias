
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('moderadores').del()
    .then(function () {
      // Inserts seed entries
      return knex('moderadores').insert([
        {
          userName: 'isaac_allef', 
          fullName: 'Isaac Allef Santos Cruz', 
          email: 'isaac_allef@hotmail.com', 
          whatsapp_tel: '73988696833', 
          city: 'Itapé', 
          uf: 'BA', 
          college: 'UESC'
        },
        {
          userName: 'curinga_hahaha', 
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
