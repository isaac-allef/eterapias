
exports.up = function(knex) {
    return knex.schema.createTable('presencas', function(table) {
        table.increments('id');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.string('status').defaultTo('active');
        table.integer('id_participante_fk')
            .references('participantes.id')
            .notNullable();
        table.integer('id_encontro_fk')
            .references('encontros.id')
            .notNullable();
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('presencas');
  };
  