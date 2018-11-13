exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Items').del()
  .then(function () {
    // Inserts seed entries
    return knex('Items').insert([
    {
      Title: 'Databases book',
      UserID: 5,
      Category: 'Books',
      Price: 12,
      Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tempus quam pellentesque nec nam aliquam sem et tortor consequat. Gravida arcu ac tortor dignissim. A pellentesque sit amet porttitor eget dolor morbi non. Nam aliquam sem et tortor consequat id porta.',
      Image: 'https://s3.amazonaws.com/csc648team12/fundamentals-of-database-systems-for-vtu-original-imadtkg5qhb63jdz.jpeg'
    },
    {
      Title: 'Batteries',
      UserID: 3,
      Price: 3,
      Category: 'Electronics',
      Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tempus quam pellentesque nec nam aliquam sem et tortor consequat. Gravida arcu ac tortor dignissim. A pellentesque sit amet porttitor eget dolor morbi non. Nam aliquam sem et tortor consequat id porta.',
      Image: 'https://s3.amazonaws.com/csc648team12/ZOLL_batteries_530x%402x.png'
    },
    {
      Title: 'Chair',
      UserID: 1,
      Category: 'Home',
      Price: 18,
      Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tempus quam pellentesque nec nam aliquam sem et tortor consequat. Gravida arcu ac tortor dignissim. A pellentesque sit amet porttitor eget dolor morbi non. Nam aliquam sem et tortor consequat id porta.',
      Image: 'https://s3.amazonaws.com/csc648team12/MontereyChairCharcoalSHS16_1x1.jpeg'
    },
    {
      Title: 'TV',
      UserID: 4,
      Category: 'Electronics',
      Price: 150,
      Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tempus quam pellentesque nec nam aliquam sem et tortor consequat. Gravida arcu ac tortor dignissim. A pellentesque sit amet porttitor eget dolor morbi non. Nam aliquam sem et tortor consequat id porta.',
      Image: 'https://s3.amazonaws.com/csc648team12/636524900539955437-Element-RokuTV-HERO.jpg'
    },
    {
      Title: 'Physics book',
      UserID: 6,
      Category: 'Books',
      Price: 20,
      Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tempus quam pellentesque nec nam aliquam sem et tortor consequat. Gravida arcu ac tortor dignissim. A pellentesque sit amet porttitor eget dolor morbi non. Nam aliquam sem et tortor consequat id porta.',
      Image: 'https://s3.amazonaws.com/csc648team12/31-500x500.jpg'
    },
    {
      Title: 'Calculus book',
      UserID: 7,
      Category: 'Books',
      Price: 10,
      Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tempus quam pellentesque nec nam aliquam sem et tortor consequat. Gravida arcu ac tortor dignissim. A pellentesque sit amet porttitor eget dolor morbi non. Nam aliquam sem et tortor consequat id porta.',
      Image: 'https://s3.amazonaws.com/csc648team12/main-qimg-7994ee6ba77511ed9c1fa1999a6ec841-c.jpeg'
    },
    {
      Title: 'Table',
      UserID: 2,
      Category: 'Home',
      Price: 25,
      Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tempus quam pellentesque nec nam aliquam sem et tortor consequat. Gravida arcu ac tortor dignissim. A pellentesque sit amet porttitor eget dolor morbi non. Nam aliquam sem et tortor consequat id porta.',
      Image: 'https://s3.amazonaws.com/csc648team12/download.jpeg'
    },
    {
      Title: 'Laptop',
      UserID: 3,
      Price: 125,
      Category: 'Electronics',
      Description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tempus quam pellentesque nec nam aliquam sem et tortor consequat. Gravida arcu ac tortor dignissim. A pellentesque sit amet porttitor eget dolor morbi non. Nam aliquam sem et tortor consequat id porta.',
      Image: 'https://s3.amazonaws.com/csc648team12/laptop.jpg'
    }
    ]);
});
};