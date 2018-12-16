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
      Price: 12,
      Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tempus quam pellentesque nec nam aliquam sem et tortor consequat. Gravida arcu ac tortor dignissim. A pellentesque sit amet porttitor eget dolor morbi non. Nam aliquam sem et tortor consequat id porta.',
      Approved: true
    },
    {
      ID: 2000,
      Title: 'Batteries',
      UserID: 300,
      Price: 3,
      Category: 'Electronics',
      Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tempus quam pellentesque nec nam aliquam sem et tortor consequat. Gravida arcu ac tortor dignissim. A pellentesque sit amet porttitor eget dolor morbi non. Nam aliquam sem et tortor consequat id porta.',
      Approved: true
    },
    {
     ID: 3000,
     Title: 'Chair',
     UserID: 100,
     Category: 'Home',
     Price: 18,
     Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tempus quam pellentesque nec nam aliquam sem et tortor consequat. Gravida arcu ac tortor dignissim. A pellentesque sit amet porttitor eget dolor morbi non. Nam aliquam sem et tortor consequat id porta.',
     Approved: true
   },
   {
     ID: 4000,
     Title: 'TV',
     UserID: 400,
     Category: 'Electronics',
     Price: 150,
     Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tempus quam pellentesque nec nam aliquam sem et tortor consequat. Gravida arcu ac tortor dignissim. A pellentesque sit amet porttitor eget dolor morbi non. Nam aliquam sem et tortor consequat id porta.',
     Approved: true
   },
   {
     ID: 5000,
     Title: 'Physics book',
     UserID: 600,
     Category: 'Books',
     Price: 20,
     Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tempus quam pellentesque nec nam aliquam sem et tortor consequat. Gravida arcu ac tortor dignissim. A pellentesque sit amet porttitor eget dolor morbi non. Nam aliquam sem et tortor consequat id porta.',
     Approved: true
   },
   {
     ID: 7000,
     Title: 'Calculus book',
     UserID: 700,
     Category: 'Books',
     Price: 10,
     Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tempus quam pellentesque nec nam aliquam sem et tortor consequat. Gravida arcu ac tortor dignissim. A pellentesque sit amet porttitor eget dolor morbi non. Nam aliquam sem et tortor consequat id porta.',
     Approved: true
   },
   {
    ID: 8000,
    Title: 'Table',
    UserID: 200,
    Category: 'Home',
    Price: 25,
    Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tempus quam pellentesque nec nam aliquam sem et tortor consequat. Gravida arcu ac tortor dignissim. A pellentesque sit amet porttitor eget dolor morbi non. Nam aliquam sem et tortor consequat id porta.',
    Approved: true
  },
  {
   ID: 9000,
   Title: 'Laptop',
   UserID: 300,
   Price: 125,
   Category: 'Electronics',
   Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tempus quam pellentesque nec nam aliquam sem et tortor consequat. Gravida arcu ac tortor dignissim. A pellentesque sit amet porttitor eget dolor morbi non. Nam aliquam sem et tortor consequat id porta.',
   Approved: true
 }
 ]);
});
};