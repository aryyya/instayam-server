module.exports = {
  development: {
    client: 'pg',
    connection: {
      user: 'instayam',
      database: 'instayam',
      password: 'instayam'
    },
    migrations: {
      directory: 'database/migrations'
    },
    seeds: {
      directory: 'database/seeds'
    }
  },
  test: {
    client: 'pg',
    connection: {
      user: 'instayam',
      database: 'instayam',
      password: 'instayam'
    },
    migrations: {
      directory: 'database/migrations'
    },
    seeds: {
      directory: 'database/seeds'
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: 'database/migrations'
    },
    seeds: {
      directory: 'database/seeds'
    }
  }
}
