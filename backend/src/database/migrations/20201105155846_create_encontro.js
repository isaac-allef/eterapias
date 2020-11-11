
exports.up = function(knex) {
    return knex.schema.createTable('encontro', function(table) {
        table.increments('id');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        // table.timestamp('deleted_at');
        table.integer('eterapia_id')
            .references('eterapia.id')
            .onDelete('CASCADE')
            .notNullable();
          
        table.string('dateTime').notNullable();
        table.string('app').notNullable();
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('encontro');
  };
  