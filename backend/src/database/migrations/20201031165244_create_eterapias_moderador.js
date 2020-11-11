
exports.up = function(knex) {
    return knex.schema.createTable('eterapia_moderador', function(table) {
        table.increments('id');

        table.integer('eterapia_id')
            .references('eterapia.id')
            .onDelete('CASCADE')
            .notNullable();

        table.integer('moderador_id')
            .references('moderador.id')
            .onDelete('CASCADE')
            .notNullable();

        table.unique(['eterapia_id', 'moderador_id'])
        // table.timestamp('eterapia_deleted_at');
        // table.text('moderador_deleted_at');
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('eterapia_moderador');
  };
  