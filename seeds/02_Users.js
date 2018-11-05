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
      LastName: 'Escriva'
    }
    ]);
  });
};
