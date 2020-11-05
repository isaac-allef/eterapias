
exports.up = function(knex) {
    return knex.schema.createTable('eterapias_participantes', function(table) {
        table.increments('id');
        table.integer('id_eterapia_fk')
            .references('eterapias.id')
            .notNullable();
        table.integer('id_participante_fk')
            .references('participantes.id')
            .notNullable();
        table.text('status_eterapia').defaultTo('active'); // active / no active / deleted
        table.text('status_participante').defaultTo('active'); // active / no active / deleted
        table.unique(['id_eterapia_fk', 'id_participante_fk'])
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('eterapias_participantes');
  };
  