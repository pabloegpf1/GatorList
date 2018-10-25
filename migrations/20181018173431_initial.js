exports.up = function up(knex) {
  return Promise.all([
    knex.schema.hasTable('Categories').then(exists => {
      if(!exists){
        return knex.schema.createTable('Categories', table =>{
          table.string('Category').primary();
        })
      }
    }),
    knex.schema.hasTable('Users').then(exists => {
      if(!exists){
        return knex.schema.createTable('Users', table =>{
          //knex.raw('create extension if not exists "uuid-ossp"');
          table.increments('Id').primary();
          table.string('UserName').unique();
          table.string('firstName');
          table.string('lastName');
          table.jsonb('Password');
          table.boolean('Admin').defaultTo(false);
        })
      }
    }),
    knex.schema.hasTable('Items').then(exists => {
      if(!exists){
        return knex.schema.createTable('Items', table =>{
          table.increments('Id').primary();
          table.string('Title').unique();
          table.string('userID');
          table.string('price');
          table.string('ItemDescription').unique();
          table.string('image');
          table.string('Category');
          table.boolean('Status').defaultTo(false);
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
  .dropTableIfExists('Items');
};