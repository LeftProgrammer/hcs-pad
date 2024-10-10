import { binaryParser } from './helper.js'
import request from './uni-network/index.js'
import store from '@/store/index.js'
import { responseSuccessCode } from '@/configs/request.js'
import { useDialog, useToast } from '@/utils/modals/index.js'

let flag = false

async function logout(message) {
	if (!flag) {
		flag = true
		// console.log('logout', message)
    // await useDialog(message, {
    //   title: '提示',
    //   showCancelButton: true,
    //   confirmButtonText: '重新登录'
    //   // cancelButtonText: '退出',
    // })
    useToast(message, {
      type: 'warning',
      duration: 3 * 1000,
    })
    const userStore = store.useUserStore()
    userStore.logout()
	}
}

export default request({
  onRequest({ url, configs, bodyKey = 'body', queryKey = 'query' } = {}) {
    // 解决什么都不传某些接口会报错的问题
    if (!configs[bodyKey]) {
      configs[bodyKey] = {}
    }

    // const body = configs[bodyKey]

    // 将 Headers类型对象转换为普通对象
    const headers
      = configs.headers.toString() === '[object Headers]'
        ? Object.fromEntries(configs.headers.entries())
        : configs.headers

    // 将 token 添加到请求头上
    const userStore = store.useUserStore()
    const token = userStore.token
    console.log('token=========', token)
    if (token) {
      headers['X-Access-Token'] = token
      headers.token = token
    }

    // 初始化数据加密
    // configs.aes = aesHelper({ headers, params: body })
    // const ret = configs.aes.encrypt()
    // configs[bodyKey] = ret.params
    // configs.headers = {
    //   ...headers,
    //   ...ret.headers,
    // }

    // console.log('onRequest.url', url)
    // console.log('onRequest.headers', configs.headers)
    // console.log('onRequest.body', body)
    // console.log('onRequest.query', configs[queryKey])
    // console.log('onRequest.configs', configs)
    return configs
  },
  onRequestError(error) {
    // console.log('onRequestError.error', error)
    return Promise.reject(error)
  },
  async onResponse({ url, configs, response, dataKey = 'data' } = {}) {
    // console.log('onResponse.response', response)
    // 文件二进制流响应全部数据（Tips:文件名在请求头中）
    if (configs?.responseType === 'blob') {
      response[dataKey] = await binaryParser(response, { dataKey })
    }

    // 数据解密
    // response[dataKey] = configs.aes.decrypt({ data: response[dataKey] })

    const data = response[dataKey] || {}
    const { code } = data
    const message = data.message || data.msg
    // 请求失败时终止
    if (!code) {
      if (message === 'Token失效，请重新登录') {
        await logout(message)
      } else {
        useToast(message || '网络异常', {
          type: 'warning',
          duration: 3 * 1000,
        })
      }
      return response
    }
    // 校验 code
    if (code === '10002' || code === '10001') {
      await logout(message)
    }
    else if (code != responseSuccessCode && message) {
      useToast(message, {
        type: 'warning',
        duration: 3 * 1000,
      })
    }

    response.data = {
      ...data,
      success: data.code == responseSuccessCode,
    }

    return response
  },
  async onResponseError({ response, dataKey = 'data' } = {}) {
    const data = response[dataKey]
    const status = response.status
    const statusText = response.statusText

    // console.log('onResponseError.response', response)
    // console.log('onResponseError.data', response[dataKey])
    // console.log('onResponseError.status', response.status)
    // console.log('onResponseError.statusText', response.statusText)

    if (status === 401 || status === 403) {
      await logout(statusText)
    }
    else {
      const message = statusText || data
      useToast(message + '1232', {
        type: 'error',
        duration: 3 * 1000,
      })

      return Promise.reject(response)
    }
  },
})
