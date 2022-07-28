import * as Sequelize from 'sequelize'

declare module 'sequelize' {
  type SequelizeInstance = typeof Sequelize
}
