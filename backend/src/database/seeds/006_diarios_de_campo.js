
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('diarios_de_campo').del()
    .then(async function () {
      return knex('diarios_de_campo').insert([
        {
          id_moderador_fk: 1,
          id_encontro_fk: 1,
          description: 'Foi muito bom! Os participantes estavam animados.'
        },
      ]);
    });
};