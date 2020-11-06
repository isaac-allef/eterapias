
exports.up = function(knex) {
    return knex.schema.createTable('encontros', function(table) {
        table.increments('id');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.string('status').defaultTo('active');
        table.integer('id_eterapia_fk')
            .references('eterapias.id')
            .notNullable();
          
        table.string('dateTime').notNullable();
        table.string('app').notNullable();
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('encontros');
  };
  