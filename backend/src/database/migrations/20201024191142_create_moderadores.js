
exports.up = function(knex) {
  return knex.schema.createTable('moderadores', function(table) {
      // user datas
      table.increments('id');
      table.text('userName').unique().notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());

      // moderadores data
      table.string('fullName').notNullable();
      table.string('email').notNullable();
      table.string('whatsapp_tel');
      table.string('city').notNullable();
      table.string('uf', 2).notNullable();
      table.string('college');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('moderadores');
};
