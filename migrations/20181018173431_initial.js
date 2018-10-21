exports.up = function up(knex) {
  return Promise.all([
    knex.schema.hasTable('Users').then(exists => {
      if(!exists){
        return knex.schema.createTable('Users', table =>{
          table.uuid('Id').primary();
          table.string('UserName').unique();
          table.string('firstName');
          table.string('lastName');
          table.jsonb('Password');
          table.boolean('Admin');
        })
      }
    }),
    knex.schema.hasTable('Items').then(exists => {
      if(!exists){
        return knex.schema.createTable('Items', table =>{
          table.uuid('Id').primary();
          table.string('Title').unique();
          table.string('userID');
          table.string('price');
          table.string('ItemDescription').unique();
          table.string('Category');
          table.boolean('Status');
          table.string('ApproveBy');

        })
      }
    })
    ])

};

exports.down = function down(knex) {
  return knex.schema
  .dropTableIfExists('Users')
  .dropTableIfExists('Items');
};