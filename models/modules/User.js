const db = require('../db')

module.exports = db.defineModel('users', {
  name: {
    type: db.STRING(100)
  },
  mobile: db.STRING(100)
})
