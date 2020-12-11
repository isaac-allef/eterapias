exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('encontro').del()
    .then(async function () {
      return knex('encontro').insert([
        {
          eterapia_id: 1,
          dateTime: new Date(),
          app: "google meet"
        },
        {
          eterapia_id: 2,
          dateTime: new Date(),
          app: "zoom"
        },
        {
          eterapia_id: 3,
          dateTime: new Date(),
          app: "whatsapp"
        },
        {
          eterapia_id: 4,
          dateTime: new Date(),
          app: "google meet"
        },
      ]);
    });
};
