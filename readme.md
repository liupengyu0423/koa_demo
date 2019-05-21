
# nodejs
   1、 Nodejs是对Chrome V8引擎进行了封装，使其在非浏览器环境下运行；
        a、所谓渲染引擎，就是将HTML/CSS/JavaScript等文本或图片等信息转换成图像结果的转换程序
        b、V8引擎本身使js代码运行速度得到了极大的提升；这是nodejs高性能的基础；
   2、 nodeJs是服务端环境，使得js可以运行在服务器；后端的工作是包括
       a、服务端模版渲染，（前端把图切好（页面写死的，只有一些特效），给后端，后端搞出来一个动态的网站（传统开发模式））
       b、后端提供api接口，（前端请求数据，在浏览器端渲染页面，前后端分离模式）
   3、 单线程异步,非阻塞IO(多输入输出，少量计算)模型；使用事件驱动；
        基本的原理就是当web server接收到请求，就把它关闭然后进行处理，然后去服务下一个web请求。当这个请求完成，它被放回处理队列，当到达队列开头，这个结果被返回给用户。这个模型非常高效可扩展性非常强，因为webserver一直接受请求而不等待任何读写操作。（这也被称之为非阻塞式IO或者事件驱动IO）
        而传统的线程模型就是当收到一个连接，server保持连接连通直到页面或者什么事务请求完成。如果他需要花几微妙时间去读取磁盘或者访问数据库，web server就阻塞了IO操作（这也被称之为阻塞式IO）.想提高这样的web server的性能就只有启动更多的server实例
   4、 NodeJS是跨平台，按照规范的编码，就可以跨平台开发、跨平台部署、跨平台运行；path问题

# 从0-1搭建koa_demo
    1、 查看node版本，必须是7.6以上；
    2、 安装koa；
       npm init创建package.json文件，新建一个app.js入口文件；npm install koa
    3、 koa的基本使用
        a、搭建http服务；
            const Koa = require('koa');
            const app = new Koa();
            app.listen(3000);
        b、koa提供了一个context对象，包括http请求和http响应;
        c、context.response的AP可以定义发送到前端的类型，内容，status等等，例如可以通过context.response.body="hello world"发送到前端
        d、context.request 获取到请求的各种参数，path、url等等
    4、 koa基本模块
        a、路由：网站一般都有多个页面。通过ctx.request.path可以获取用户请求的路径;根据不同的路由响应不同的内容；一般使用封装好的koa-router模块；看router下面的index.js了解使用方法；
        b、静态资源：处理网站的静态脚本，css文件，图片等，用koa-static模块，统一处理静态资源的请求；
        c、中间件：在http请求和http响应之间需要实现某种功能，实现某种功能的函数就叫中间件；Koa 所有的功能都是通过中间件实现的；app.use()用来加载中间件；每个中间件函数接    受2个参数，一个是context对象；另外一个是next函数；只有调用next函数，才会执行下一个中间件；如果是异步中间件，比如读取数据库这个一步操作，就必须使用async函数；
        多个中间件会形成一个栈结构（middle stack），以"先进后出"（first-in-last-out）的顺序执行。
        d、错误处理:方式一：内部提供context.throw(500);
                方式二：context.response.status=500,context.response.message=”内部错误”
                方式三：最外层的处理错误的中间件；
                方式四：error事件的监听；koa内部有一个err事件，运行中一旦出错，就会触发这个事件
        e、koa-body 处理post请求和文件上传等；
        f、koa-cors 处理跨域请求；
        g、logger4 打印日志；

# 数据库
    1、mysql安装，同时可以安装一个navcat premium可视化工具，方便操作，查看
    2、sequelize简介
        a、sequelize是对于nodeJs操作数据库的封装，基本上每一个方法都会返回一个promise
        b、优点：封装了防sql注入，功能丰富，可以非常方便的进行连表查询
        c、sequelize基本使用
            1、npm install mysql 安装mysql模块，驱动mysql服务器
            2、npm install sequelize 安装 sequelize
            3、建立数据库链接
            4、定义model实例，通俗来说你的表结构定义出来；执行User.sync({force: true})就会在数据库中根据定义的创建一个数据表；我们也可以先定义好表结构，再来定义Sequelize模型，这时可以不用sync。两者在定义阶段没有什么关系，直到我们真正开始操作模型时，才会触及到表的操作，但是我们当然还是要尽量保证模型和表的同步
            5、数据库操作，单表的增删改查

# 项目结构
        ├── app.js       项目入口文件
        ├── router        路由文件夹
            └── index.js  路由动态整合    
        ├── log       日志存储目录（自动生成）每日会更新一次日志文件
        ├── dbpool    数据库相关文件目录
            ├── config.js   不同环境数据库配置
            ├── connect.js  数据库连接池
            └── query.js    数据库query操作的统一方法
            └── controller      项目应用层控制目录
        ├── libs        工具库
            ├── util        工具库
            └── middleware  中间件(存放app使用的中间件)
        ├── static        静态文件夹
            ├── index.html  页面
            ├── js  	js静态文件夹
            └── css  	样式静态文件夹

# nginx 配置 
 安装ngnix；brew install nginx;如果没有brew则需要先安装brew 终端执行命令行：
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)" 

//  配置开始： 
    执行vi /usr/local/etc/nginx/nginx.conf 命令行进入nginx.conf文件；进行server配置；
    配置的写法：
    静态文件配置方式：
    server{
    listen 80;
    server_name www.statictest.com;  //域名配置
    root /Users/wowdesign/Desktop/somedemo/koaDemo/static; (这里添加自己的项目静态文件目录)
    location / {
    autoindex on;
    index index.html index.htm;
    }
    }

    反向代理配置：即访问api.zerotoone.com域名实则访问的是http://127.0.0.1:9000
        server {
    listen 80;
    server_name   api.zerotoone.com;
    location / {
        proxy_pass    http://127.0.0.1:9000;
        proxy_redirect default;
    }
    }
## 需要在hosts文件中进行配置 执行 vi /etc/hosts；
    配置方式为：
    127.0.0.1    www.statictest.com
    127.0.0.1   api.zerotoone.com；
    浏览器访问这个www.statictest.com这个域名回指向127.0.0.1；访问api.zerotoone.com会指向127.0.0.1;
//配置结束

注意权限问题：
要在nginx.conf文件里的第一行配置 user  root owner;才能访问root的静态文件，否则会报403；

nginx常用的命令行：sudo nginx 启动nginx; 重启：nginx -s reload；
查看nginx进程ps -ef | grep nginx；
杀死进程kill -QUIT 主进程号；kill -TERM 主进程号；


# sql注入：
sql注入的意思是：所谓SQL注入，就是通过把SQL命令插入到Web表单提交或输入域名或页面请求的查询字符串，最终达到欺骗服务器执行恶意的SQL命令。
http://localhost:3452/ExcelUsingXSLT/Default.aspx?jobid=1'or 1=(select count(*) from job)
写成这种格式，后面这就是一个sql语句；数据库就会执行这个语句，从而获取到一些信息；
Sequelize框架内部封装了防御sql注入；
前端对用户的输入做校验

# xss:
xss,恶意脚本注入自己的网站给用户的浏览器，恶意脚本可以访问任何cookies信息、会令牌、或者其他由浏览器保存的但由那个网站使用的敏感信息，甚至可以修改当前网页内容。一般都是js脚本。
一般发生在用户输入；html标签中script,img等标签中；
预防方法：
1/前端渲染用ajax异步请求（从服务器端拿到的就带有恶意脚本，直接获取数据要安全一些,前端可以用text渲染）；
2/前端提交过来的数据，在后台入口处统统对HTML中的关键字进行html编码转义。








    


