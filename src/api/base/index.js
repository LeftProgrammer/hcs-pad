/*
 * @Author: pengchun pengchun@example.com
 * @Date: 2024-01-26 14:44:44
 * @LastEditors: pengchun pengchun@example.com
 * @LastEditTime: 2024-02-22 17:37:41
 * @FilePath: \jmc-pad-vue3\src\api\base\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@/utils/request/index.js'
import { baseURL, responseSuccessCode } from '@/configs/request.js'

/**
 * @description 模拟接口
 * @param mockData 想要返回的模拟数据
 */
export function mock({ mockData = {}, delay = 500 } = {}) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: responseSuccessCode,
        success: true,
        data: mockData,
      })
    }, delay)
  })
}

/**
 * @desc 获取字典数据
 */
export function getDictList(dictType) {
  return mock({
    dictType,
    mockData: [],
  })
}

/**
 * @desc 获取上传地址
 */
export const getUploadURL = () => `${baseURL}/file/upload`

/**
 * @desc 下载文件
 */
export function downloadFile(id) {
  return window.open(`${baseURL}/downloadFile?id=${id}`)
}

/**
 * @desc 获取站点配置
 */
export const getSiteConfig = () => mock({ mockData: {} })

/**
 * @desc 上传文件
 */
export const uploadFile = params =>
  request.upload({
    url: '/file/upload',
    dataType: 'json',
    headers: {
      'content-type': 'multipart/form-data',
    },
    ...(params || {}),
  })
