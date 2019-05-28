# instayam-server

The server for an Instagram clone, built on Express, Knex, and Postgres.

## Todo

- [x] Add token based user authentication.
- [x] Add test and production db.
- [x] Convert from Sequelize to Knex.
- [x] Add error handling middleware module.
- [ ] Catch errors that are rethrown in global middleware and log a stacktrace.
- [ ] Decouple business logic from router into controllers.
- [ ] Add migrations.
- [ ] Add fixtures.
- [ ] Add tests.
- [ ] Document project layout.

## Development

- `yarn install`
- Use Postgres.app for development and test database.
- Execute `scripts/create-development-and-test-database.sql`.
- `yarn dev`
