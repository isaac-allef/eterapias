
exports.up = function(knex) {
    return knex.schema.createTable('presenca', function(table) {
        table.increments('id');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        // table.timestamp('updated_at').defaultTo(knex.fn.now());
        // table.timestamp('deleted_at');
        table.integer('participante_id')
            .references('participante.id')
            .onDelete('CASCADE')
            .notNullable();
        table.integer('encontro_id')
            .references('encontro.id')
            .onDelete('CASCADE')
            .notNullable();
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('presenca');
  };
  