
exports.up = function(knex) {
    return knex.schema.createTable('formulario', function(table) {
        table.increments('id');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        // table.timestamp('deleted_at');
        table.string('codigo_participante_formulario');
        table.string('link_formulario');

        table.unique(['codigo_participante_formulario', 'link_formulario'])
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('formulario');
  };
  