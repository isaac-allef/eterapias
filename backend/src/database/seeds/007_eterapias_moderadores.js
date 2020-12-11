
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('eterapia_moderador').del()
    .then(async function () {
      return knex('eterapia_moderador').insert([
        {
          eterapia_id: 1,
          moderador_id: 1,
        },
        {
          eterapia_id: 2,
          moderador_id: 2,
        },
        {
          eterapia_id: 3,
          moderador_id: 3,
        },
        {
          eterapia_id: 3,
          moderador_id: 4,
        },
        {
          eterapia_id: 4,
          moderador_id: 4,
        },
      ]);
    });
};