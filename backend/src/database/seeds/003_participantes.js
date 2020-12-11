
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('participante').del()
    .then(async function () {
      return knex('participante').insert([
        {
          fullName: 'Lavinia Santos Trindade', 
          email: 'lavinia@gmail.com', 
          whatsapp_tel: '73988101010', 
          city: 'Itapé', 
          uf: 'BA', 
          sex: 'F'
        },
        {
          fullName: 'Isaac Allef Santos Cruz', 
          email: 'isaac@gmail.com', 
          whatsapp_tel: '73988443322', 
          city: 'Itapé', 
          uf: 'BA', 
          sex: 'M'
        },
        {
          fullName: 'Harleen Frances Quinzel', 
          email: 'arlequina@gmail.com', 
          whatsapp_tel: '73988000000', 
          city: 'Gotan', 
          uf: 'BA', 
          sex: 'F'
        },
        {
          fullName: 'Bruce Thomas Wayne', 
          email: 'batman@gmail.com', 
          whatsapp_tel: '73988777777', 
          city: 'Gotan', 
          uf: 'BA', 
          sex: 'M'
        },
        {
          fullName: 'Wade Winston Wilson', 
          email: 'deadpool@gmail.com', 
          whatsapp_tel: '73988987654', 
          city: 'New York', 
          uf: 'BA', 
          sex: 'M'
        },
        {
          fullName: 'Clark Joseph Kent', 
          email: 'superman@gmail.com', 
          whatsapp_tel: '73988123456', 
          city: 'Metropolis', 
          uf: 'BA', 
          sex: 'M'
        },
      ]);
    });
};
