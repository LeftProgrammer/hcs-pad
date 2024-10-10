/*
 * @Author: pengchun pengchun@example.com
 * @Date: 2024-01-29 09:35:48
 * @LastEditors: pengchun pengchun@example.com
 * @LastEditTime: 2024-02-29 11:37:26
 * @FilePath: \jmc-pad-vue3\src\configs\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const isProduction = process.env.NODE_ENV === 'production'

export const appName = 'jmc-pad-v2'

// 项目主题色
export const primaryColor = '#3c9cff'

// 项目基础路径
export const appBasePath = isProduction ? './' : './'
// 请求地址
export const requestURL = 'http://jmc.jinghesoftware.com' // 正式环境
// export const requestURL = 'http://192.168.10.110:8053' // 测试环境
// export const requestURL = "http://192.168.70.131:8052" // 余少强本地服务
export const requestPath = '/jmc'
export const requestFilePath = '/file'
// 是否开启代理
// export const useProxy = isH5
export const useProxy = false
// 代理路径
export const proxyPath = '/proxy'
// 代理端口号
export const proxyPort = 1996
// 是否开启加密
export const useEncrypt = false
// 是否使用远程导航菜单
export const useRemoteMenu = true

// 主页面路径
export const homePage = 'pages/home/index'
