
exports.up = function(knex) {
  return knex.schema.createTable('diario_de_campo', function(table) {
      table.increments('id');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
      // table.timestamp('deleted_at');
      table.integer('moderador_id')
          .references('moderador.id')
          .onDelete('CASCADE')
          .notNullable();
      table.integer('encontro_id')
          .references('encontro.id')
          .onDelete('CASCADE')
          .notNullable();
      table.text('description');

      table.unique(['moderador_id', 'encontro_id'])
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('diario_de_campo');
};
