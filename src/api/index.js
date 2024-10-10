/*
 * @Author: pengchun pengchun@example.com
 * @Date: 2024-01-26 15:32:54
 * @LastEditors: pengchun pengchun@example.com
 * @LastEditTime: 2024-02-22 16:18:56
 * @FilePath: \jmc-pad-vue3\src\api\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import * as base from './base/index.js'
import * as user from './user/index.js'
import * as common from './common/index.js'

const api = {
  ...base,
  ...user,
  ...common
}

export default {
  install(app) {
    app.config.globalProperties.$api = api
  }
}
