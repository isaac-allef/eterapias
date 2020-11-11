
exports.up = function(knex) {
    return knex.schema.createTable('participante', function(table) {
        table.increments('id');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        // table.timestamp('deleted_at');
  
        table.string('fullName').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp_tel');
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();
        table.string('sex', 1);
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('participante');
  };
  