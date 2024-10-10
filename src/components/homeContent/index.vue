<template>
    <view class="home-wrap">
        <view class="banner_box">
			<!-- <view class="slogan"></view> -->
			<image class="slogan" src="@/static/home/slogan.png" mode=""></image>
			<image class="slogan_01" src="@/static/home/slogan_03.png" mode=""></image>
			<image class="slogan_02" src="@/static/home/slogan_04.png" mode=""></image>
			<view class="btn" @tap="previewFile(homeVedioData)">
				<view class="btn-text">鲸禾企业宣传片</view>
				<image class="play" src="@/static/home/play_02.png" mode=""></image>
			</view>
			<view class="banner-arrow" v-show="isShowArrow" @click="scrollNextPage">
				<view class="zx0"></view>
				<view class="zx1"></view>
			</view>
		</view>
		<view class="banner_box2">
			<view class="bar">
				<view class="title">产品资料</view>
				<!-- <view class="subTitle">Enterprise Product Information</view> -->
			</view>
			<view class="box">
				<view class="item" v-for="(t, i) in list" :key="i" @click="previewFile(t)">
					<view class="item_l">
						<view class="num">{{ t.num }}</view>
						<view class="title">{{ t.title }}</view>
					</view>
					<image class="item_r" :src="t.src" mode=""></image>
				</view>
			</view>
		</view>
    </view>
</template>
<script>
	// import {
	// 	toolboxResourceList
	// } from '@/api/common/index'
	import {
		// getAllFileList,
		previewFile
	} from '@/utils/utils/index'
	export default {
		name: 'HomeContent',
		props: {
			// 滚动监听
			scrollTop: {
				type: Number,
				default: 0
			},
			currentMenuId: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				previewFile,
                // menus: [], // 一级菜单
				homeVedioData: {}, // 视频
				list: [],
				windowHeight: uni.getSystemInfoSync().windowHeight
			};
		},
		computed: {
			isShowArrow() {
				return this.scrollTop === 0
			}
		},
		watch: {
			currentMenuId: {
				handler: function (newVal, oldVal) {
					newVal && this.getData()
				},
				immediate: true
			}
		},
		methods: {
			getData() {
				let allFileList = JSON.parse(uni.getStorageSync('allFileList') || '[]') || []
				console.log(' this.allFileList=====>', allFileList)
				if (allFileList.length > 0) {
					this.list = allFileList.filter(v => v['memuId'] === this.currentMenuId)
					console.log('list=====>', this.list)
					if (this.list.length > 0) {
						this.homeVedioData = this.list[0]
						this.list = (this.list.slice(1) || []).map((v, index) => ({
							...v,
							num: `0${index + 1}`,
							src: `../../static/home/home_product0${(index + 1) % 6 ? (index + 1) % 6 : 6}.png`,
						}))
					}
				}
			},
			// 下一屏
			scrollNextPage() {
				uni.pageScrollTo({
					scrollTop: this.windowHeight,
					duration: 300
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.home-wrap {
		height: 100%;
		.banner_box {
			height: calc(100vh - 45rpx);
			margin-top: 44rpx;
			background: url('@/static/home/home_banner_02.gif') no-repeat center center;
			background-size: 100% 100%;
			position: relative;
			
			.slogan {
				width: 310rpx;
				height: 175rpx;
				position: absolute;
				opacity: 0.9;
				top: 0;
				left: 0;
			}
			.slogan_01 {
				width: 280rpx;
				height: 65.41rpx;
				position: absolute;
				top: 107.52rpx;
				left: 30rpx;
			}

			.slogan_02 {
				width: 255rpx;
				height: 13rpx;
				position: absolute;
				top: 190rpx;
				left: 30rpx;
			}

			.btn {
				width: 152rpx;
				height: 39rpx;
				background: #1E7FDC;
				border-radius: 6rpx;
				padding: 13rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				position: absolute;
				top: 248rpx;
				left: 30rpx;

				.btn-text {
					font-size: 13rpx;
					// font-size: 20px;
					line-height: 23rpx;
					font-family: HarmonyOS Sans SC;
					font-weight: 500;
					color: #FFFFFF;
				}

				.play {
					width: 20rpx;
					height: 20rpx;
				}
			}

			@keyframes arrow {
				0% {
					transform: translateY(0);
				}

				50% {
					transform: translateY(10px);
				}

				100% {
					transform: translateY(0px);
				}
			}

			.banner-arrow {
				display: flex;
				flex-direction: column;
				align-items: center;
				position: absolute;
				bottom: 10px;
				left: 50%;
				width: 57px;
				height: 50px;
				margin-left: -29px;
				animation: arrow 1.5s infinite;

				// .zx0 {
				// 	background-image: url('@/static/home/icon_zx0.png');
				// 	background-size: 100% auto;
				// 	background-position: center;
				// 	background-repeat: no-repeat;
				// 	width: 30px;
				// 	height: 30px;
				// }

				.zx1 {
					background-image: url('@/static/home/icon_zx2.png');
					background-size: 100% auto;
					background-position: center;
					background-repeat: no-repeat;
					width: 57px;
					height: 40px;
					margin-top: -20px;
				}
			}
		}

		.banner_box2 {
			// height: 932rpx;
			background: #d7dee8;
			background-size: 100% 100%;
			padding: 0 30rpx 40rpx;
			min-height: 100vh;
			width: 100%;

			.bar {
				width: 100%;
				padding: 0 12.89rpx;
				height: 43rpx;
				line-height: 43rpx;
				background: linear-gradient(90deg, #7AA3FF 0%, #3B97FF 99%);

				.title {
					font-size: 13rpx;
					font-family: HarmonyOS Sans SC;
					font-weight: 500;
					color: #FFFFFF;
				}

				.subTitle {
					margin-top: 2rpx;
					font-size: 7rpx;
					font-family: HarmonyOS Sans SC;
					font-weight: 400;
					color: #FFFFFF;
				}
			}

			.box {
				width: 100%;
				padding: 10px 10px 12px;
				background-color: #F2F3F5;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;

				.item {
					width: calc(50% - 20px);
					height: 106rpx;
					background: #FFFFFF;
					box-shadow: 0rpx 2rpx 18rpx 0rpx rgba(88, 88, 88, 0.1);
					position: relative;
					margin: 10px;

					.item_l {
						display: flex;
						flex-direction: column;
						padding-top: 24rpx;
						padding-left: 30rpx;

						.num {
							width: 26rpx;
							height: 17rpx;
							background: url('@/static/home/home_container_txtbg.png') no-repeat center center;
							background-size: 100% 100%;
							font-size: 11rpx;
							font-family: HarmonyOS Sans SC;
							font-weight: bold;
							color: #FFFFFF;
							text-align: center;
							line-height: 17rpx;
						}

						.title {
							font-size: 15rpx;
							font-family: HarmonyOS Sans SC;
							font-weight: 500;
							color: #0C0C0C;
							margin: 12rpx 0 5rpx;
						}

						.subTitle {
							font-size: 7rpx;
							font-family: HarmonyOS Sans SC;
							font-weight: 400;
							color: #666666;
						}
					}

					.item_r {
						width: 101rpx;
						height: 101rpx;
						position: absolute;
						right: 25rpx;
						bottom: 0;
					}
				}
			}
		}

		.home-vedioModel {
			background-color: rgba(0, 0, 0, 0);
			position: fixed;
			top: 0;
			left: 0;
			width: 100vw;
			height: 100vh;
			z-index: 10;

			// .rodio-popup {
			// 	width: 90vw;
			// 	height: 80vh;
			// 	background: #fff;
			// 	margin: 80px auto;
			// 	display: flex;
			// 	flex-direction: column;

				// .pop-top {
				// 	display: flex;
				// 	justify-content: space-between;
				// 	height: 36rpx;
				// 	padding: 0 10px;
				// 	background: #1690ff;
				// 	align-items: center;

				// 	.title {
				// 		color: #fff;
				// 		font-size: 14px;
				// 		font-weight: 600;
				// 	}
				// }

			// 	.pop-cont {
			// 		padding: 10px;
			// 		flex: 1;

			// 		#myVideo {
			// 			width: 100%;
			// 			height: 100%;
			// 		}
			// 	}
			// }
		}
	}
</style>