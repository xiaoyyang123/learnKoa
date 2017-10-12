// 自动注入路由
const fs = require('fs')
const path = require('path')
const Router = require('koa-router')

function addMapping (router, mapping) {
  for (let url in mapping) {
    if (url.startsWith('GET ')) {
      let path = url.substring(4)
      router.get(path, mapping[url])
    } else if (url.startsWith('POST ')) {
      let path = url.substring(5)
      router.post(path, mapping[url])
    } else if (url.startsWith('PUT ')) {
      let path = url.substring(4)
      router.put(path, mapping[url])
    } else if (url.startsWith('DELETE ')) {
      let path = url.substring(7)
      router.del(path, mapping[url])
    } else {
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
