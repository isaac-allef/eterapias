
exports.up = function(knex) {
    return knex.schema.createTable('eterapias_moderadores', function(table) {
        table.increments('id');
        table.integer('id_eterapia_fk')
            .references('eterapias.id')
            .notNullable();
        table.integer('id_moderador_fk')
            .references('moderadores.id')
            .notNullable();
        table.text('status_eterapia').defaultTo('active'); // active / no active / deleted
        table.text('status_moderador').defaultTo('active'); // active / no active / deleted
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('eterapias_moderadores');
  };
  