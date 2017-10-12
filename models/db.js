const Sequelize = require('sequelize')
const config = require('../config')

let sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  port: config.port,
  operatorsAliases: Sequelize.Op,
  timezone: '+08:00',
  pool: {
    max: 5,
    min: 0,
    idle: 30000
  }
})

/**
 * @param  name  表名
 * @param  attributes 字段
 * @return {[type]}
 */
function defineModel (name, attributes) {
  let attrs = {}
  for (let key in attributes) {
    let value = attributes[key]
    if (typeof value === 'object' && value['type']) {
      value.allowNull = value.allowNull || false
      attrs[key] = value
    } else {
      attrs[key] = {
        type: value,
        allowNull: false
      }
    }
  }

  attrs.id = {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }

  return sequelize.define(name, attrs, {
    tableName: name,
    underscored: true,
    hooks: {
      beforeValidate: function (obj) {
        // let now = Date.now()
        // if (obj.isNewRecord) {
        //   obj.created_at = now
        //   obj.updated_at = now
        // } else {
        //   obj.updated_at = now
        // }
      }
    }
  })
}

// data_types
const TYPES = ['STRING', 'INTEGER', 'BIGINT', 'TEXT', 'DOUBLE', 'DATEONLY', 'BOOLEAN']

let db = {
  defineModel: defineModel,
  sync: () => {
    // only allow create ddl in non-production environment:
    if (process.env.NODE_ENV !== 'production') {
      sequelize.sync({force: true})
    } else {
      throw new Error('Cannot sync() when NODE_ENV is set to \'production\'.')
    }
  }
}

for (let type of TYPES) {
  db[type] = Sequelize[type]
}

module.exports = db
