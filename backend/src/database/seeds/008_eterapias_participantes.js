
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('eterapia_participante').del()
    .then(async function () {
      return knex('eterapia_participante').insert([
        {
          eterapia_id: 1,
          participante_id: 1,
        },
        {
          eterapia_id: 2,
          participante_id: 2,
        },
      ]);
    });
};