
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('eterapia').del()
    .then(function () {
      // Inserts seed entries
      return knex('eterapia').insert([
        {
          title: "Bate papo literário"
        },
        {
          title: "Falar é bom"
        }
      ]);
    });
};
