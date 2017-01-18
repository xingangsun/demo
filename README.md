#测试项目

## Usage
### dev + api
    npm run start

>1.此命令会启动开发和后端两个服务器，你可以在`config`文件夹中修改你的开发服务器配置  
2.开发服务器启动后，双击命令行上的链接地址即可在浏览器中打开  
3.编写`app`目录下的代码保存，浏览器即可热刷新  
4.编写`bkd`目录下的代码保存，后端服务器可热重启

### dev
    npm run dev
    
### prod
    npm run prod

## dir

app 项目源码  
|---demo demo业务源码  
|　|---components demo业务组件  
|　|---router demo业务路由  
|　|---views demo业务页面  
|　|---api.js  
|　|---app.vue  
|　|---main.js demo业务入口  
|---global 全局性  
|　|---components 全局组件  
|　|---fonts 字体图标  
|　|---img 全局图片  
bkd 模拟后端API  
build 项目构建代码  
|---config 构建项目用到的配置  
|---task 构建任务入口  
|---webpack.config.dev.js webpack开发配置  
|---webpack.config.prod.js webpack上线配置  
config 项目配置  
dist 打包生成代码目录  
site 网站配置  
zip 上线Zip包目录  
