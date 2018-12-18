exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Items').del()
  .then(function () {
    // Inserts seed entries
    return knex('Items').insert([
    {
      ID: 1000,
      Title: 'Databases book',
      UserID: 500,
      Category: 'Books',
      Price: 50,
      Description: 'Only used for 1 semester. It is required for CSC 675. Okay condition, there is highlighted text in the book and a few pages have small corner tears.',
      Approved: true
    },
    {
      ID: 2000,
      Title: 'Batteries',
      UserID: 300,
      Price: 6,
      Category: 'Electronics',
      Description: 'Duracell Ultra DL123A CR123A 1470mAh 3V Lithium (LiMNO2) Battery. Bulk pack of 8.',
      Approved: true
    },
    {
     ID: 3000,
     Title: 'Chair',
     UserID: 100,
     Category: 'Home',
     Price: 50,
     Description: 'Good Condition. There is minor wear and tear on the left leg of chair. Have been told it is extrememly comfortable.',
     Approved: true
   },
   {
     ID: 4000,
     Title: 'TV',
     UserID: 400,
     Category: 'Electronics',
     Price: 500,
     Description: 'Perfect condition. Remote not included.',
     Approved: true
   },
   {
     ID: 5000,
     Title: 'Physics book',
     UserID: 600,
     Category: 'Books',
     Price: 100,
     Description: 'Necessary for Physics 220 and Physics 230. Special edition from the bookstore that does not include access code.',
     Approved: true
   },
   {
     ID: 7000,
     Title: 'Calculus book',
     UserID: 700,
     Category: 'Books',
     Price: 80,
     Description: 'Never opened. Still in the plastic film. I bought it for Math 227 and my teacher ended up switching the book last minute.',
     Approved: true
   },
   {
    ID: 8000,
    Title: 'Table',
    UserID: 200,
    Category: 'Home',
    Price: 150,
    Description: 'Brand new IKEA Table and has not been assembled.',
    Approved: true
  },
  {
   ID: 9000,
   Title: 'Laptop',
   UserID: 300,
   Price: 800,
   Category: 'Electronics',
   Description: 'Surface Laptop 2. Ordered the wrong color on Black Friday. Never opened.',
   Approved: true
 }
 ]);
});
};
