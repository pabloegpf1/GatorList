module.exports = {

  development: {
    client: 'postgresql',
    connection: 'postgres://pablo@localhost:5433/my_DB',
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },


  staging: {
    client: 'postgresql',
    connection: 'postgres://pablo@localhost:5433/my_DB',
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: 'postgres://fjncbkvtfeudms:9cf011343f162ec0a08d589d26432061144a6ccf9fb86b906d274b7bf11c608d@ec2-54-83-37-223.compute-1.amazonaws.com:5432/d9i5vj00kei9ml?ssl=true',
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
