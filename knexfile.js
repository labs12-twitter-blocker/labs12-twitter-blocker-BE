// Update with your config settings.
// const localPg = {
//   host: 'localhost',
//   database: 'twitter',
//   user: 'twitdev',
//   password: 'qxZVf5d9'
// }

const gcpPg = {
  database: 'twitbase',
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD
}

const prodDbConnection = gcpPg // || localPg;
// test
gcpPg.host = `/cloudsql/twitter-list-blocker:us-west1:twitter-list-blocker`;

module.exports = {

  development: {
    client: 'postgresql',
    connection: prodDbConnection,
    migrations: {
      directory: './src/data/migrations'
    },
    seeds: {
      directory: './src/data/seeds'
    },
    debug: false
  },

  staging: {
    client: 'postgresql',
    connection: prodDbConnection,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './src/data/migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: prodDbConnection,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './src/data/migrations'
    },
    seeds: {
      directory: './src/data/seeds'
    },
  }

};
