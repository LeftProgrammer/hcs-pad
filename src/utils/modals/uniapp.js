/*
 * @Author: pengchun pengchun@example.com
 * @Date: 2024-01-26 14:44:44
 * @LastEditors: pengchun pengchun@example.com
 * @LastEditTime: 2024-02-26 11:18:45
 * @FilePath: \jmc-pad-vue3\src\utils\modals\uniapp.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
 * @desc uni 弹窗
 * @param {*} content
 * @param {*} param1
 */
export function useDialog(
  content,
  {
    title = '提示',
    showCancelButton = true,
    confirmButtonText = '确认',
    cancelButtonText = '取消',
    ...moreOptions
  } = {},
) {
  return new Promise((resolve, reject) => {
    uni.showModal({
      title,
      content,
      confirmText: confirmButtonText,
      cancelText: cancelButtonText,
      showCancel: showCancelButton,
      ...moreOptions,
      success({ cancel }) {
        if (cancel) {
          reject({ type: 'cancel' })
        }
        resolve({ type: 'confirm' })
      },
    })
  })
}

/**
 * @desc uni 轻提示
 * @param {*} content 内容
 * @param {*} options 扩展参数
 */
export function useToast(
  content,
  {
    position = 'center',
    duration = 1000,
    overlay = true,
    icon = 'none',
    ...moreOptions
  } = {},
) {
  if (!content) {
    uni.hideToast()
    return
  }
  uni.showToast({
    title: content,
    position,
    duration,
    mask: overlay,
    icon,
    ...moreOptions,
  })
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(uni)
    }, duration)
  })
}

/**
 * @desc 显示或隐藏loading
 * @param {*} content
 * @param {*} options
 */
export function useLoading(content, { overlay = true, ...moreOptions } = {}) {
  if (content && typeof content === 'boolean') {
    content = '努力加载中...'
  }
  if (!content) {
    uni.hideLoading()
    return
  }
  uni.showLoading({
    title: content,
    mask: overlay,
    ...moreOptions,
  })
}
