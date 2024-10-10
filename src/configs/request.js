/*
 * @Author: pengchun pengchun@example.com
 * @Date: 2024-01-26 16:50:46
 * @LastEditors: pengchun pengchun@example.com
 * @LastEditTime: 2024-02-22 16:34:56
 * @FilePath: \jmc-pad-vue3\src\configs\request.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {
  proxyPath,
  requestFilePath,
  requestPath,
  requestURL,
  useProxy,
} from './index'

const isDevelopment = process.env.NODE_ENV === 'development'

// 请求基础域名
export function getBaseURL() {
  let tempURL = ''
  if (useProxy) {
    tempURL = isDevelopment ? proxyPath : window.location.origin + requestPath
  }
  else {
    tempURL = requestURL + requestPath
  }
  return tempURL
}
// 文件基础域名
export function getFileBaseURL() {
  let tempURL = ''
  if (useProxy) {
    tempURL = isDevelopment ? requestFilePath : window.location.origin + requestFilePath
  }
  else {
    tempURL = requestURL + requestFilePath
  }
  return tempURL
}

// 请求域名
export const baseURL = getBaseURL()
console.error('config-baseURL===>', baseURL)
// 响应成功code值
export const responseSuccessCode = '200'
// 超时时间
export const timeout = 60 * 1000
// 是否开启加密
export { useEncrypt } from './index'
