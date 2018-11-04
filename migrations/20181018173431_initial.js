exports.up = function up(knex) {
  return Promise.all([
    knex.schema.hasTable('Users').then(exists => {
      if(!exists){
        return knex.schema.createTable('Users', table =>{
          table.increments('ID').unsigned().notNullable().primary();
          table.string('UserName').unique();
          table.string('FirstName');
          table.string('LastName');
          table.jsonb('Password');
          table.boolean('Admin').defaultTo(false);
        })
      }
    }).then(function () {
      return knex("Users").insert(
      {
        UserName: 'pabloegpf1',
        FirstName: 'Pablo',
        LastName: 'Escriva'
      })
    }
    ),
    knex.schema.hasTable('Categories').then(exists => {
      if(!exists){
        return knex.schema.createTable('Categories', table =>{
          table.string('Category').primary();
        })
      }
    }).then(function () {
      return knex('Categories')
      .insert([
       {Category: 'Home'},
       {Category: 'Books'},
       {Category: 'Electronics'},
       {Category: 'Vehicles'}
       ])
    }
    ),
    knex.schema.hasTable('Items').then(exists => {
      if(!exists){
        return knex.schema.createTable('Items', table =>{
          table.increments('ID').primary();
          table.string('Title');
          table.integer('UserID').unsigned().notNullable().references('ID').inTable('Users');
          table.string('Price');
          table.text('Description');
          table.string('Category').references('Category').inTable('Categories');
          table.boolean('Status');
          table.string('Image');
          table.integer('ApprovedBy').references('ID').inTable('Users');
        })
      }
    }).then(function () {
      return knex('Items')
      .insert([
      {
        Title: 'Databases book',
        UserID: 1,
        Category: 'Books',
        Image: 'https://s3.amazonaws.com/csc648team12/fundamentals-of-database-systems-for-vtu-original-imadtkg5qhb63jdz.jpeg'
      },
      {
        Title: 'Batteries',
        UserID: 1,
        Category: 'Electronics',
        Image: 'https://s3.amazonaws.com/csc648team12/ZOLL_batteries_530x%402x.png'
      },
      {
        Title: 'Chair',
        UserID: 1,
        Category: 'Home',
        Image: 'https://s3.amazonaws.com/csc648team12/MontereyChairCharcoalSHS16_1x1.jpeg'
      },
      {
        Title: 'TV',
        UserID: 1,
        Category: 'Electronics',
        Image: 'https://s3.amazonaws.com/csc648team12/636524900539955437-Element-RokuTV-HERO.jpg'
      },
      {
        Title: 'Physics book',
        UserID: 1,
        Category: 'Books',
        Image: 'https://s3.amazonaws.com/csc648team12/31-500x500.jpg'
      },
      {
        Title: 'Calculus book',
        UserID: 1,
        Category: 'Books',
        Image: 'https://s3.amazonaws.com/csc648team12/main-qimg-7994ee6ba77511ed9c1fa1999a6ec841-c.jpeg'
      },
      {
        Title: 'Table',
        UserID: 1,
        Category: 'Home',
        Image: 'https://s3.amazonaws.com/csc648team12/download.jpeg'
      },
      {
        Title: 'Laptop',
        UserID: 1,
        Category: 'Electronics',
        Image: 'https://s3.amazonaws.com/csc648team12/laptop.jpg'
      }]
      )
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