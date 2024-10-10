<!--
 * @Author: pengchun pengchun@example.com
 * @Date: 2024-01-26 15:36:26
 * @LastEditors: pengchun pengchun@example.com
 * @LastEditTime: 2024-01-30 11:02:41
 * @FilePath: \jmc-pad-vue3\src\pages\white\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view></view>
</template>
<script>
export default {
    name: 'White',
    data() {
        return {}
    },
    onLoad() {
		console.log('white onLoad');
      setTimeout(() => {
        uni.navigateBack()
      }, 500)
		
    },
    onShow() {
      console.log('white onShow');
    }
}
</script>
