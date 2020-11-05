
exports.up = function(knex) {
    return knex.schema.createTable('participantes', function(table) {
        table.increments('id');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.text('status').defaultTo('active'); // active / no active / deleted
  
        table.string('fullName').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp_tel');
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();
        table.string('sex', 1);
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('participantes');
  };
  