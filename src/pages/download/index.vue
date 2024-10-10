<template>
	<view class="page">
		<!-- <view class="nav-header">
			<view class="nav-header-back" @tap="back"></view>
			<text class="nav-main-title">资源预下载</text>
		</view> -->
		<BaseNavbar title="资源预下载"></BaseNavbar>
		<view class="info-page">
			<view class="page-cont">
				<view class="search">
					<view class="search-view">
						<view class="search-view-left">
							<uv-subsection :list="updateTypeAry" mode="subsection" :current="updateTypeCurrent"
								@change="sectionChange"></uv-subsection>
						</view>
						<view class="search-view-middle"></view>
						<uv-input class="search-view-input" placeholder="请输入文件名" prefixIcon="search"
							prefixIconStyle="font-size: 22px;color: #909399" type="text" size="mini" shape="circle"
							clearable v-model="formData.title" confirm-type="search" @confirm="init" @input="changeTitle">
							<template v-slot:suffix>
								<uv-button @tap="init" text="搜 索" type="primary" size="mini"
									shape="circle"></uv-button>
							</template>
						</uv-input>
					</view>
					<view class="search-view">
						<view class="search-view-btn">
							<uv-button type="primary" class="btn" :plain="true" size="small"
								style="margin-right: 8px;" @click="handleDownload('all')">一键下载</uv-button>
							<uv-button type="primary" class="btn" :plain="true" size="small"
								style="margin-right: 8px;" @click="handleDownload('multiple')">勾选下载</uv-button>
							<uv-button type="primary" class="btn" :plain="true" size="small"
								style="margin-right: 8px;" @click="handlePauseAll">一键暂停</uv-button>
							<uv-button type="primary" class="btn" :plain="true" size="small"
								style="margin-right: 8px;" @click="handleStartAll">一键继续</uv-button>
							<uv-button type="primary" class="btn" :plain="true" size="small"
								style="margin-right: 8px;" @click="handleClearAll">清除任务</uv-button>
							<!-- TODO： 所有任务 -->
							<!-- <uv-button type="primary" class="btn" :plain="true" size="small" style="margin-right: 8px;" @click="handleGetTaskAll">所有任务</uv-button> -->
							<uv-button type="primary" class="btn" :plain="true" size="small"
								style="margin-right: 8px;" @click="handleRefresh">刷 新</uv-button>
							<!-- <uv-button type="primary" class="btn" :plain="true" size="small" style="margin-right: 8px;" @click="handleGetFile()">文件测试按钮</uv-button> -->
						</view>
					</view>
				</view>
				<uni-table ref="table" class="page-table" border stripe type="selection" emptyText="暂无更多数据" @selection-change="selectionChange">
					<uni-tr>
						<uni-th width="100">所属菜单</uni-th>
						<uni-th width="100">所属分类</uni-th>
						<uni-th width="200">标题</uni-th>
						<uni-th width="100">类型</uni-th>
						<uni-th width="100">文件大小</uni-th>
						<uni-th align="center" width="100">下载进度</uni-th>
						<uni-th align="center" width="100">更新状态</uni-th>
						<uni-th width="100">操作</uni-th>
					</uni-tr>
					<uni-tr v-for="(item, index) in tableData" :key="index">
						<uni-td>{{ item.memuName }}</uni-td>
						<uni-td>{{ item.directoryName }}</uni-td>
						<uni-td>{{ item.title }}</uni-td>
						<uni-td>{{ item.dataTypeName }}</uni-td>
						<uni-td>{{ item.fileSizeN }}</uni-td>
						<uni-td align="center">
							<template v-if="item.downloadNum > 0">
								<uv-line-progress ref="progressBar" :percentage="item.downloadNum"
									activeColor="#1690FF" inactiveColor="#ccc">
									<text style="position: absolute;left:3rpx;font-size: 11px;">
										{{item.downloadNum + '%'}}
									</text>
								</uv-line-progress>
							</template>
							<text v-else>{{item.downloadNum + '%'}}</text>
						</uni-td>
						<uni-td align="center" :class="downTypeStyle[item.downType]">{{ item.downType }}</uni-td>
						<uni-td>
							<view class="uni-group">
								<uv-button type="warning" :plain="true" size="mini" @click="handlePause(item)" v-show="['下载中'].includes(item.downType)">暂停</uv-button>
								<uv-button type="success" :plain="true" size="mini" @click="handleResume(item)" v-show="['已暂停'].includes(item.downType)">继续</uv-button>
								<!-- <uv-button type="primary" :plain="true" size="mini" @click="handleAbort(value.rowData)" v-show="['队列中', '已暂停'].includes(value.rowData.downType)">取消下载</uv-button> -->
								<uv-button type="warning" :plain="true" size="mini" @click="handleAbort(item)" v-show="['队列中'].includes(item.downType)">取消下载</uv-button>
								<uv-button type="primary" :plain="true" size="mini" @click="handleDownloadSingle(item)" v-show="['未下载'].includes(item.downType)">下载</uv-button>
								<uv-button type="error" :plain="true" size="mini" @click="clearFile(item, index)" v-show="['已下载'].includes(item.downType)">清除缓存</uv-button>
							</view>
						</uni-td>
					</uni-tr>
				</uni-table>
			</view>
		</view>
	</view>
</template>

<script>
	import BaseNavbar from '@/components/baseNavbar/index.vue'
	import { downloadPath, getSavedFile, getAllFileList } from '@/utils/utils/index.js'
	import { useToast } from '@/utils/modals'
	
	export default {
		components: {
			BaseNavbar
		},
		data() {
			return {
				formData: {
					// memuId: '',
					// directoryId: '',
					// dataType: '',
					updateType: '未下载',
					title: ''
				},
				selectedIndexs: [], // 勾选数据
				updateTypeAry: [
					'未下载',
					'已下载',
					'全部'
				],
				updateTypeCurrent: null,
				maxDownloadIndex: 3, // 下载队列最大同步下载数
				downloadFlag: false, // 是否允许下载，用语暂停任务
				// nowDownloadIndex: 0, // 当前进行的下载数
				progressBarWidth: 0, // 进度条宽度

				updateTypeorder: ['已暂停', '下载中', '队列中', '未下载', '已下载'],
				downTypeStyle: {
					'已暂停': 'warning-color',
					'下载中': 'primary-color',
					'队列中': 'info-color',
					'未下载': 'error-color',
					'已下载': 'success-color'
				},
				column: [{
						text: '所属菜单',
						value: 'memuName',
					},
					{
						text: '所属分类',
						value: 'directoryName',
					},
					{
						text: '标题',
						value: 'title',
					},
					{
						text: '类型',
						value: 'dataTypeName',
					},
					{
						text: '文件大小',
						value: 'fileSizeN',
					},
					{
						text: '下载进度',
						value: 'downloadNum',
					},
					{
						text: '更新状态',
						value: 'downType',
					},
					{
						text: "操作",
						value: 'operate',
						width: 300
					}
				],
				tableData: [],
				allFileList: [], // 所有文件数据
				downloadList: [], // 所有下载任务
			}
		},
		computed: {
			networkStatus() {
                return this.$store.app?.getNetworkStatus
            },
			fileStore() {
				return this.$store.file || {}
			},
			downList() {
				return this.fileStore.downList
			},
			nowDownloadIndex() {
				return this.fileStore.nowDownloadIndex
			}
		},
		watch: {
			downList: {
				handler: function() {
					if (this.downList.length === 0) {
						// this.init()
					}
				},
				deep: true
			},
			nowDownloadIndex(newVal, oldVal) {
				// TODO: maxDownloadIndex值设置问题
				this.updateDownloadQueue(this.maxDownloadIndex)
				if (newVal === 0 && this.downList.length === 0) {
					this.init()
				}
			}
		},
		onLoad() {
			// #ifdef APP-PLUS
			this.getNonImageDownloadCount()
			// #endif
			uni.getStorage({
				key: 'allFileList',
				success: (res) => {
					this.allFileList = JSON.parse(res.data || '[]')
					this.init()
				},
				fail: (err) => {
					this.allFileList = []
					uni.setStorageSync('allFileList', '[]')
					console.log("uni.getStorage-allFileList-数据获取失败：" + err)
				}
			})
		},
		onShow() {
			console.log('onShow===========')
		},
		onReady() {
			console.log('onReady===========')
		},
		methods: {
			// 获取正在下载的任务数量(非图片文件)
			getNonImageDownloadCount() {
				return new Promise((resolve, reject) => {
					plus.downloader.enumerate((tasks) => {
						try {
							this.fileStore?.setNowDownloadIndex(0)
							const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.webp'];
							tasks.forEach(task => {
								const url = task.url;
								const extension = url.substring(url.lastIndexOf('.')).toLowerCase();
								if (!imageExtensions.includes(extension)) {
									this.fileStore?.addNowDownloadIndex(1)
								}
							});
							console.error('this.fileStore?.nowDownloadIndex', this.nowDownloadIndex)
							resolve(tasks);
						} catch (error) {
							reject(error);
						}
					}, (error) => {
						reject(error);
					});
				})
			},
			// 输入框清空时查询
			changeTitle(val) {
				if (!val) {
					this.formData.title = val
					this.init()
				}
			},
			selectionChange(e) {
				this.selectedIndexs = e.detail.index
			},
			// 切换更新状态
			sectionChange(index) {
				// #ifdef APP-PLUS
				this.getNonImageDownloadCount().then(() => {
					if (this.nowDownloadIndex > 0 || this.downList.length > 0) {
						this.$toast("当前有下载任务，请稍后再试或清除任务后再试")
						return
					}
					this.updateTypeCurrent = index
					this.formData.updateType = this.updateTypeAry[index]
					this.init()
				})
				// #endif
			},
			// 文件测试按钮
			handleGetFile() {
				if (!this.networkStatus) {
                    useToast('当前无网络连接，请在有网状态下操作')
                    return
                }
				getSavedFile().then(savedFile => {
					const entryItem = savedFile.find(item => item.name ===
						'YFG水电站工程宣传片_10e1c5f0eaf9e1472ad278976a28eef5.mp4.downloading')
					if (entryItem) {
						entryItem.remove(() => {
							console.log("清除成功")
						}, (e) => {
							console.log(e.message)
						})
					}
				})
			},
			// 获取所有任务 
			handleGetTaskAll() {
				if (!this.networkStatus) {
                    useToast('当前无网络连接，请在有网状态下操作')
                    return
                }
				// #ifdef APP-PLUS
				plus.downloader.enumerate((tasks) => {
					console.log("handleGetTaskAll 枚举下载任务", tasks.length, tasks);
				});
				// #endif
			},
			// 一键暂停
			handlePauseAll() {
				if (!this.networkStatus) {
                    useToast('当前无网络连接，请在有网状态下操作')
                    return
                }
				this.downloadFlag = false
				// #ifdef APP-PLUS
				plus.downloader.enumerate((tasks) => {
					if (tasks.length > 0) {
						tasks.forEach(item => {
							item.pause()
							setTimeout(() => {
								this.updateData(item.options['id'], null, '已暂停')
							}, 50)
						})
						this.$toast("已暂停")
					} else if (this.downList.length > 0) {
						this.$toast("已暂停")
					} else {
						this.$toast("当前无下载任务")
					}
				})
				// #endif
			},
			// 一键继续
			handleStartAll() {
				if (!this.networkStatus) {
                    useToast('当前无网络连接，请在有网状态下操作')
                    return
                }
				this.downloadFlag = true
				// #ifdef APP-PLUS
				this.getNonImageDownloadCount().then(tasks => {
					if (tasks.length > 0) {
						this.$toast("开始下载")
						tasks.forEach(item => {
							if (item.downloadedSize > item.totalSize) {
								item.abort()
								this.fileStore?.subNowDownloadIndex(1)
							} else {
								// item.removeEventListener("statechanged", this.downloadStateChangedCB)
								item.addEventListener("statechanged", this.downloadStateChangedCB)
								item.start()
							}
						})
					} else if (this.downList.length > 0) {
						this.$toast("开始下载")
						this.updateDownloadQueue(this.maxDownloadIndex)
					} else {
						this.$toast("当前无下载任务")
					}
				})
				// #endif
			},
			// 清除任务
			handleClearAll() {
				if (!this.networkStatus) {
                    useToast('当前无网络连接，请在有网状态下操作')
                    return
                }
				this.downloadFlag = false
				// #ifdef APP-PLUS
				plus.downloader.enumerate((tasks) => {
					if (tasks.length > 0 || this.downList.length > 0) {
						if (tasks.length > 0) {
							plus.downloader.clear()
							this.fileStore?.setNowDownloadIndex(0)
							tasks.forEach(item => {
								// setTimeout等待监听执行完毕
								setTimeout(() => {
									this.updateData(item.options['id'], 0, '未下载')
								}, 50)
							})
						} else {
							this.tableData.forEach(i => {
								if (['下载中', '已暂停'].includes(i.downType)) {
									this.updateData(i['id'], 0, '未下载')
								}
							})
						}
						if (this.downList.length > 0) {
							this.downList.forEach(i => {
								this.updateData(i['id'], 0, '未下载')
							})
							this.fileStore?.setAllDownList([])
						} else {
							this.tableData.forEach(i => {
								if (i.downType === '队列中') {
									this.updateData(i['id'], 0, '未下载')
								}
							})
						}
						plus.nativeUI.toast("已清除")
					} else {
						this.tableData.forEach(i => {
							if (i.downType !== '已下载') {
								this.updateData(i['id'], 0, '未下载')
							}
						})
						plus.nativeUI.toast("当前无下载任务")
					}
					this.$refs?.table?.clearSelection()
					// this.$refs?.tableComponentRef?.tableSelectionAllClear()
				})
				// #endif
			},
			// 暂停下载
			handlePause(row) {
				if (!this.networkStatus) {
                    useToast('当前无网络连接，请在有网状态下操作')
                    return
                }
				this.downloadFlag = false
				// #ifdef APP-PLUS
				plus.downloader.enumerate((tasks) => {
					if (tasks.length > 0) {
						const taskIndex = tasks.findIndex(item => item.options['id'] === row['id'])
						if (taskIndex > -1) {
							tasks[taskIndex].pause()
							this.updateData(row['id'], null, '已暂停')
							return
						}
					}
					if (this.downList.length > 0) {
						const downIndex = this.downList.findIndex(item => item['id'] === row['id'])
						if (downIndex > -1) {
							plus.nativeUI.toast("当前任务已在队列中")
							return
						}
					}
					plus.nativeUI.toast("当前无下载任务")
				})
				// #endif
			},
			// 继续下载
			handleResume(row) {
				if (!this.networkStatus) {
                    useToast('当前无网络连接，请在有网状态下操作')
                    return
                }
				// #ifdef APP-PLUS
				plus.downloader.enumerate((tasks) => {
					if (tasks.length > 0) {
						const taskIndex = tasks.findIndex(item => item.options['id'] === row['id'])
						if (taskIndex > -1) {
							// tasks[taskIndex].removeEventListener("statechanged", this.downloadStateChangedCB);
							tasks[taskIndex].addEventListener("statechanged", this.downloadStateChangedCB)
							tasks[taskIndex].resume()
							this.updateData(row['id'], null, '下载中')
							return
						}
					}
					if (this.downList.length > 0) {
						const downIndex = this.downList.findIndex(item => item['id'] === row['id'])
						if (downIndex > -1) {
							this.updateDownloadQueue(this.maxDownloadIndex)
							return
						}
					}
					plus.nativeUI.toast("当前无下载任务")
					this.updateData(row['id'], 0, '未下载')
				})
				// #endif
			},
			// 取消下载
			handleAbort(row) {
				if (!this.networkStatus) {
                    useToast('当前无网络连接，请在有网状态下操作')
                    return
                }
				// #ifdef APP-PLUS
				plus.downloader.enumerate((tasks) => {
					if (tasks.length > 0) {
						const taskIndex = tasks.findIndex(item => item.options['id'] === row['id'])
						if (taskIndex > -1) {
							tasks[taskIndex].abort()
							this.fileStore?.subNowDownloadIndex(1)
						}
						plus.nativeUI.toast("已取消")
					} else if (this.downList.length > 0) {
						const downIndex = this.downList.findIndex(item => item['id'] === row['id'])
						if (downIndex > -1) {
							this.fileStore?.delDownList(downIndex)
						}
						plus.nativeUI.toast("已取消")
					} else {
						plus.nativeUI.toast("当前无下载任务")
					}
					// setTimeout等待监听执行完毕
					setTimeout(() => {
						this.updateData(row['id'], 0, '未下载')
					}, 0)
				})
				// #endif
			},
			// 刷新数据-获取所有
			handleRefresh() {
				if (!this.networkStatus) {
                    useToast('当前无网络连接，请在有网状态下操作')
                    return
                }
				// #ifdef APP-PLUS
				this.getNonImageDownloadCount().then((tasks) => {
					if (this.nowDownloadIndex > 0 || this.downList.length > 0) {
						plus.nativeUI.toast("当前有下载任务，请稍后再试或清除任务后再试")
						return
					}
					getAllFileList({networkStatus: this.networkStatus}).then((resourceData) => {
						this.allFileList = JSON.parse(uni.getStorageSync('allFileList') || '[]') || []
						this.getTableData()
						// this.sortTableList(resourceData)
					})
				})
				// #endif

				// #ifdef H5
				getAllFileList({networkStatus: this.networkStatus}).then((resourceData) => {
					this.allFileList = JSON.parse(uni.getStorageSync('allFileList') || '[]') || []
					this.getTableData()
					// this.sortTableList(resourceData)
				})
				// #endif
			},
			// 获取展示列表
			getTableData() {
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				// 筛选条件 + 0视频,7pdf文件数据
				let list = this.allFileList.filter(item => {
					return ((this.formData['updateType'] && this.formData['updateType'] !== '全部') ? ((this
								.formData['updateType'] === '未下载' && ['队列中', '已暂停', '下载中', '未下载'].includes(
									item['downType'])) || (item['downType'] === this.formData['updateType'])) :
							true) &&
						(item['title'].includes(this.formData['title'])) && [0, 7].includes(+item.dataType)
				})
				// this.sortTableList(list)
				// TODO: 减少数据渲染临时方案
				if (this.formData['updateType'] === '未下载') {
					this.tableData = list.slice(0, 30)
				} else {
					this.tableData = list
				}
				// 页面数据请求之后再赋值，适配选中背景色渲染慢问题
				this.updateTypeCurrent === null && (this.updateTypeCurrent = 0)
				this.$refs?.table?.clearSelection()
				// this.$refs?.tableComponentRef?.tableSelectionAllClear()
				setTimeout(() => {
					uni.hideLoading();
				}, 12 * this.tableData.length)

			},
			// 列表数据排序
			sortTableList(resourceData = []) {
				this.tableData = resourceData.sort((a, b) => {
					return this.updateTypeorder.indexOf(a.downType) - this.updateTypeorder.indexOf(b.downType)
				})
			},
			// 单条下载
			handleDownloadSingle(row) {
				if (!this.networkStatus) {
                    useToast('当前无网络连接，请在有网状态下操作')
                    return
                }
				this.downloadFlag = true
				plus.downloader.enumerate((tasks) => {
					if (tasks.length > 0) {
						const taskIndex = tasks.findIndex(item => item.options['id'] === row['id'])
						if (taskIndex > -1) {
							plus.nativeUI.toast("该文件已在下载队列中")
							return
						}
					}
					if (this.downList.length > 0) {
						const downIndex = this.downList.findIndex(item => item['id'] === row['id'])
						if (downIndex > -1) {
							this.updateData(row.id, 0, '队列中')
							plus.nativeUI.toast("该文件已在下载队列中")
							return
						}
					}
					this.fileStore?.pushDownList(row)
					this.updateData(row.id, 0, '队列中')
					plus.nativeUI.toast("开始下载")
					this.updateDownloadQueue(this.maxDownloadIndex)
				})
			},
			// 一键/勾选下载
			handleDownload(type) {
				if (!this.networkStatus) {
                    useToast('当前无网络连接，请在有网状态下操作')
                    return
                }
				this.downloadFlag = true
				this.getNonImageDownloadCount().then(() => {
					if (this.nowDownloadIndex > 0 || this.downList.length > 0) {
						plus.nativeUI.toast("当前有未完成下载任务，请稍后再试")
						return
					}
					let list = []
					if (type === 'all') {
						list = this.tableData
					} else if (type === 'multiple') {
						this.selectedIndexs.map(i => {
							list.push(this.tableData[i])
						})
						// list = this.$refs?.tableComponentRef.selectPageData['1'] || []
						if (list.length === 0) {
							plus.nativeUI.toast("请选择要下载的文件")
							return
						}
					}
					let arr = list.filter(v => (['队列中', '未下载'].includes(v.downType)))
					if (arr.length === 0) {
						plus.nativeUI.toast("没有符合下载要求的数据")
						return
					}
					arr.forEach(i => {
						this.fileStore?.pushDownList(i)
						this.updateData(i.id, 0, '队列中')
					})
					plus.nativeUI.toast("开始下载")
					this.updateDownloadQueue(this.maxDownloadIndex)
				})
			},
			// 重写文件名
			renameFile(oldFilePath, newFileName, id) {
				let that = this
				plus.io.resolveLocalFileSystemURL(
					oldFilePath,
					(entry) => { // 获取文件对象  
						entry.getParent( // 获取目录  
							(folder) => {
								entry.moveTo(
									folder,
									`/${newFileName}`,
									(newFile) => {
										that.updateData(id, 100, '已下载')
										this.fileStore?.subNowDownloadIndex(1)
										this.fileStore?.subToDownloadNum(1)
									},
									(err) => {
										console.log("renameFile---失败=====", err)
										//下载失败
										// plus.nativeUI.toast("重命名失败");
										// that.updateData(id, 0, '未下载')
										this.fileStore?.subNowDownloadIndex(1)
										// TODO: 暂停继续会重复监听，导致nowDownloadIndex值异常
										// plus.downloader.enumerate((tasks) => {
										// 	this.fileStore?.subNowDownloadIndex(tasks.length)
										// })
									}
								)
							}
						)
					}
				)
			},
			// 更新下载队列
			updateDownloadQueue(maxDownloadIndex = 1) {
				if (this.downList.length > 0 && this.nowDownloadIndex <= maxDownloadIndex - 1 && this.downloadFlag) {
					this.fileStore?.addNowDownloadIndex(1)
					// TODO: 执行任务存在问题
					this.downloadPromise(this.downList[0])
					this.fileStore?.delDownList(0)
				}
			},
			// 更新列表及缓存数据
			updateData(id, downloadNum, downType) {
				const index = this.tableData.findIndex(i => i['id'] === id)
				if (downloadNum !== null) {
					this.tableData[index].downloadNum = downloadNum
				}
				if (downType !== null) {
					this.tableData[index].downType = downType
				}
				this.allFileList.some(item => {
					if (item['id'] === id) {
						item.downloadNum = this.tableData[index].downloadNum
						item.downType = this.tableData[index].downType
						return true
					}
				})
				uni.setStorageSync('allFileList', JSON.stringify(this.allFileList))
			},
			// 单个文件下载
			async downloadPromise(obj) {
				const newFileName = obj.newFileName
				const filename = `${downloadPath}${newFileName}.downloading`

				getSavedFile().then(savedFile => {
					const downloadingItem = savedFile.find(item => item.name === `${newFileName}.downloading`)
					if (downloadingItem) {
						downloadingItem.remove(() => {
							console.log('移除重复临时文件成功')
						}, (e) => {
							console.log('移除重复临时文件失败：' + e.message)
						})
					}
					const newFileItem = savedFile.find(item => item.name === newFileName)
					if (newFileItem) {
						console.log('文件已存在')
						this.updateData(obj.id, 100, '已下载')
					} else {
						let dtask = plus.downloader.createDownload(
							obj.url, {
								id: obj.id,
								newFileName,
								filename,
							},
							this.downloadCompletedCB // 任务完成回调
						)
						// 监听下载状态
						dtask && dtask.addEventListener('statechanged', this.downloadStateChangedCB)
						dtask && dtask.start()
					}
				})
			},
			// 下载任务完成时的回调
			downloadCompletedCB(task, status) {
				const {
					id
				} = task.options || {}
				if (status === 200) {

				} else {
					//下载失败
					plus.nativeUI.toast("下载失败");
					this.updateData(id, 0, '未下载')
				}
			},
			// 下载任务状态变化回调
			downloadStateChangedCB(task) {
				const {
					id,
					filename,
					newFileName
				} = task.options || {}
				const index = this.tableData.findIndex(i => i['id'] === id)
				switch (task.state) {
					case 1: // 开始
						break;
					case 2: // 已连接到服务器  
						console.log('task---2', task)
						this.updateData(id, 0, '下载中')
						break;
					case 3: // 已接收到数据
						let num = Math.round((task.downloadedSize / task.totalSize) * 100)
						const per = (num > 99) ? 99 : num
						this.tableData[index].downloadNum = per
						// console.log('per', per)
						break;
					case 4: // 任务完成（成功或失败）
						console.log('task---4', task)
						// 下载完成改写可用文件名
						this.renameFile(filename, newFileName, id)
						break;
					case 5: // 任务暂停
						console.log('task---5', task)
						break;
				}
			},
			// 清除缓存-清除单个指定本地已下载文件
			clearFile(row) {
				let downloadIndex = this.downList.findIndex(item => {
					item.id === row.id
				});
				if (downloadIndex > -1) {
					plus.nativeUI.toast("下载中，请稍后再操作")
					return
				}
				const filename = `${downloadPath}${row.newFileName}`
				plus.io.resolveLocalFileSystemURL(
					filename,
					(entry) => {
						entry.remove(() => {
							this.updateData(row.id, 0, '未下载')
							plus.nativeUI.toast("清除成功")
						}, (e) => {
							plus.nativeUI.toast(e.message)
						})
					},
					(error) => {
						this.updateData(row.id, 0, '未下载')
						plus.nativeUI.toast("资源无缓存")
					}
				)
			},

			getProgressBarWidth() {
				return new Promise(resolve => {
					this.$refs.progressBar.getProgressWidth().then(res => {
						this.progressBarWidth = res.width
						resolve()
					})
				})
			},
			// 页面初始化
			init() {
				this.getTableData()
			}
		},
		
	}
</script>

<style lang="scss" scoped>
	.page {
		height: 100%;
		display: flex;
		flex-direction: column;
		.uni-group {
			display: flex;
			align-items: center;
		}
	}

	.info-page {
		padding: 65rpx 18rpx 18rpx 18rpx;
		// flex: 1;
		overflow: hidden;
		height: 100vh;

		.page-cont {
			width: 100%;
			height: 100%;
			padding: 12rpx;
			background: #fff;
			box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
			border-radius: 2px;
			display: flex;
			flex-direction: column;
			.search {
				.search-view {
					display: flex;
					align-items: center;
					margin-bottom: 8rpx;

					.search-view-left {
						flex-grow: 1;
						display: flex;
					}

					.search-view-middle {
						flex-grow: 1;
					}

					.search-view-input {
						flex-shrink: 0;
						padding: 2rpx 3rpx !important;
					}
					.search-view-btn {
						display: flex;

						.btn {
							width: 55rpx;
						}
					}
				}
			}

			.page-table {	
				width: 100%;
			} 
		}
	}
</style>