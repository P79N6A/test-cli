# 说明

## 1. 默认依赖项

默认依赖项，指在初始化项目目录结构默认会安装的依赖。其中主要包括 futu 内部服务、koa 框架及其相关中间件、vue 技术栈、webpack 及相关 loader 、babel 等。

### 1.1 dependencies

1. futu

| 依赖名称 | 依赖版本 |  作用  |
| -------- | ----- | ---- |
| @futu/node-cmlb | 3.0.1 | 用于获取服务 ip 与端口 |
| @futu/node-uls  | 3.0.0 | uls 日志上传服务 |
| @futu/render    | 1.0.0 | Node.js 服务前端页面公共模块接入和页面渲染组件 |
| @futu/monitor   | 1.0.0 | monitor 系统上报接口 |
| @futu/srpc      | 1.0.0 | @futu/verification-ticket 依赖 |
| @futu/trade-password | 1.0.1 | 交易密码服务 |
| @futu/verification-ticket | 1.1.0 | 验票服务 |

2. koa

| 依赖名称 | 依赖版本 |  作用  |
| -------- | ----- | ---- |
| koa        | 2.5.2 | web 开发框架 |
| koa-body   | 4.0.4 | 解析请求体 |
| koa-i18n   | 2.1.0 | 多语言 |
| koa-json   | 2.0.2 | JSON 美观的输出相应中间件，还可将对象流转换成二进制 |
| koa-locale | 1.3.0 | 根据查询 `?locale=en-US`、子域名 `z-CN.koajs.com`、 `Accept-lanuage`、`cookie:locale=zh-TW` 获取当地语言变量 |
| koa-logger | 3.2.0 | 请求/响应日志记录 |
| koa-onerror | 4.1.0 | koa 错误处理中间件 |
| koa-route | 7.4.0 | 路由 |
| koa-session | 5.9.0 |  |
| koa-static | 5.0.0 | 静态文件 |

3. 其他

| 依赖名称 | 依赖版本 | 作用 |
| ------- | ------  | ----- |
| acorn | 6.0.4 | js 解析器 |
| ejs | 2.6.1 | 模版引擎，render 中使用 |
| ioredis | 4.0.0 | node.js redis |
| ipip-datx | 0.0.2 | 解析 datx 格式的 Node.js 代码 |
| request | 2.88.0 | http 请求，request-promise-native 同等依赖 |
| request-promise-native | 1.0.5 | promise 请求 |

### 2.1 devDependencies


1. futu

| 依赖名称 | 依赖版本 |  作用  |
| -------- | ----- | ---- |
| eslint-config-futu | 1.0.3 | futu js 代码规范 |


2. vue

| 依赖名称 | 依赖版本 |  作用  |
| -------- | ----- | ---- |
| vue        | 2.5.21 |  |
| vue-i18n   | 8.5.0 | 多语言 |
| vue-router | 15.4.2 | 路由 |
| vue-template-compiler | 2.5.21 | 模版解析器，vue-loader 的生产依赖 |
| vuex | 3.0.1 | 状态管理 |

3. webpack

| 依赖名称 | 依赖版本 |  作用  |
| -------- | ----- | ---- |
| webpack   | 4.17.2 |  |
| webpack-cli   | 3.1.0 |  |
| clean-webpack-plugin | 0.1.19 | 构建前清理 /dist 文件夹 |
| optimize-css-assets-webpack-plugin | 2.0.1 | 压缩 js |
| html-inject-plugin | 1.0.6 | 动态注入 js/css
| mini-css-extract-plugin | 0.4.2 | css 提取 |
| @kazupon/vue-i18n-loader | 0.3.0 |  |
| babel-loader | 8.0.2 |  |
| vue-loader | 15.4.2 |  |
| css-loader | 1.0.0 | vue-loader 同等依赖 |
| html-loader | 0.5.5 | html-inject-plugin 同等依赖 |
| style-loader| 0.23.1 | html-inject-plugin 同等依赖 |
| url-loader| 1.1.1 | 加载图片 |

4. babel

| 依赖名称 | 依赖版本 | 作用 |
| ------- | ------  | ----- |
| @babel/core | 7.0.0 |  |
| @babel/plugin-transform-runtime | 7.0.0 |  |
| @babel/polyfill | 7.0.0 |  |
| @babel/preset-env | 7.2.0 | 支持哪些新特性 |
| @babel/runtime  | 7.2.0 |  @babel/plugin-transform-runtime 生产依赖 |

5. 其他

| 依赖名称 | 依赖版本 | 作用 |
| ------- | ------  | ----- |
| chokidar | 2.0.4 | 文件监听 |
| cossync | 1.4.2 | 腾讯云文件夹同步（批量上传）工具，发布需要 |
| cryto.js | 3.1.9-1 | 加密算法 |
| eslint  | 5.9.0 | js 代码检测工具 |
| npm-run-all | 4.1.5 | npm script 多命令 |

## 2. 可选依赖项

### 2.1 dependencies

### 2.2 devDependencies

1. futu

| 依赖名称 | 依赖版本 |  作用  |
| -------- | ----- | ---- |
| @futu/css-ui | 1.7.7 |  |
| @futuweb/tool-xhr2 | 2.1.0 | xhr |

2. 其他

| 依赖名称 | 依赖版本 |  作用  |
| -------- | ----- | ---- |
| postcss | 1.7.7 | css 工程化 |
| postcss-loader | 3.0.0 |  |
| autoprefix | 9.1.5 | postcss 插件 |
| node-sass | 4.9.3 | sass |
| sass-loader | 7.1.0 | 加载 scss 文件 |
