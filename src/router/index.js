/*
 * @Author: pengchun pengchun@example.com
 * @Date: 2024-01-26 14:44:44
 * @LastEditors: pengchun pengchun@example.com
 * @LastEditTime: 2024-02-22 16:23:10
 * @FilePath: \jmc-pad-vue3\src\router\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createRouter } from '$uni-router'
import pages from '@/pages.json'
// console.log('pages', pages)

const router = createRouter({
  pages,
  addRoutes: [
    {
      path: '*',
      redirect: () => {
        return { path: '/404' }
      },
    },
  ],
})

// console.log('router', router)
export default router
