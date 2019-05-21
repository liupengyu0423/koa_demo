const Sequelize = require('sequelize');
const fuc =  (ctx)=>{
    // console.log(ctx.db);
    // console.log(global.db);
    const User = ctx.db.define('user', {
        firstName: {
          type: Sequelize.STRING,
          field: 'firstname' // Will result in an attribute that is firstName when user facing but first_name in the database
        },
        lastName: {
          type: Sequelize.STRING,
          field:'lastname'
        }
      }, {
        freezeTableName: true // Model 对应的表名将与model名相同
      });
      return User
        
    }
    // const User = global.db.define('user', {
    //   firstName: {
    //     type: Sequelize.STRING,
    //     field: 'firstname' // Will result in an attribute that is firstName when user facing but first_name in the database
    //   },
    //   lastName: {
    //     type: Sequelize.STRING,
    //     field:'lastname'
    //   }
    // }, {
    //   freezeTableName: true // Model 对应的表名将与model名相同
    // });
// var User = sequelize.define('user', {
//     firstName: {
//       type: Sequelize.STRING,
//       field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
//     },
//     lastName: {
//       type: Sequelize.STRING
//     }
//   }, {
//     freezeTableName: true // Model 对应的表名将与model名相同
//   });
  
 module.exports = fuc;