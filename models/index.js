const fs = require('fs')
const path = require('path')
const db = require('./db')

// 导出model
let files = fs.readdirSync(path.resolve(__dirname, 'modules')).filter(f => f.endsWith('.js'))

for (let f of files) {
  let name = f.substring(0, f.length - 3)
  module.exports[name] = require(path.resolve(__dirname, 'modules', f))
}

module.exports.sync = () => {
  db.sync()
}
