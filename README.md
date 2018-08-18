# easy-node-ssr-cli

## 如何进行打包

```
// install
npm i  // cnpm i

// copy private-config file
npm run cp

// build
npm run build

// run
npm run product

// stop process
npm run stop

// delete process
npm run delete

```

## 如何进行开发

```
npm i

npm run cp

// 运行 node 服务，会使用 nodemon 执行 app.js，一旦项目的文件更新，就会自动重启服务
npm start

// 前端开发模式，因为 webpack 和 node 连接在一起，所以每次更新文件的话， webpack 也会跟着重启
// 导致编写 js、css 的时候也会出现这种情况，所以 dev 模式下，只会用 node 执行 app.js
// 但也会有 webpack 的热更新效果
npm run dev

```

## 项目目录结构

```
$ tree -I '*node_module*|*images'
<!-- tree -I '*node_module*|*public*|*logs*|*assets'  -->
.
├── README.md
├── app  -- 后端 node 文件
│   ├── routes -- 路由
│   │   ├── api.js
│   │   └── index.js
│   └── util  -- 工具方法
│       ├── log4js.js
│       └── middleware.js
├── app.js  -- 项目总入口文件
├── client  -- 前端文件
│   ├── api  -- 前端接口定义
│   │   └── index.js
│   ├── assets  -- 静态文件
|   ├── ├── images  -- 图片资源等
│   │   └── js
│   ├── components  -- vue 组件
│   ├── page_components  -- 放置 vue 页面组件
│   │   └── header
│   ├── core  -- 核心
│   │   └── index.js  -- 定义并返回 vue 对象，每个页面 js 文件都要引入
│   ├── store  -- vuex
│   ├── styles  -- 样式表
│   │   ├── base.scss  -- 全局变量、mixin 等，通过 webpack 配置，自动引入
│   │   ├── reset.scss  -- 重置的样式代码，定义好的公共类
│   │   └── swiper.min.scss
│   ├── utils  -- 工具
│   └── views  --  视图文件
│       ├── 404.pug
│       ├── component
│       ├── error.pug
│       ├── layout  -- pug 布局文件
│       │   ├── common.pug
│       │   └── layout.pug  -- 最底层的布局文件，其余的布局文件继承此文件
│       └── page  -- 每个页面的主 js、scss、pug 文件都在一起
│           ├── home
│           │   ├── index.js
│           │   ├── index.pug
│           │   └── index.scss
│           └── my
│               ├── index.js
│               ├── index.pug
│               └── index.scss
├── common  -- 公共方法、映射表等文件，前后端共用的文件，放在这里
│   └── router  -- 路由
│       └── type.js  -- 配置路由名、路径等
├── gulpfile.js
├── logs  -- node 输出的日志
├── package-lock.json
├── package.json
├── postcss.config.js
├── private-config.js  -- 项目配置文件
├── private-config.js.example  -- 项目配置文件例子
├── process.yml  -- pm2 配置文件
├── public
|   ├── dist  -- webpack js、css打包目录
|   ├── styles  -- webpack 静态资源打包目录
│   └── views -- 处理过的 pug 文件
├── webpack-config  -- webpack 配置文件，仿 vue-cli 配置
│   ├── entrys.js  -- 定义入口
│   ├── utils.js  -- 工具方法
│   ├── vue-loader.conf.js  -- vue-loader 配置
│   ├── webpack.base.config.js
│   ├── webpack.dev.config.js
│   └── webpack.prod.config.js

```



## 命名方式

```
// css
.f-xxx // 功能类
.u-xxx // 组件类，用于 pug 定义
.m-xxx // 页面类，用于 pug 定义
.uv-xxx // vue 组件类，用于 vue 的组件
.um-xxx // vue 页面类，用于 vue 的页面组件
.g-xxx // 全局类

// 例子
// 一个登陆页面
.m-login {}
.m-login_container {}
// 一个弹窗组件
.u-dialog {}
.u-dialog_container {}

// scss 变量
$c-xxx // 颜色
$fa-xxx // 字体

// vue 组件
// 组件首字母要大写
Index.vue
Footer.vue
// 引入组件类型的组件
import uHeader from 'Header'
// 引入页面类型的组件
import mLogin from 'Login'

```





## 项目整个的架构

使用 node 进行服务端渲染，做一个中间件。使用 express + pug 。

前端这里使用 vue + jquery + elementUi进行开发。elementUi 只引入需要的组件。vue 用来实现一些复杂的交互，像表单、支付的一些逻辑操作等。jquery 用来方便操作 dom（后续开发如果觉得无用，可去掉）。

webpack 配置有大部分是 vue-cli 的配置，只做了多入口的配置和使用 webpack-dev-middleware 与 express 连接

### node

node 在这个项目的作用，主要是做一个中间件，请求后端的接口，把数据渲染到 pug 模板上，再发送给浏览器。

这个商城功能很多，如果只是用 jquery 开发会很慢，所以引入 vue 去处理一些复杂的交互、表单等操作，使用 webpack 进行模块化和静态资源的打包。

```javascript
// 一个页面文件夹的配置是这样
// js + scss + pug，js 为这个页面的入口文件
// 入口文件要引入 core/index.js 这个文件
├── home
│ ├── index.js
│ ├── index.pug
│ └── index.scss
```

这里页面文件夹，js 入口文件，只支持一级目录，多级目录不支持。

`core/index.js` 的作用：

相当于我们单页应用的入口文件那样，对 vue 进行配置等操作

```javascript
export default new Vue({
  el: '#app',
  store,
  components: {
    uHeader
  }
})

```

然后会返回一个 Vue 实例对象



```
block content
  div(class='m-home test')
    u-header
```

然后在 pug 里面，声明 `u-header` 标签，就可以使用了。



### 处理静态资源路径问题

因为用的是 node + pug 进行开发，所以使用 gulp 去处理静态资源的 hash 。当 webpack 打包之后，会使用 gulp 给 pug 的 js、css 添加 hash，同样 js、css 文件也会加上相应的 hash 。

但是这样有些不常变的资源，像 common.js/vendor.js 这样的依赖集合，同样也会加上新的 hash，这里比较难受，可能还是要找 webpack 的处理方式。上面的 gulp 只是临时的解决方案。



## TODO

1. pug 静态资源 hash 处理 !!! -- 解决
   1. 图片 hash 处理	  -- 未解决
2. 如何把公共样式打包成一个文件 ! -- 解决
3. node 转发接口，错误处理 !!!
4. node 路由、接口的配置（嵌套路由）
5. 如何把 node 的数据给到客户端（cookie / html）


 

