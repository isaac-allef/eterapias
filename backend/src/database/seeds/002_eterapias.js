
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('eterapias').del()
    .then(function () {
      // Inserts seed entries
      return knex('eterapias').insert([
        {
          title: "Bate papo literário"
        }
      ]);
    });
};
