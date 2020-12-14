
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('presenca').del()
    .then(async function () {
      return knex('presenca').insert([
        // {
        //   participante_id: 1,
        //   encontro_id: 1
        // },
        // {
        //   participante_id: 2,
        //   encontro_id: 2
        // },
      ]);
    });
};
