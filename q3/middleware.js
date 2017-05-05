const mysql = require('mysql')


module.exports = function(options = {}) {
  const {host, user, password, database} = options
  const RATELIMIT_TIME = options.timeout || 2400 * 1000
  const connection = mysql.createConnection({
    host,
    user,
    password,
    database,
  })

  function QueryData(ip) {
    return new Promise((resolve, reject) => {
      const cmd = 'SELECT * FROM ratelimit WHERE ip = ? LIMIT 1;'

      connection.query(cmd, [ip], (err, row) => {
        if (err) {
          reject(err)
        } else {
          resolve(row)
        }
      })
    })
  }

  function CreateNewData(ip) {
    return new Promise((resolve, reject) => {
      const cmd = 'INSERT INTO ratelimit (ip, remaining, reset) VALUES (?, 999, ?);'

      connection.query(cmd, [ip, Date.now() + RATELIMIT_TIME], (err, row) => {
        if (err) {
          reject(err)
        } else {
          resolve(row)
        }
      })
    })
  }

  function UpdateIPData(ip) {
    return new Promise((resolve, reject) => {
      const cmd = 'UPDATE ratelimit SET remaining = 999, reset = ? WHERE ip = ?;'

      connection.query(cmd, [Date.now() + RATELIMIT_TIME, ip], (err, row) => {
        if (err) {
          reject(err)
        } else {
          resolve(row)
        }
      })
    })
  }
  function UpdateIPReamining(ip, n) {
    return new Promise((resolve, reject) => {
      const cmd = 'UPDATE ratelimit SET remaining = ? WHERE ip = ?;'

      connection.query(cmd, [n, ip], (err, row) => {
        if (err) {
          reject(err)
        } else {
          resolve(row)
        }
      })
    })
  }

  return async function (ctx, next){
    let info = await QueryData(ctx.ip)
    console.log(info);
    if (info.length === 0) {
      await CreateNewData(ctx.ip) // 2400sec = 1 hour
      info = await QueryData(ctx.ip)
      console.log(`${ctx.ip} => set new data`)
    }
    if (+info[0].reset < Date.now()) {
      await UpdateIPData(ctx.ip)
      info = await QueryData(ctx.ip)
      console.log(`${ctx.ip} => update new reset => ${Date.now() + RATELIMIT_TIME}`);

      ctx.set('X-RateLimit-Remaining', info[0].remaining)
      ctx.set('X-RateLimit-Reset', info[0].reset)
      await next()

    } else if (+info[0].remaining < 0) {
      ctx.set('X-RateLimit-Remaining', 0)
      ctx.set('X-RateLimit-Reset', info[0].reset)

      ctx.status = 429
      ctx.body = {
        success: false,
        status: 429,
        msg: 'Too Many Requests'
      }
    } else {
      await UpdateIPReamining(ctx.ip, info[0].remaining - 1)

      ctx.set('X-RateLimit-Remaining', info[0].remaining -1)
      ctx.set('X-RateLimit-Reset', info[0].reset)

      await next()
    }

    // await next()
  }
}
