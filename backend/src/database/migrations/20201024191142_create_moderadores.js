
exports.up = function(knex) {
  return knex.schema.createTable('moderador', function(table) {
      // user datas
      table.increments('id');
      table.text('userName').unique().notNullable();
      table.text('password').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
      // table.timestamp('deleted_at');

      // moderadores data
      table.string('fullName').notNullable();
      table.string('email').notNullable();
      table.string('whatsapp_tel');
      table.string('city').notNullable();
      table.string('uf', 2).notNullable();
      table.string('college');
      table.string('professional');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('moderador');
};
