
exports.up = function(knex) {
    return knex.schema.createTable('eterapias', function(table) {
        table.increments('id');
        table.text('title').unique().notNullable();
        table.text('description');
        table.text('target_audience');
        table.text('frequency');
        table.text('app');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.text('status').defaultTo('active'); // active / no active / deleted
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('eterapias');
  };
  