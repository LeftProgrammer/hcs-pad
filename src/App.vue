<!--
 * @Author: pengchun pengchun@example.com
 * @Date: 2023-12-05 15:21:50
 * @LastEditors: pengchun pengchun@example.com
 * @LastEditTime: 2024-02-27 11:36:38
 * @FilePath: \jmc_pad\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!-- <template>
	<view class="app" :titleNView="false" style="height: 100%;" ref="app">
		<router-view></router-view>
	</view>
</template> -->
<script>
import { getNetworkStatus } from "@/utils/utils/index.js";
import appUpdate from '@/utils/appUpdate.js';
export default {
  data() {
    return {}
  },
  onLaunch() {
    console.log('App Launch')
    appUpdate({tips: false, isUpdate: true});
  },
  onShow() {
    console.log('App Show')
    // 监听网络状态变化
    uni.onNetworkStatusChange((res) => {
			console.error('res.isConnected===>', res.isConnected);
      this.$store.app?.setNetworkStatus(res.isConnected)
		});
    getNetworkStatus().then(res => {
      console.error('getNetworkStatus===>', res)
      let val = !['none'].includes(res)
      this.$store.app?.setNetworkStatus(val)
    })
    // #ifdef APP-PLUS
    plus.screen.unlockOrientation()
    plus.screen.lockOrientation('landscape-primary') // 解除屏幕方向的锁定
    // #endif
    const windowResizeCallback = (res) => {
      console.log(`变化后的窗口宽度=${res.size.windowWidth}`)
      console.log(`变化后的窗口高度=${res.size.windowHeight}`)
      uni.navigateTo({
        url: '/pages/white/index',
      })
    }
    uni.onWindowResize(windowResizeCallback)
  },
  onHide() {
    console.log('App Hide')
    // 移除监听   TODO：暂未生效
    uni.offNetworkStatusChange(() => {
      console.error('offNetworkStatusChange')
    })
    // #ifdef APP-PLUS
    plus.screen.unlockOrientation()
    // #endif
    uni.offWindowResize(() => {})
  },
  mounted() {
    // this.$refs.app?.addEventListener('click', () =>
    // 	this.$emit('request-enter-full-screen'); // 当用户点击时触发 'request-enter-full-screen' 事件
    // });
  },
}
</script>

<style lang="scss">
@import '@climblee/uv-ui/index.scss';
@import '@/styles/css/index.scss';
</style>
