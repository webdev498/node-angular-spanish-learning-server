
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.withSchema('public').createTable('categories', function(table) {
      table.uuid('id').primary().unique();
      table.uuid('parent_id');
      table.string('name').notNullable();
      table.boolean('active').defaultTo(true);
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
      table.index('parent_id', 'Categories_parent_id_index');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.withSchema('public').dropTable('categories')
  ]);
};
