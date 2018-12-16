exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Images').del()
  .then(function () {
    // Inserts seed entries
    return knex('Images').insert([
    {
      ItemID: 1000,
      Link: 'https://s3.amazonaws.com/csc648team12/fundamentals-of-database-systems-for-vtu-original-imadtkg5qhb63jdz.jpeg'
    },
    {
      ItemID: 2000,
      Link: 'https://s3.amazonaws.com/csc648team12/ZOLL_batteries_530x%402x.png'
    },
    {
     ItemID: 3000,
     Link: 'https://s3.amazonaws.com/csc648team12/MontereyChairCharcoalSHS16_1x1.jpeg'
   },
   {
     ItemID: 4000,
     Link: 'https://s3.amazonaws.com/csc648team12/636524900539955437-Element-RokuTV-HERO.jpg'
   },
   {
     ItemID: 5000,
     Link: 'https://s3.amazonaws.com/csc648team12/31-500x500.jpg'
   },
   {
     ItemID: 7000,
     Link: 'https://s3.amazonaws.com/csc648team12/main-qimg-7994ee6ba77511ed9c1fa1999a6ec841-c.jpeg'
   },
   {
    ItemID: 8000,
    Link: 'https://s3.amazonaws.com/csc648team12/download.jpeg'
  },
  {
   ItemID: 9000,
   Link: 'https://s3.amazonaws.com/csc648team12/laptop.jpg'
 }
 ]);
  });
};