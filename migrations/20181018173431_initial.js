exports.up = function up(knex) {
  knex.shema.raw(CREATE EXTENSION pg_trgm);
  return Promise.all([
    knex.schema.hasTable('Users').then(exists => {
      if(!exists){
        return knex.schema.createTable('Users', table =>{
          knex.raw('create extension if not exists "uuid-ossp"')
          table.uuid('Id').defaultTo(knex.raw('uuid_generate_v4()'));
          table.string('UserName').unique();
          table.string('firstName');
          table.string('lastName');
          table.jsonb('Password');
          table.boolean('Admin').defaultTo(false);
        })
      }
    }),
    knex.schema.hasTable('Categories').then(exists => {
      if(!exists){
        return knex.schema.createTable('Categories', table =>{
          table.string('Category').primary();
        })
      }
    }),
    knex.schema.hasTable('Items').then(exists => {
      if(!exists){
        return knex.schema.createTable('Items', table =>{
          table.uuid('Id').primary().defaultTo(knex.raw('uuid_generate_v4()'));;
          table.string('Title').unique();
          table.string('userID');
          table.string('image');
          table.string('price');
          table.string('ItemDescription').unique();
          table.string('Category').references('Categories.Category');
          table.boolean('Status');
          table.string('ApproveBy');

        })
      }
    })
    ])

};

exports.down = function down(knex) {
  knex.raw('drop extension if exists "uuid-ossp"');
  return knex.schema
  .dropTableIfExists('Users')
  .dropTableIfExists('Categories')
  .dropTableIfExists('Items');
};