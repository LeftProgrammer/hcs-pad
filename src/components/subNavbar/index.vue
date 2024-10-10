<!--
 * @Author: pengchun pengchun@example.com
 * @Date: 2023-12-05 15:21:50
 * @LastEditors: pengchun pengchun@example.com
 * @LastEditTime: 2024-02-19 16:20:13
 * @FilePath: \jmc_pad\components\second-nav\second-nav.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <view class="secondNav">
      <view class="navBox">
        <view 
          :class="active === index ? 'nav_item active' : 'nav_item'" 
          v-for="(t,index) in subMenuList" 
          :key="index" 
          @click="handleClick(index)"
        >
          {{ t.name }}
        </view>
      </view>
    </view>
</template>
<script>
export default {
  name:'SubNavbar',
  props:{
    active: {
      type: Number,
      default: 0
    },
    subMenuList:{
      type: Array,
      default: []
    }
  },
  data() {
    return {
      // active: 0
    }
  },
  mounted() {
    
  },
  methods:{
    handleClick(val) {
      this.$emit('childClick', val);
      console.log('val====>', val)
      // this.active = val
    },
  }
}
</script>
<style lang="scss" scoped>
.secondNav {
  position: fixed;
  top: 45rpx;
  width: 100%;
  height: 28rpx;
  background-color: #fff;
  box-shadow: 2px 2px 7px 0px rgba(36,34,34,0.05);
  z-index: 20;
  .navBox {
    display: flex;
    align-items: center;
		padding: 0 20rpx;
		height: 100%;
    .nav_item {
      margin-right: 27rpx;
      color: #666666;
      padding: 0 12rpx;
      margin-right: 11px;
			line-height: 16rpx;
			height: 16rpx;
      font-weight: 500;
      font-size: 11rpx;
    }
    .active {
      border-radius: 16rpx;
      background-color: #1690FF;
      color: #fff;
      font-weight: bold;
    }
  }
}
</style>