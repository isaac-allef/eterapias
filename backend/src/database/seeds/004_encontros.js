
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
          dateTime: "11/12/2020 12:09",
          app: "zoom"
        },
        {
          eterapia_id: 3,
          dateTime: "11/11/2020 13:56",
          app: "whatsapp"
        },
        {
          eterapia_id: 4,
          dateTime: "11/12/2020 13:30",
          app: "google meet"
        },
      ]);
    });
};
