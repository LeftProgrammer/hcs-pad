/*
 * @Author: pengchun pengchun@example.com
 * @Date: 2024-01-29 09:36:34
 * @LastEditors: pengchun pengchun@example.com
 * @LastEditTime: 2024-02-04 17:03:34
 * @FilePath: \jmc-pad-vue3\pages.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
  easycom: {
    autoscan: true,
    custom: {
      '^uni-(.*)': '@dcloudio/uni-ui/lib/uni-$1/uni-$1.vue',
      '^uv-(.*)': '@climblee/uv-ui/components/uv-$1/uv-$1.vue',
      '^(?!z-paging-refresh|z-paging-load-more)z-paging(.*)':
        'z-paging/components/z-paging$1/z-paging$1.vue',
    },
  },
  pages: [
    {
      path: "pages/home/index",
      aliasPath: "/"
    },
    {
      path: 'pages/login/index',
      aliasPath: '/login'
    },
    {
      path: "pages/mine/index",
      aliasPath: "/mine",
      style: {
        navigationBarBackgroundColor: "#3478f6",
        enablePullDownRefresh: false
      }
    },
    {
      path: "pages/white/index",
      aliasPath: "/white"
    },
    {
      "path": "pages/preview/index",
      "aliasPath": "/preview",
      "style": {
        "navigationBarTitleText": "#3478f6",
        "enablePullDownRefresh": false
      }
    },
    {
      path: 'pages/errors/404/index',
      aliasPath: '/404',
      style: {
        navigationBarTitleText: '404',
      }
    }
  ],
  subPackages: [
    {
      root: 'pages/webview',
      pages: [
        {
          path: 'index',
          aliasPath: '/webview',
          style: {
            navigationBarTitleText: 'webview',
          },
        },
      ],
    },
  ],
  globalStyle: {
    navigationBarTextStyle: "white",
    navigationBarTitleText: "JMC",
    navigationBarBackgroundColor: "#3478f6",
    navigationStyle: "custom",
    backgroundColor: "#3478f6",
    pageOrientation: "landscape",
    rpxCalcMaxDeviceWidth: 2560,
    rpxCalcBaseDeviceWidth: 750,
    rpxCalcIncludeWidth: 750,
  }
})
