// 自动注入路由
const fs = require('fs')
const path = require('path')
const Router = require('koa-router')

function addMapping (router, mapping) {
  for (let url in mapping) {
    if (!mapping.hasOwnProperty(url)) continue
    let path
    switch (url.replace(/^([A-Z]+)\s.+/g, '$1')) {
      case 'GET':
        path = url.substring(4)
        router.get(path, mapping[url])
        break
      case 'POST':
        path = url.substring(5)
        router.post(path, mapping[url])
        break
      case 'PUT':
        path = url.substring(4)
        router.put(path, mapping[url])
        break
      case 'DELETE':
        path = url.substring(7)
        router.del(path, mapping[url])
        break
      default:
        console.log(`invalid URL: ${url}`)
    }
  }
}

function addRoutes (router) {
  fs.readdirSync(path.resolve(__dirname)).filter(f => f.endsWith('.js') && !f.startsWith('index')).forEach(f => {
    let mapping = require(path.resolve(__dirname, f))
    addMapping(router, mapping)
  })
}

module.exports = function () {
  let router = new Router()
  addRoutes(router)
  return router
}
