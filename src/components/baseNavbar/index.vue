<template>
    <view class="base-navbar">
        <uv-navbar :title="title" @leftClick="goBack" :fixed="false" :safeAreaInsetTop="false" height="32rpx" bgColor="#1690FF" titleStyle="color: #fff">
            <template v-slot:left>
                <view class="uv-nav-slot">
                    <view class="nav-left">
                        <uv-icon name="arrow-left" size="20" color="#fff"></uv-icon>
                    </view>
                </view>
            </template>
        </uv-navbar>
    </view>
</template>
<script>
	export default {
        name: "BaseNavbar",
        props: {
			title: {
                type: String,
				default: ''
            }
        },
		methods: {
			goBack() {
				uni.navigateBack()
			},
		}
	}
</script>
<style lang="scss" scoped>
.base-navbar {
    position: fixed;
	top: 0;
	z-index: 20;
	width: 100%;
	height: 45rpx;
	background-color: #1690FF;
	padding: 12rpx 0 1rpx ;
    .nav-left {
        width: 32rpx;
        height: 32rpx;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>