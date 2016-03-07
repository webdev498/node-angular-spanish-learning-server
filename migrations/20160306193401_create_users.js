
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.withSchema('public').createTable('users', function(table) {
      table.uuid('id').primary().unique();
      table.string('first_name').nullable();
      table.string('last_name').nullable();
      table.string('email').notNullable();
      table.string('password_hash');
      table.string('password_salt');
      table.boolean('active').defaultTo(true);
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.withSchema('public').dropTable('users')
  ]);
};
