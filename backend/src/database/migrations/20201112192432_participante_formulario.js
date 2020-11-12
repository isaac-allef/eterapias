
exports.up = function(knex) {
    return knex.schema.createTable('participante_formulario', function(table) {
        table.increments('id');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        // table.timestamp('deleted_at');
        table.integer('participante_id')
            .references('participante.id')
            .onDelete('CASCADE')
            .notNullable();
        table.integer('formulario_id')
            .references('formulario.id')
            .onDelete('CASCADE')
            .notNullable();
  
        table.unique(['participante_id', 'formulario_id'])
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('participante_formulario');
  };
  