const route = require('koa-router')();
const queryUser = require("../dbpool/query.js");
// const routeApp = route();
const main = (ctx,next)=>{
    ctx.response.type='text/html'
    ctx.response.body='<a href="/about">about</a>'
    next();
}
const about = (ctx,next)=>{
    ctx.response.type='text/html'
    ctx.response.body='<h1>hello World</h1>'
    next()
}
const test = async (ctx,next)=>{
    console.log(ctx);
    const data = ctx.request.body;
    console.log(ctx.request.body);
    const adduser = queryUser.addUser(ctx,next,data)
    // const adduser = queryUser(ctx,next)
    await adduser.then(function(data){
        ctx.response.status=200;
        ctx.response.message="ok"
        // ctx.response.body='成功' 
    }).catch(function(e){
        ctx.throw(500);
    }); 
}
const home = async (ctx,next)=>{
    const finduser = queryUser.findUser(ctx,next);
    await finduser.then(async(users)=>{
        // console.log(users);
        const userlist = [];
        users.filter(function(user){
            userlist.push(user.dataValues)
            return user;
        });
          await ctx.render('home',{title:'home',userlist});
        // console.log(userlist);
    }).catch(function(e){
        ctx.throw(500);
    }); 
   
}
route.get('/',main);
route.get('/about',about);
route.post('/test',test);
route.get('/home',home);
module.exports=route
