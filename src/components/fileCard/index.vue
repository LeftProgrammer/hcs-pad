<template>
	<view class="card" @click="previewFile">
		<view v-if="localFileUrl">
			<image :src="localFileUrl || defaultImg" mode="" @error="onErrorImag" @load="onSuccessImg"
				v-show="imgLoaded"></image>
			<image :src="defaultImg" mode="" v-show="!imgLoaded"></image>
		</view>
		<image v-else :src="defaultImg" mode=""></image>
		<view class="textCard">{{cardData.title}}</view>
		<view class="icon" :class="imgIcon"></view>
	</view>
</template>

<script>
	import defaultImg from '@/static/sub/default_img.jpg'
	import {
		fileBaseSrc,
		downloadPath
	} from '@/utils/utils/index.js'
	import store from '@/store/index.js'
	export default {
		name: 'FileCard',
		props: {
			cardData: {
				type: Object,
				default: () => {}
			}
		},
		data() {
			return {
				imgLoaded: false, // 图片是否加载完 true-加载完成
				defaultImg,
				iconOption: {
					'文档': 'pdf',
					'视频': 'vedio',
					'网页链接': 'link',
				},
				localFileUrl: ''
			}
		},
		computed: {
			fileStore() {
				return store.useFileStore()
			},
			imgDownLoadList() {
				return this.fileStore.imgDownLoadList
			},
            imgIcon() {
                return `icon-card-tip-${this.iconOption[this.cardData.dataTypeName]}`
            }
		},
		created() {
			this.setImgUrl()
		},
		methods: {
			onErrorImag() {
				this.imgLoaded = false
			},
			onSuccessImg() {
				this.imgLoaded = true
			},
			previewFile() {
				this.$emit('previewFile')
			},
			// 重写文件名
			renameFile(oldFilePath, newFilename) {
				plus.io.resolveLocalFileSystemURL(
					oldFilePath,
					(entry) => { // 获取文件对象  
						entry.getParent( // 获取目录  
							(folder) => {
								console.log('renameFile---folder=========', folder);
								entry.moveTo(
									folder,
									`/${newFilename}`,
									(newFile) => {
										// console.log("renameFile---重命名成功", newFile.fullPath)
										this.fileStore.delImgDownLoadList(oldFilePath)
										const filePath =  oldFilePath.substring(0, oldFilePath.length - 12)
										this.localFileUrl = filePath
									},
									(err) => {
										this.fileStore.delImgDownLoadList(oldFilePath)
										console.error("重命名失败，"+ err);
									}
								)
							}
						)
					}
				)
			},
			// TODO: 提前下载，进行缓存
			setImgUrl() {
				// #ifdef APP-PLUS
				if (this.cardData?.icoUrl) {
					const filePath = `${downloadPath}${this.cardData?.icoUrl}`	// 下载文件名
					const temFilePath = `${filePath}.downloading` // 下载临时文件名
					const uploadFileArr = this.cardData?.icoUrl.split('/')
					const newFileName = uploadFileArr.length ? uploadFileArr[uploadFileArr.length - 1] : null // 正式文件名
					// 1.查询本地文件
					plus.io.resolveLocalFileSystemURL(
						filePath,
						(entry) => {
							console.error('setImgUrl-filePath-entry===>', entry)
							const absoluteFilePath = plus.io.convertLocalFileSystemURL(filePath)
							console.error('setImgUrl-absoluteFilePath===>', absoluteFilePath)
							// 本地已存在, 读取本地文件
							this.localFileUrl = absoluteFilePath
						},
						(error) => {
							// 2.查询未处理临时文件
							plus.io.resolveLocalFileSystemURL(
								temFilePath,
								(entry) => {
									entry.remove(() => {
										console.error('移除重复临时文件成功')
									}, (e) => {
										console.error('移除重复临时文件失败：' + e.message)
									})
								},
								(error) => {
									// 3.本地不存在,且下载队列中没有该文件，则下载
									const imgUrl = `${fileBaseSrc}${this.cardData?.icoUrl}` // 重要：处理文件下载地址
									console.error('imgUrl===>', imgUrl)
									if (this.imgDownLoadList.indexOf(temFilePath) === -1) {
										console.error('this.imgDownLoadList', this.imgDownLoadList.length)
										let dtask = plus.downloader.createDownload(
											imgUrl, {
												filename: temFilePath
											},
											(d, status) => {}
										)
										// 监听下载状态
										dtask.addEventListener('statechanged', task => {
											if (!dtask) return
											switch (task.state) {
												case 1:
													break;
												case 2:
													this.fileStore.pushImgDownLoadList(temFilePath)
													break;
												case 3:
													break;
												case 4:
													// 4.重命名下载文件
													// #ifdef APP-PLUS
													newFileName && this.renameFile(temFilePath, newFileName)
													// #endif
													break;
											}
										})
										dtask && dtask.start()
									}
								}
							)
						}
					)
				}
                // #endif
			}
		}
	}
</script>

<style lang="scss" scoped>
	.card {
		width: calc(25% - 18rpx);
		// width: 164rpx;
		height: 123rpx;
		display: inline-block;
		position: relative;
		border-radius: 5rpx;
		overflow: hidden;
		margin: 9rpx;

		image {
			width: 100%;
			height: 98rpx;
		}

		.textCard {
			text-align: center;
			background: rgba(255, 255, 255, 1);
			position: absolute;
			width: 100%;
			height: 25rpx;
			line-height: 25rpx;
			bottom: 0;
			font-size: 11rpx;
			font-weight: 500;
			color: #0C0C0C;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		.icon {
			background-size: 100% 100%;
			width: 22px;
			height: 27px;
			position: absolute;
			top: -1px;
			left: 17px;
		}

		.icon-card-tip-pdf {
			background-image: url('@/static/sub/icon_card_tip_pdf.png');
		}

		.icon-card-tip-vedio {
			background-image: url('@/static/sub/icon_card_tip_vedio_1.png');
		}

		.icon-card-tip-link {
			background-image: url('@/static/sub/icon_card_tip_link.png');
		}

		.icon-card-tip-toolbox {
			background-image: url('@/static/sub/icon_card_tip_toolbox.png');
		}
	}
</style>