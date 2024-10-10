/*
 * @Author: pengchun pengchun@example.com
 * @Date: 2024-01-26 14:44:44
 * @LastEditors: pengchun pengchun@example.com
 * @LastEditTime: 2024-02-29 10:08:53
 * @FilePath: \jmc-pad-vue3\src\store\app\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineStore } from 'pinia'
import { getSiteConfig } from '@/api/base/index'
import { primaryColor } from '@/configs/index.js'

export const useAppStore = defineStore({
  id: 'app',
  state() {
    return {
      themeConfig: uni.getStorageSync('app/themeConfig') || {
        primaryColor,
      },
      siteInfo: {},
      systemInfo: {},
      networkIsConnected: true // 网络是否连接
    }
  },
  getters: {
    primaryColor: state => state.themeConfig?.primaryColor,
    getNetworkStatus: state => state.networkIsConnected
  },
  actions: {
    getSystemInfo() {
      return new Promise((resolve) => {
        uni.getSystemInfo({
          success: (res) => {
            this.systemInfo = res
            resolve(res)
          },
        })
      })
    },
    async getSiteConfig() {
      const res = await getSiteConfig()
      if (res.success) {
        const { title } = res.data
        this.siteInfo = {
          appName: title,
        }
      }
    },
    setNetworkStatus(val) {
      this.networkIsConnected = val
    },
  },
})
