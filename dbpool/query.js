
const model = require("./model.js")
// const queryUser = (ctx,next) =>{
//     const User = model(ctx);
//     return User.sync({force: true}).then(function () {
//         // 已创建数据表
//         return User.create({
//         firstName: 'John3',
//         lastName: 'Hancock3'
//         })
//     });
   
// }
const addUser = (ctx,next,data)=>{
    const User = model(ctx);
    return User.create({
        firstName: data.firstName,
        lastName: data.lastName
        })
}
const findUser = (ctx,next)=>{
    const User = model(ctx);
    return User.findAll()
}
module.exports = {
    addUser,
    findUser
}
// module.exports=queryUser;