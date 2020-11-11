
exports.up = function(knex) {
    return knex.schema.createTable('eterapia', function(table) {
        table.increments('id');
        table.text('title').notNullable();
        table.text('description');
        table.text('target_audience');
        table.text('frequency');
        table.text('app');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        // table.timestamp('deleted_at');
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('eterapia');
  };
  