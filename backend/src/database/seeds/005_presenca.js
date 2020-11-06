
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('presencas').del()
    .then(async function () {
      return knex('presencas').insert([
        {
          id_participante_fk: 1,
          id_encontro_fk: 1
        },
      ]);
    });
};
