<template>
	<view class="home-nav">
		<uv-navbar :fixed="false" :safeAreaInsetTop="false" height="32rpx" bgColor="#1690FF">
			<template v-slot:left>
				<view class="nav-left">
					<!-- <image class="logo" src="@/static/home/home_logo.png"></image> -->
				</view>
			</template>
			<template v-slot:center>
				<view class="nav-center">
					头部
					<!-- <uv-tabs :list="menuList" keyName="name" @change="tabChange" bgColor="#1690FF" :inactiveStyle="{color: '#fff'}" :activeStyle="{color: 'fff', fontWeight: 'bold'}" lineColor="#fff" lineWidth="45"></uv-tabs> -->
				</view>
			</template>
			<template v-slot:right>
				<view class="nav-right">
					<image class="search" src="@/static/home/search.png" mode="" @tap="goSearch"></image>
					<image :class="downloadClass" src="@/static/home/download.png" mode="" @tap="goDownload"></image>
					<view class="user-info" @tap="goMine">
						<image class="user-img" v-if="imgSuccess" :src="avatarImg" @error="onErrorImag" />
                        <image v-else class="user-img" :src="defaultAvatar" />
						{{ userInfo.realname }}<image class="right-arrow" src="@/static/home/right_arrow.png"></image>
					</view>
				</view>
			</template>
		</uv-navbar>
	</view>
</template>

<script>
import store from '@/store/index.js'
import defaultAvatar from '@/static/avatar.png'

export default {
	name: 'HomeNavbar',
	props: {
		menuList: {
			type: Array,
			default: []
		},
	},
	data () {
		return {
			userInfo: JSON.parse(uni.getStorageSync('userInfo') || '{}'),
			defaultAvatar,
			curMenuId: '',
			imgSuccess: true
		}
	},
	computed: {
		// 是否有未下载
		downloadClass() {
			console.error('store.useFileStore()?.toDownloadNum', store.useFileStore()?.toDownloadNum)
			return store.useFileStore()?.toDownloadNum > 0 ? 'to-download': 'download'
		},
		// 用户头像
		avatarImg() {
			return this.userInfo?.avatar
		}
	},
	created() {
		this.curMenuId =  this.menuList.length > 0 ?  this.menuList[0]['id'] : null
	},
	methods: {
		tabChange(item) {
			this.$emit('changeMenu', item)
        },
		onErrorImag() {
			this.imgSuccess = false
		},
		// 点击搜索
		goSearch() {
			uni.navigateTo({
				url: '/pages/search/index'
			})
		},
		// 点击下载
		goDownload() {
			uni.navigateTo({
				url: '/pages/download/index'
			})
		},
		// 我的
		goMine() {
			uni.navigateTo({
				url: '/pages/mine/index'
			})
		}
	},
}
</script>
<style lang="scss" scoped>
.home-nav {
	position: fixed;
	top: 0;
	z-index: 20;
	width: 100%;
	height: 45rpx;
	background-color: #1690FF;
	padding: 12rpx 20rpx 1rpx 20rpx;
	.nav-left {
		.logo {
			width: 68rpx;
			height: 13rpx;
		}
	}
	.nav-center {
		::v-deep .uni-scroll-view-content {
			display: flex;
			justify-content: center;
		}
		::v-deep .uv-tabs__wrapper__nav__item__text {
			color: #fff;
			font-size: 12rpx;
		}
		margin-bottom: 0;
		position: absolute;
		left: 100rpx;
		right: 152rpx;

	}
	.nav-right {
		font-size: 12rpx;
		font-weight: 500;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		position: relative;

		.search, .download, .to-download {
			width: 28rpx;
			height: 32rpx;
			padding: 8rpx 6rpx;
		}
		.to-download::after {
			position: absolute;
			top: 9rpx;
			right: 9rpx;
			content: "";
			display: inline-block;
			width: 3rpx;
			height: 3rpx;
			border-radius: 50%;
			background-color: #F22F53;
		}
		.user-info {
			display: flex;
			align-items: center;
			margin-left: 6rpx;
			padding-top: 8rpx;
			padding-bottom: 8rpx;
			.user-img {
				border-radius: 50%;
				width: 16rpx;
				height: 16rpx;
				margin-right: 4rpx;
			}
			.right-arrow {
				width: 10rpx;
				height: 10rpx;
			}
		}
	}
}
</style>