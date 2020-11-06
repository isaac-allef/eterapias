
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('encontros').del()
    .then(async function () {
      return knex('encontros').insert([
        {
          id_eterapia_fk: 1,
          dateTime: "05/11/2020 16:25",
          app: "google meet"
        },
      ]);
    });
};
