exports.up = function up(knex) {
  return Promise.all([
    knex.schema.hasTable('Users').then(exists => {
      if(!exists){
        return knex.schema.createTable('Users', table =>{
          table.increments('ID');
          table.string('username').unique();
          table.string('FirstName');
          table.string('LastName');
          table.string('password');
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
          table.increments('ID').primary();
          table.string('Title');
          table.integer('UserID').unsigned().notNullable().references('ID').inTable('Users');
          table.string('Price');
          table.text('Description');
          table.string('Category').references('Category').inTable('Categories').onDelete('CASCADE');
          table.boolean('Approved').defaultTo(false);
          table.string('Image');
          table.timestamp('created_at').defaultTo(knex.fn.now());
        })
      }
    }),
    knex.schema.hasTable('Messages').then(exists => {
      if(!exists){
        return knex.schema.createTable('Messages', table =>{
          table.integer('User_from').unique().references('ID').inTable('Users');
          table.integer('User_to').unique().references('ID').inTable('Users');
          table.integer('ItemID').unique().references('ID').inTable('Items');
          table.text('Content').unique();
        })
      }
    }),
    knex.schema.hasTable('Favorites').then(exists => {
      if(!exists){
        return knex.schema.createTable('Favorites', table =>{
          table.integer('UserID').unique().references('ID').inTable('Users');
          table.integer('ItemID').unique().references('ID').inTable('Items');
        })
      }
    })
    ])

};

exports.down = function down(knex) {
  return knex.schema
  .dropTableIfExists('Favorites')
  .dropTableIfExists('Messages')
  .dropTableIfExists('Items')
  .dropTableIfExists('Categories')
  .dropTableIfExists('Users')
};