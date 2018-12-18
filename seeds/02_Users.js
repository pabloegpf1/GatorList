exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Users').del()
  .then(function () {
    // Inserts seed entries
    return knex('Users').insert([
    {
      ID: 100,
      username: 'pabloegpf1',
      FirstName: 'Pablo',
      password: '$2b$09$5CgYnaugwV9sK5n/tkALfuON5nZTYy6Yr.gxmbawVe5F0tbvJNz9i'
    },
    {
      ID: 200,
      username: 'legenhairy',
      FirstName: 'Harry',
      password: '$2b$09$5CgYnaugwV9sK5n/tkALfuON5nZTYy6Yr.gxmbawVe5F0tbvJNz9i'
    },
    {
      ID: 300,
      username: 'Greedhunter',
      FirstName: 'Jack',
      password: '$2b$09$5CgYnaugwV9sK5n/tkALfuON5nZTYy6Yr.gxmbawVe5F0tbvJNz9i'
    },
    {
      ID: 400,
      username: 'StephanieSantana',
      FirstName: 'Stephanie',
      password: '$2b$09$5CgYnaugwV9sK5n/tkALfuON5nZTYy6Yr.gxmbawVe5F0tbvJNz9i'
    },
    {
      ID: 500,
      username: 'MarS26v7',
      FirstName: 'Marlo',
      password: '$2b$09$5CgYnaugwV9sK5n/tkALfuON5nZTYy6Yr.gxmbawVe5F0tbvJNz9i'
    },
    {
      ID: 600,
      username: 'johnnydcs',
      FirstName: 'Johhny',
      password: '$2b$09$5CgYnaugwV9sK5n/tkALfuON5nZTYy6Yr.gxmbawVe5F0tbvJNz9i'
    },
    {
      ID: 700,
      username: 'skazmi154',
      FirstName: 'Syed',
      password: '$2b$09$5CgYnaugwV9sK5n/tkALfuON5nZTYy6Yr.gxmbawVe5F0tbvJNz9i'
    }
    ]);
  });
};