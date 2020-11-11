
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('diario_de_campo').del()
    .then(async function () {
      return knex('diario_de_campo').insert([
        {
          moderador_id: 1,
          encontro_id: 1,
          description: 'Foi muito bom! Os participantes estavam animados.'
        },
        {
          moderador_id: 2,
          encontro_id: 2,
          description: 'Foi ótmo! Mas poderia ser melhor.'
        },
      ]);
    });
};