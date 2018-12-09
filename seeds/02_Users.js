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
      password: '$2b$09$5CgYnaugwV9sK5n/tkALfuON5nZTYy6Yr.gxmbawVe5F0tbvJNz9i'
    },
    {
      ID: 2,
      username: 'legenhairy',
      FirstName: 'Harry',
      password: '$2b$09$5CgYnaugwV9sK5n/tkALfuON5nZTYy6Yr.gxmbawVe5F0tbvJNz9i'
    },
    {
      ID: 3,
      username: 'Greedhunter',
      FirstName: 'Jack',
      password: '$2b$09$5CgYnaugwV9sK5n/tkALfuON5nZTYy6Yr.gxmbawVe5F0tbvJNz9i'
    },
    {
      ID: 4,
      username: 'StephanieSantana',
      FirstName: 'Stephanie',
      password: '$2b$09$5CgYnaugwV9sK5n/tkALfuON5nZTYy6Yr.gxmbawVe5F0tbvJNz9i'
    },
    {
      ID: 5,
      username: 'MarS26v7',
      FirstName: 'Marlo',
      password: '$2b$09$5CgYnaugwV9sK5n/tkALfuON5nZTYy6Yr.gxmbawVe5F0tbvJNz9i'
    },
    {
      ID: 6,
      username: 'johnnydcs',
      FirstName: 'Johhny',
      password: '$2b$09$5CgYnaugwV9sK5n/tkALfuON5nZTYy6Yr.gxmbawVe5F0tbvJNz9i'
    },
    {
      ID: 7,
      username: 'skazmi154',
      FirstName: 'Syed',
      password: '$2b$09$5CgYnaugwV9sK5n/tkALfuON5nZTYy6Yr.gxmbawVe5F0tbvJNz9i'
    }
    ]);
  });
};