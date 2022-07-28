import { config } from 'dotenv'
config()

export = {
  development: {
    dialect: 'postgres',
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    migrationStorage: 'sequelize',
    migrationStorageTableSchema: 'sequelize',
    seederStorage: 'sequelize',
    seederStorageTableSchema: 'sequelize',
  },
}
