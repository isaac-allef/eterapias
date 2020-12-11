
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
          eterapia_id: 1,
          participante_id: 2,
        },
        {
          eterapia_id: 1,
          participante_id: 3,
        },
        {
          eterapia_id: 1,
          participante_id: 4,
        },

        {
          eterapia_id: 2,
          participante_id: 2,
        },
        {
          eterapia_id: 2,
          participante_id: 3,
        },
        {
          eterapia_id: 2,
          participante_id: 4,
        },
        {
          eterapia_id: 2,
          participante_id: 5,
        },

        {
          eterapia_id: 3,
          participante_id: 3,
        },
        {
          eterapia_id: 3,
          participante_id: 4,
        },
        {
          eterapia_id: 3,
          participante_id: 5,
        },
        {
          eterapia_id: 3,
          participante_id: 6,
        },

        {
          eterapia_id: 4,
          participante_id: 4,
        },
        {
          eterapia_id: 4,
          participante_id: 5,
        },
        {
          eterapia_id: 4,
          participante_id: 6,
        },
      ]);
    });
};