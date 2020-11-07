
exports.up = function(knex) {
  return knex.schema.createTable('diarios_de_campo', function(table) {
      table.increments('id');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
      table.string('status').defaultTo('active');
      table.integer('id_moderador_fk')
          .references('moderadores.id')
          .notNullable();
      table.integer('id_encontro_fk')
          .references('encontros.id')
          .notNullable();
      table.text('description');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('diarios_de_campo');
};
