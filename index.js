const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors')
const router = require('./routes')()
const app = new Koa()

// log request URL
// app.use(async (ctx, next) => {
//   console.log(`Process ${ctx.request.method} ${ctx.request.url}...`)
//   await next()
// })

// parse request body
app.use(bodyParser())

// Access-Control-Allow-Origin
app.use(cors())

// add routes
app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => {
  console.log('[demo] route-use-middleware is starting at port 3000')
})
