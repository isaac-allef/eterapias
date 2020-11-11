
exports.up = function(knex) {
    return knex.schema.createTable('eterapia_participante', function(table) {
        table.increments('id');
        table.integer('eterapia_id')
            .references('eterapia.id')
            .onDelete('CASCADE')
            .notNullable();
        table.integer('participante_id')
            .references('participante.id')
            .onDelete('CASCADE')
            .notNullable();
          
        table.unique(['eterapia_id', 'participante_id'])
            
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('eterapia_participante');
  };
  