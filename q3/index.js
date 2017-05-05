const Koa = require('koa'),
      app = new Koa(),
      RateLimit = require('./middleware')

app.use(RateLimit({
  host: 'localhost',
  user: 'root',
  password: 'rootroot',
  database: 'dcard',
}))

app.use(ctx => {
  // console.log(ctx.ip);
  ctx.body = `Hello`
})

app.listen(3000)
