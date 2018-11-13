exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Users').del()
  .then(function () {
    // Inserts seed entries
    return knex('Users').insert([
    {
      UserName: 'pabloegpf1',
      FirstName: 'Pablo',
    },
    {
      UserName: 'legenhairy',
      FirstName: 'Harry',
    },
    {
      UserName: 'Greedhunter',
      FirstName: 'Jack',
    },
    {
      UserName: 'StephanieSantana',
      FirstName: 'Stephanie',
    },
    {
      UserName: 'MarS26v7',
      FirstName: 'Marlo',
    },
    {
      UserName: 'johnnydcs',
      FirstName: 'Johhny',
    },
    {
      UserName: 'skazmi154',
      FirstName: 'Syed',
    }
    ]);
  });
};
