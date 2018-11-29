exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Users').del()
  .then(function () {
    // Inserts seed entries
    return knex('Users').insert([
    {
      username: 'pabloegpf1',
      FirstName: 'Pablo',
      password: '123'
    },
    {
      username: 'legenhairy',
      FirstName: 'Harry',
      password: '123'
    },
    {
      username: 'Greedhunter',
      FirstName: 'Jack',
      password: '123'
    },
    {
      username: 'StephanieSantana',
      FirstName: 'Stephanie',
      password: '123'
    },
    {
      username: 'MarS26v7',
      FirstName: 'Marlo',
      password: '123'
    },
    {
      username: 'johnnydcs',
      FirstName: 'Johhny',
      password: '123'
    },
    {
      username: 'skazmi154',
      FirstName: 'Syed',
      password: '123'
    }
    ]);
  });
};
