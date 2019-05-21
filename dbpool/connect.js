const Sequelize = require('sequelize');
const config = require('./config');

const dbPool = (app)=>{
    const mysqlConfig = config(app);
    var sequelize = new Sequelize(mysqlConfig.default.database, mysqlConfig.default.username, mysqlConfig.default.password, {
        host: mysqlConfig.default.host,
        dialect: 'mysql',
      
        pool: {
          max: 5,
          min: 0,
          idle: 10000//
        },
    
      });
      // console.log(Sequelize.DataTypes)
      return sequelize
}

  module.exports = dbPool;