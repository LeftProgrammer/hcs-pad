/*
 * @Author: pengchun pengchun@example.com
 * @Date: 2024-01-29 20:17:02
 * @LastEditors: pengchun pengchun@example.com
 * @LastEditTime: 2024-02-28 11:49:22
 * @FilePath: \jmc-pad-vue3\src\router\guards\permission\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import store from '@/store/index.js'
// import { homePath, loginPath } from '@/configs/index.js'
const homePath = '/pages/home/index'
const loginPath = '/pages/login/index'

const whiteList = [loginPath]

const permission = (router) => {
  const userStore = store.useUserStore()

  const loginRoute = to => ({
    path: loginPath,
    navType: 'reLaunch',
    force: true,
    query: {
      redirect: JSON.stringify({
        path: to.path,
        query: to.query,
      }),
    },
  })

  router.beforeEach((to, from, next) => {
    // console.log('permission.beforeEach.to', to)
    // console.log('permission.beforeEach.from', from)

    const token = userStore.token
    const userId = userStore.userId

    if (token) {
      console.error(11111111)
      if (to.path === loginPath) {
        next(homePath)
      }
      else if (userId) {
        next()
      }
      else {
        userStore.logout({ silenced: true })
        next(loginRoute(to))
      }
    }
    else if (whiteList.includes(to.path)) {
      console.error(22222222)
      next()
    }
    else {
      console.error(3333333)
      next(loginRoute(to))
    }
  })

  // router.afterEach(() => {})
}

export default permission
