<<<<<<< HEAD
# hcs-pad
前端控制端
=======
# JMC
工具箱

## 使用方法

### 安装项目依赖

> 打开并进入克隆的项目根目录下执行以下命令
> 以下命令推荐 使用 pnpm 进行操作 不过你依然可以使用 npm/yarn

```shell
pnpm install
```

### 运行项目

#### 任意编辑器直接运行本项目

```shell
# h5端
pnpm dev:h5
# 微信小程序端
pnpm dev:mp-weixin
# 安卓端
pnpm dev:app-android
#... 更多端请参阅 package.json/script
```

#### 在 HBuilder 中运行本项目

1. 将项目拖动到 HBuilder 中
2. 使用 pnpm install 安装好依赖
3. 点击项目 /src 目录中的任意文件
4. 点击编辑器上方点击运行选择需要运行的环境

### 功能示例

#### 静态资源处理

```js
// 使用远程静态资源
import { useAssets } from './utils/assets/remote'

// 使用本地静态资源
import { useAssets } from './utils/assets/local'

// 全局挂载
app.config.globalProperties.$assets = useAssets

// template中使用
//  <img :src="$assets('/temp.png')" />
```

#### 全局主题色定制

> 由 [unocss-preset-shades](https://github.com/viarotel-org/packages/tree/main/packages/unocss-preset-shades#readme) 提供支持

```html
<!-- 设置文本色为主题色色调为 500 -->
<div class="text-primary-500"></div>
<!-- 设置背景色为主题色色调为 500 -->
<div class="bg-primary-500"></div>
<!-- 设置边框色为主题色色调为 500 -->
<div class="border border-primary-500"></div>
<!-- 更多使用方式请参阅 https://tailwindcss.com/docs -->
```

#### 请求后端数据

> 详细使用请参阅 [uni-network](https://github.com/uni-helper/uni-network)

#### 路由间功能跳转

### 主要使用的包

- vitejs
- uniapp
- pinia
- uview-plus
- uni-ui
- @uni-helper/uni-network
- uniapp-router-next
- z-paging
- unocss
- unocss-applet

### 常见问题

#### 无法正常安装依赖/无法启动

删除 pnpm-lock.yaml / yarn.lock / package-lock.json 文件后重新安装依赖
>>>>>>> 8da8bb8856ed2e6a845a7f9b5d4cdcaad87cfbc0
