/*
 * @Author: pengchun pengchun@example.com
 * @Date: 2024-02-05 11:28:26
 * @LastEditors: pengchun pengchun@example.com
 * @LastEditTime: 2024-02-27 11:14:04
 * @FilePath: \jmc-pad-vue3\src\store\user\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineStore } from 'pinia'
import { useAppStore } from '@/store/app/index.js'
import { userLogin, userLogout } from '@/api/common/index.js'
import { fileBaseSrc, isUrl } from '@/utils/utils/index.js'
import defaultAvatar from '@/static/avatar.png'
import router from '@/router'

export const useUserStore = defineStore('app-user', {
  state() {
    return {
      userInfo: JSON.parse(uni.getStorageSync('userInfo') || '{}'),
      token: uni.getStorageSync('token')
    }
  },
  getters: {
    userId: state => state.userInfo?.userId,
    avatar: state => state.userInfo?.avatar,
    username: state => state.userInfo?.username,
    password: state => state.userInfo?.password,
  },
  actions: {
    removeToken() {
      this.token = ''
      uni.removeStorageSync('token')
    },
    setToken(token) {
      this.token = token
      uni.setStorageSync('token', token)
    },
    getUserInfo() {
      JSON.parse(uni.getStorageSync('userInfo') || '{}')
    },
    setUserInfo(value = {}) {
      this.userInfo = Object.assign(this.userInfo, value)
      this.userInfo.userId = this.userInfo.userId || this.userInfo.id
      if (!this.userInfo?.avatar) {
        this.userInfo.avatar = defaultAvatar 
      } else if (!isUrl(this.userInfo?.avatar)) {
        this.userInfo.avatar = `${fileBaseSrc}${this.userInfo?.avatar}`
      }
      console.error('this.userInfo', this.userInfo)
      uni.setStorageSync('userInfo', JSON.stringify(this.userInfo))
    },
    removeUserInfo() {
      this.userInfo = {}
      uni.removeStorageSync('userInfo')
    },
    async login(params = {}) {
      try {
        const { code, result, message } = await userLogin(params)

        if (code !== 200) {
          throw new Error('自动登录失败, 没有获取到用户凭证')
        }
        this.setUserInfo(result?.userInfo)
        console.log('result======>', result)
        this.setToken(result?.token)
      } catch (err) {
        throw new Error('自动登录失败, 没有获取到用户凭证')
      }
    },

    async logout({ silenced = false, redirect = null } = {}) {
      // const { code, message } = await userLogout()
      // if (code !== 200) {
      //   throw new Error('网络异常！')
      // }

      // this.removeUserInfo()
      this.removeToken()

      if (!silenced) {
        router.replaceAll({
          force: true,
          path: '/login',
          query: {
            redirect,
          },
        })
      }
    }
  }
})
