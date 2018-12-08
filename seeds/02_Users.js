exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Users').del()
  .then(function () {
    // Inserts seed entries
    return knex('Users').insert([
    {
      ID: 1,  
      username: 'pabloegpf1',
      FirstName: 'Pablo',
    },
    {
      ID: 2,
      username: 'legenhairy',
      FirstName: 'Harry',
    },
    {
      ID: 3,
      username: 'Greedhunter',
      FirstName: 'Jack',
    },
    {
      ID: 4,
      username: 'StephanieSantana',
      FirstName: 'Stephanie',
    },
    {
      ID: 5,
      username: 'MarS26v7',
      FirstName: 'Marlo',
    },
    {
      ID: 6,
      username: 'johnnydcs',
      FirstName: 'Johhny',
    },
    {
      ID: 7,
      username: 'skazmi154',
      FirstName: 'Syed',
    }
    ]);
  });
};
