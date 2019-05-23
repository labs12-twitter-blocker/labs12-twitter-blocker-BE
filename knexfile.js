// Update with your config settings.
const localPg = {
  host: 'localhost',
  database: 'twitter',
  user: 'twitdev',
  password: 'qxZVf5d9'
}

const gcpPg = {
  database: 'twitbase',
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  host: `/cloudsql/twitter-list-blocker:us-west1:twitter-list-blocker`
}

let prodDbConnection = gcpPg

// if (process.env.DB_ENV === 'production') {
//   console.log(process.env.DB_ENV)
//   prodDbConnection = gcpPg;
// } else {
//   console.log(process.env.DB_ENV)
//   prodDbConnection = localPg;
// }

module.exports = {

  development: {
    client: 'postgresql',
    connection: localPg,
    migrations: {
      directory: './src/data/migrations'
    },
    seeds: {
      directory: './src/data/seeds'
    },
    debug: true
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