# 安装依赖

npm install

# 启动项目

npm run dev

# 端口

端口号 8080，可以在 vue.config.js 中重置

###### ---> API

api 中 post 示例： data:{name: aaa}
export function getInfo(params) {
return request({
url: '/user/userInfo',
method: 'post',
data: params
})
}

api 中 get 示例： params:{name:aaa}

export function getInfo(params) {
return request({
url: '/user/userInfo',
method: 'get',
params: params
})
}
引用： getinfo(token).then(){}.catch(){}

# 图标（icons）

<svg-icon
class-name="sss" class 名称 .sss{}
icon-class="add" 图标名称 位置/icons/svg/add.svg，文件名字与 icon-class 相对应
/>

# 路由（router)

视图 views 中以 - 分割 保持和路由分割同样规则 error-page ##### path:error-page
路由 name 与 试图 views 中 name 大写字母 比如： PROPERTY_ADD
视图 views 文件夹名称 error-page 文件夹名称与路由名称（path）一一对应

# 角色权限（permissions)

权限控制 权限从 /src/store/user/GetInfo 中动态传入权限控制 如果接口没有传 就是游客权限

# 打包压缩发布

.env 文件是环境配置 .test 是测试环境 .production 是生产环境
