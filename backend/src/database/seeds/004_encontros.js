
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('encontro').del()
    .then(async function () {
      return knex('encontro').insert([
        {
          eterapia_id: 1,
          dateTime: "05/11/2020 16:25",
          app: "google meet"
        },
        {
          eterapia_id: 2,
          dateTime: "11/11/2020 13:56",
          app: "whatsapp"
        },
      ]);
    });
};
