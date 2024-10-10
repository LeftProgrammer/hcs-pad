<!--
 * @Author: pengchun pengchun@example.com
 * @Date: 2024-01-28 21:02:52
 * @LastEditors: pengchun pengchun@example.com
 * @LastEditTime: 2024-02-20 16:21:03
 * @FilePath: \jmc-pad-vue3\src\pages\preview\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<view class="file-page">
		<!-- 预览文件 -->
		<web-view v-if="fileType === 1" class="word-content" :src="pdfSrc" @message="handlePostMessage" :webview-styles="webviewStyles"></web-view>
		<!-- 预览视频 -->
		<video v-if="fileType === 2" :src="fileObj?.src" autoplay class="video-content"></video>
		<!-- 预览图片 -->
		<swiper v-if="fileType === 3" class="img-content">
			<swiper-item v-for="(item, index) in fileParams.imageList" :key="index">
				<image :src="item" class="img" mode="aspectFit"></image>
			</swiper-item>
		</swiper>
		<view v-if="fileType === 4" class="web-content">
			<view class="pop-top">
				<view class="title"></view>
				<view class="opt">
					<uni-icons style="margin-right: 10px;" v-if="webObj.username"
						:type="usernameActive ? 'person-filled' : 'person'" size="30" color="#fff"
						@click="copyUsername"></uni-icons>
					<uni-icons style="margin-right: 10px;" v-if="webObj.password"
						:type="passwordActive ? 'locked-filled' : 'locked'" size="30" color="#fff"
						@click="copyPassword"></uni-icons>
					<uni-icons type="closeempty" @click="goBack" size="30" color="#fff"></uni-icons>
				</view>
			</view>
			<view class="pop-cont">
				<iframe :src="webObj.src" frameborder="o" width="100%" height="100%"></iframe>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fileType: null,
				imageList: [],
				fileObj: {
					name: '',
					src: ''
				},
				webObj: {
					username: '',
					password: '',
					src: ''
				},
				viewerPath: '/hybrid/html/web/viewer.html',
				pdfSrc: '',
				totalPage: 0, //总页码
				currentReadPage: 0, //当前页码
				webviewStyles: {
					progress: {
						color: '#FF3333'
					}
				},
				usernameActive: false,
				passwordActive: false
			};
		},
		onLoad(option) {
			let options = JSON.parse(decodeURIComponent(option.fileParams))
			this.fileType = options.type
			if (options.type === 1 || options.type === 2) this.fileObj = options.item || {}
			if (options.type === 3) this.imageList = options.item || []
			if (options.type === 4) this.webObj = options.item || {}
			console.log('fileObj===>', options)

			if (this.fileType === 1) { // 预览文档
				// #ifdef APP-PLUS
				let navbarHeight = 0; // 导航栏高度
				let height = 0; //定义动态的高度变量
				let statusbar = 0; // 动态状态栏高度
				uni.getSystemInfo({
					// 获取当前设备的具体信息
					success: sysinfo => {
						// navbarHeight = sysinfo.platform === 'android' ? 29 : 24;
						statusbar = sysinfo.statusBarHeight;
						height = sysinfo.windowHeight;
					}
				});
				let currentWebview = this.$scope.$getAppWebview(); //获取当前web-view
				setTimeout(function () {
					var wv = currentWebview.children()[0];
					wv.setStyle({
						//设置web-view距离顶部的距离以及自己的高度，单位为px
						top: statusbar + navbarHeight, //此处是距离顶部的高度，应该是你页面的头部
						height: height - statusbar - navbarHeight, //webview的高度
						scalable: false, //webview的页面是否可以缩放，双指放大缩小,
					});
				}, 200); //如页面初始化调用需要写延迟
				this.previewPdf(this.fileObj?.src)
				// #endif

				/* 设置标题 */
				// this.fileUrl = "https://zjjcmspublic.oss-cn-hangzhou-zwynet-d01-a.internet.cloud.zj.gov.cn/jcms_files/jcms1/web3096/site/attach/0/f81f4e5464f944c292a1e2e7425966d5.pdf"
				// this.fileUrl = options.url
				// this.title = options.title
				// uni.setNavigationBarTitle({
				// 	// title: '政府信息公开目录2022_PDF'
				// 	title: options.title
				// });

				// #ifdef H5
				this.previewPdf(this.fileObj?.src)
				// #endif

				// #ifdef MP-WEIXIN
				console.log('MP-WEIXIN')
				this.previewWechat(this.fileObj?.src)
				// #endif
			}
		},
		created() {
			
		},
		mounted() {
			console.error('preview===>', 'mounted')
			// #ifdef H5
			window.addEventListener("message", this.ReceiveMessage);
			// #endif
		},
		//页面销毁前
		beforeDestroy() {
			console.error('preview===>', 'beforeDestroy')
		},
		onBackPress() {
			console.error('preview===>', 'onBackPress')
			// 注意：App模式无法获取'pdfjs.history'缓存，解决方案为插件内不进行缓存
			// uni.removeStorageSync({ //清除pdf留下的缓存，不干扰新的pdf载入
			// 	key: 'pdfjs.history',
			// 	success() {
			// 		console.log("removeStorage", 'res')
			// 	}
			// })
		},
		methods: {
			goBack() {
				uni.navigateBack()
			},
			
			// 微信小程序预览文档,可预览.doc,.docx,.xls,.xlsx,.pdf等文件
			previewWechat(urlPdf) {
				uni.showLoading({
					title: '正在加载中..'
				})
				uni.downloadFile({
					url: urlPdf,
					success: (res) => {
						const filePath = res.tempFilePath;
						uni.openDocument({
							filePath: filePath,
							showMenu: true,
							success: () => {
								console.log('打开文档成功');
								uni.hideLoading()
							}
						})
					},
					complete: () => {
						uni.hideLoading()
					}
				})
			},
			
			// APP，H5预览文档图片和视频，微信小程序预览图片和视频
			previewPdf(path) {
				// this.pdfSrc = `${this.viewerPath}?url=${path}`
				console.log('previewPdf-path===>', path)
				this.pdfSrc = `${this.viewerPath}?file=${encodeURIComponent(path)}&page=1`;
				console.log('previewPdf-this.pdfSrc===>', this.pdfSrc)
			},
			//uni 组件通信 监听
			handlePostMessage(data) {
				let arr = data.detail.data.pop()
				this.totalPage = arr[0].totalPage //总页数
				this.currentReadPage = arr[1].page + 1 //当前页数
				console.log("app:", this.totalPage, this.currentReadPage);
			},
			//h5 监听
			ReceiveMessage(event) {
				if (event.data && event.data.data && event.data.data.arg) {
					this.totalPage = event.data.data.arg[0].totalPage
					this.currentReadPage = event.data.data.arg[1].page + 1
				}
				console.log("app:", this.totalPage, this.currentReadPage);
			},
			//页面销毁前动作
			addBrowseRecord() {
				console.log("总页数：",this.totalPage);
				console.log("当前页数：",this.currentReadPage);
			},

			// 网页链接
			copyUsername() {
				uni.setClipboardData({
					data: this.webObj.username,
					success: () => {
						this.usernameActive = true
					}
				});
			},
			copyPassword() {
				uni.setClipboardData({
					data: this.webObj.password,
					success: () => {
						this.passwordActive = true
					}
				});
			}
		}
	} 
</script>

<style lang="scss" scoped>
.file-page {
	height: 100vh;
	.word-content {
		width: 100%;
		height: calc(100vh - 44px); 
		background-color: #F2F3F5;
	}
	.video-content {
		width: 100%;
		height: 100%;
	}
	.img-content {
		width: 100%;
		height: calc(100vh - 44px); 
		margin: 0 auto;
		.img {
			width: 100%;
			height: 100%;
		}
	}
	.web-content {
		width: 100vw;
		height: 100vh;
		background: #fff;
		margin: auto;
		display: flex;
		flex-direction: column;
		.pop-top {
			position: fixed;
			top: 0;
			z-index: 20;
			width: 100%;
			display: flex;
			justify-content: space-between;
			height: 45rpx;
			padding: 12rpx 18rpx 0;
			background: #1690ff;
			align-items: center;
			.title {
				color: #fff;
				font-size: 14px;
				font-weight: 600;
			}
		}
		.pop-cont {
			padding: 50rpx 5rpx 5rpx 5rpx;
			flex: 1;
		}
	}
}
</style>