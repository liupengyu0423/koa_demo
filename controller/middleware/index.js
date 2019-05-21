const fs = require('fs.promised');
const one = (ctx,next)=>{
    console.log('>>one')
    next()
    console.log('<<one')
}
const two = (ctx,next)=>{
    console.log('>>two')
    next()
    console.log('<<two')
}
const three = (ctx,next)=>{
    console.log('>>three')
    next()
    console.log('three')
}
// const promiseA = async () =>{
//     await fs.readFile('./demo/demo.txt','utf8')
//     // console.log(rs);
    
//     // next()
// }
// promiseA().then(function(data){
//     console.log(data);
// })
// console.log("111");

// const promiseB = function(){
//     return new Promise(function(resolve,reject){
//         const rs = fs.readFile('./demo/demo.txt','utf8')
//         resolve(rs)
//     })
// } 
// promiseB().then(function(data){
//     console.log(data);
// })
// console.log('hhhhh');
module.exports = {
    one,
    two,
    three
}