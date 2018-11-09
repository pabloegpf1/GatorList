exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Users').del()
  .then(function () {
    // Inserts seed entries
    return knex('Users').insert([
    {
      ID: 1,
      UserName: 'pabloegpf1',
      FirstName: 'Pablo',
    },
    {
      ID: 2,
      UserName: 'legenhairy',
      FirstName: 'Harry',
    },
    {
      ID: 3,
      UserName: 'Greedhunter',
      FirstName: 'Jack',
    },
    {
      ID: 4,
      UserName: 'StephanieSantana',
      FirstName: 'Stephanie',
    },
    {
      ID: 5,
      UserName: 'MarS26v7',
      FirstName: 'Marlo',
    },
    {
      ID: 6,
      UserName: 'johnnydcs',
      FirstName: 'Johhny',
    },
    {
      ID: 7,
      UserName: 'skazmi154',
      FirstName: 'Syed',
    }
    ]);
  });
};
