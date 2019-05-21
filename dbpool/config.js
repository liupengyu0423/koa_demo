
const devConfig = {
    default: {
      database: 'koademo', //数据库
      username: 'root', //用户名
      password: '12345678', //口令
      host: 'localhost', //主机名
      port: 3306 //端口号
    }
  }
  const onlineConfig = {
    default: {
      database: 'koademo', //数据库
      username: 'root', //用户名
      password: '12345678', //口令
      host: 'localhost', //主机名
      port: 3306 //端口号
    },
  }
  let MysqlConfig = (app) => {
    let config = devConfig
    console.log(`app.env is ${app.env}`)
    switch (app.env) {
      case 'online':
        config = onlineConfig
        break
      default:
        break
    }
    return config
  }
  module.exports=MysqlConfig