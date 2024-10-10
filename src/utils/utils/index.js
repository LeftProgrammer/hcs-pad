/*
 * @Author: pengchun pengchun@example.com
 * @Date: 2023-12-05 15:21:50
 * @LastEditors: pengchun pengchun@example.com
 * @LastEditTime: 2024-02-27 10:12:01
 * @FilePath: \jmc_pad\lib\util.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import store from '@/store/index.js'
import { useToast } from '@/utils/modals'
import { baseURL } from '@/configs/request.js'
import { getMenus, downLoadListAll } from '@/api/common/index.js'
import { arrayToTree } from "@/utils/tree.js"

export const fileBaseSrc = `${baseURL}/sys/common/static/`
export const downloadPath = '_doc/jmcFiles/' // _doc在ios平台下下载到Documents沙盒目录下,此目录文件可正常访问,其他目录可能有权限限制

// 获取网络状态
export const networkStatus = () => {
	return store.useAppStore().getNetworkStatus || null
}

/**
 * @desc 获取网络状态
 * @returns {string} 网络类型
 */
export const getNetworkStatus = () => {
	return new Promise((resolve) => {
	  // 调用uni.getNetworkType()方法获取网络类型
	  uni.getNetworkType({
			success (res) {
				if (res.networkType === 'none') {
					console.log('当前无网络')
				} else {
					console.log('有网')
				}
				resolve(res.networkType)
			},
			fail (err) {
				console.error('获取网络状态失败', err)
				resolve('unknown')
			}
	  	})
	})
}

/**
 * @desc 判断平台
 * @returns {string} 当前所在平台
 */
export const getSystemInfoSync = () => {
	return uni.getSystemInfoSync().platform
}

/**
 * @desc 格式化文件大小
 * @param {number} size 文件大小
 * @returns {string} 文件大小（带单位）
 */
export const calculateFileSize = (size) => {
	const B = 1024
	const KB = Math.pow(1024, 2)
	const MB = Math.pow(1024, 3)
	const GB = Math.pow(1024, 4)
	if (!size) {
		return '_'
	} else if (size < KB) {
		return (size / B).toFixed(0) + 'KB'
	} else if (size < MB) {
		return (size / KB).toFixed(1) + 'MB'
	} else if (size < GB) {
		return (size / MB).toFixed(2) + 'GB'
	} else {
		return (size / GB).toFixed(3) + 'TB'
	}
}

/**
 * @desc 判断是否是网络链接
 * @returns {string} 网络链接
 */
export const isUrl = (url) => {
	return url.toLocaleLowerCase().startsWith("http://") || url.toLocaleLowerCase().startsWith("https://");
}

export const Message = {
	toast: (msg) => {
		// #ifdef APP-PLUS
		plus.nativeUI.toast(msg)
		// #endif
		// #ifndef APP-PLUS
		uni.showToast({
			title: msg,
			icon: "success",
			mask: true,
			duration: 1500
		});
		// #endif		
	}
}

// 获取所有菜单
export const handleGetMenuList = ({networkStatus = true, params = {}} = {}) => {
	return new Promise((resolve, reject) => {
		let menuList = JSON.parse(uni.getStorageSync('menuList') || '[]')
		if (networkStatus) {
			getMenus(params).then((res) => {
				const { code, result } = res
				const list = result?.records || []
				if (code === 200 && list.length > 0) {
					menuList = arrayToTree(list, [], 'id', 'pid')
					uni.setStorageSync('menuList', JSON.stringify(menuList))
					resolve(menuList)
				} else {
					resolve([])
				}
			}).catch(() => {
				reject([])
			})
		} else {
			resolve(menuList)
		}
	})
}

export const dataTypeOption = [{
		value: '0,3,7',
		text: '全部'
	},
	{
		value: '0',
		text: '视频'
	},
	{
		value: '3',
		text: '图片'
	},
	{
		value: '6',
		text: '网页链接'
	},
	{
		value: '7',
		text: '文档'
	}
]

// 文件类型
export const filterDataType = (val) =>{
	return dataTypeOption.find(v => v.value === val)?.text || ''
}
// 转化文件大小
export const filterSize = (size) => {
	// 求次幂
	function pow1024(num) {
		return Math.pow(1024, num)
	}
	if (!size) return '';
	if (size < pow1024(1)) return size + ' B';
	if (size < pow1024(2)) return (size / pow1024(1)).toFixed(2) + ' KB';
	if (size < pow1024(3)) return (size / pow1024(2)).toFixed(2) + ' MB';
	if (size < pow1024(4)) return (size / pow1024(3)).toFixed(2) + ' GB';
	return (size / pow1024(4)).toFixed(2) + ' TB'
}

// 获取文件后缀
export const getSuffix = (url) => {
	const fileSrcArr = url.split('/')
	const fileSrc = fileSrcArr[fileSrcArr.length - 1]
	const suffix = fileSrc.split('.')[1]
	return suffix
}

// 检查需要下载的PDF本地是否已存在
export const checkFileIsExit = (url) => {
	return new Promise((resolve, reject) => {
		// #ifdef APP-PLUS
		plus.io.resolveLocalFileSystemURL(
			url,
			(entry) => {
				resolve(entry.fullPath)
			},
			(error) => {
				reject(error)
			}
		);
		// #endif

		// #ifdef H5
		useToast('请在App上操作')
		reject()
		// #endif
	})
}

// 文件预览跳转
export const previewFile = (data) => {
	if (data.dataTypeName === '文档') {
		const pdfSrc = data.uploadFile.split('|')[0]
		const suffix = pdfSrc.split('.')[1] || 'pdf'
		const url = `${data.title}_${data.uploadFile.split('|')[2]}.${suffix}`
		const filePath = `${downloadPath}${url}`
		checkFileIsExit(filePath).then(res => {
			setTimeout(() => {
				uni.openDocument({
					filePath: res,
					showMenu: false,
					success: function () {
						console.log("打开文档成功");
					},
					fail: function () {
						uni.showToast({
							title: '暂不支持此类型',
							duration: 2000,
							icon: "none",
						});
					}
				})
			}, 500)
		}).catch(() => {
			useToast('资源未下载, 请到资料预下载中下载')
		})
	} else if (data.dataTypeName === '视频') {
		const pdfSrc = data.uploadFile.split('|')[0]
		const suffix = pdfSrc.split('.')[1] || 'pdf'
		const url = `${data.title}_${data.uploadFile.split('|')[2]}.${suffix}`
		const filePath = `${downloadPath}${url}`
		checkFileIsExit(filePath).then(res => {
			const fileParams = {
				type: 2,
				item: {
					name: data.title,
					src: filePath
				}
			}
			uni.navigateTo({
				url: `/pages/preview/index?fileParams=${encodeURIComponent(JSON.stringify(fileParams))}&t=${new Date().getTime()}`
			})
		}).catch(() => {
			useToast('资源未下载, 请到资料预下载中下载')
		})
	} else if (data.dataTypeName === '网页链接') {
		if (!networkStatus()) {
			useToast('当前无网络连接，请在有网状态下操作')
			return
		}
		const fileParams = {
			type: 4,
			item: {
				username: data?.username,
				password: data?.password,
				src: data?.dataUrlId
			}
		}
		uni.navigateTo({
			url: `/pages/preview/index?fileParams=${encodeURIComponent(JSON.stringify(fileParams))}&t=${new Date().getTime()}`
		})
	}
}

// 根据文件地址查找文件
export const searchFile = (name) => {
	return new Promise((resolve, reject) => {
		// #ifdef APP-PLUS
		plus.io.resolveLocalFileSystemURL(
			downloadPath + name,
			(entry) => {
				plus.io.getFileInfo({
					filePath: entry.fullPath, // '/storage/emulated/0/Android/data/io.dcloud.HBuilder/downloads/jmcFile/XX.mp4'
					success: (fileInfo) => {
						resolve({entry, fileSize: fileInfo.size})
					},
					fail: (e) => {
						reject()
					}
				})
			},
			function (e) {
				reject()
			}
		);
		// #endif

		// #ifdef H5
		useToast('请在App上操作')
		reject()
		// #endif
	})
}
// 获取本地已下载目录
export const getSavedFile = (filePath = downloadPath) => {
	return new Promise((resolve, reject) => {
		// #ifdef APP-PLUS
		plus.io.resolveLocalFileSystemURL(
			filePath, //指定的目录
			(entry) => {
				let directoryReader = entry.createReader(); //获取读取目录对象
				directoryReader.readEntries(
					(entries) => { //返回的是指定文件夹下的文件列表和uni.getSavedFileList(OBJECT)效果一样
						resolve(entries)
					},
					(err) => {
						console.log("获取文件失败:" + err)
						resolve([])
					});
			},
			(err) => {
				console.log("访问指定目录失败:" + err)
				resolve([])
			}
		);
		// #endif

		// #ifdef H5
		useToast('请在App上操作')
		reject()
		// #endif
	})
}

// 获取所有预下载数据
export const getAllFileList = ({networkStatus = true, params = { dataTypes: '0,6,7' }} = {}) => {
	return new Promise(async(resolve, reject) => {
		const fileStore = store.useFileStore()
		let allFileList = JSON.parse(uni.getStorageSync('allFileList') || '[]') || []
		console.log('getAllFileList-allFileList===>', allFileList.length, allFileList)
		if (networkStatus) {
			// #ifdef APP-PLUS
			getSavedFile().then((savedFile) => {
				console.log('getAllFileList-savedFile=============', savedFile.length, savedFile)
				console.log('getAllFileList-savedFile===>', savedFile.length, savedFile)
				downLoadListAll(params).then(res => {
					let toDownloadNum = 0;
					console.log('res.result', res.result.length, res.result)
					let list = res.result || []
					// TODO: 上线时需更改
					// let list = res.result.slice(0, 60) || []
					let resourceData = []
					for(let i = 0; i < list.length; i++) {
						let itemData = list[i]
						if (!!itemData.uploadFile) {
							const uploadFileArr = itemData?.uploadFile?.split('|')
							const url = fileBaseSrc + uploadFileArr[0]
							const suffix = getSuffix(url)
							const newFileName = `${itemData.title}_${uploadFileArr[2]}.${suffix}`
							const downloadingName = `${newFileName}.downloading`
							let newData = {
								...itemData,
								fileSizeN: filterSize(itemData.fileSize),
								dataTypeName: filterDataType(itemData.dataType),
								url,
								newFileName,
								downloadNum: 0,
								downType: '未下载'
							}
							if (savedFile.find(item => item.name.indexOf(newFileName) > -1)) {
								newData.downloadNum = 100
								newData.downType = '已下载'
								resourceData.push(newData)
							}
							//  else if (savedFile.find(item => item.name.indexOf(downloadingName) != -1)) {
							// 	newData.downloadNum = 0
							// 	newData.downType = '已暂停'
							// } 
							else {
								newData.downloadNum = 0
								newData.downType = '未下载'
								resourceData.push(newData)
								toDownloadNum += 1;
							}
						} else {
							itemData.dataTypeName = filterDataType(itemData.dataType)
							resourceData.push(itemData)
						}
					}
					console.log('getAllFileList---toDownloadNum=====', toDownloadNum)

					fileStore.setToDownloadNum(toDownloadNum)
					console.log('getAllFileList---resourceData=======', resourceData.length, resourceData)
					uni.setStorageSync('allFileList', JSON.stringify(resourceData))
					resolve(resourceData)
				}).catch((err) => {
					reject(err)
				})
			})
			// #endif

			// #ifdef H5
			downLoadListAll(params).then(res => {
				let toDownloadNum = 0;
				console.log('res.result', res.result.length, res.result)
				let list = res.result || []
				let resourceData = []
				for(let i = 0; i < list.length; i++) {
					let itemData = list[i]
					if (!!itemData.uploadFile) {
						const uploadFileArr = itemData?.uploadFile?.split('|')
						const url = fileBaseSrc + uploadFileArr[0]
						const suffix = getSuffix(url)
						const newFileName = `${itemData.title}_${uploadFileArr[2]}.${suffix}`
						const downloadingName = `${newFileName}.downloading`
						let newData = {
							...itemData,
							fileSizeN: filterSize(itemData.fileSize),
							dataTypeName: filterDataType(itemData.dataType),
							url,
							newFileName,
							downloadNum: 0,
							downType: '未下载'
						}
						newData.downloadNum = 0
						newData.downType = '未下载'
						resourceData.push(newData)
						toDownloadNum += 1;
					} else {
						itemData.dataTypeName = filterDataType(itemData.dataType)
						resourceData.push(itemData)
					}
				}
				console.log('getAllFileList---toDownloadNum=====', toDownloadNum)

				fileStore.setToDownloadNum(toDownloadNum)
				console.log('getAllFileList---resourceData=======', resourceData.length, resourceData)
				uni.setStorageSync('allFileList', JSON.stringify(resourceData))
				resolve(resourceData)
			}).catch((err) => {
				reject(err)
			})
			// #endif
		} else {
			// #ifdef APP-PLUS
			fileStore.setToDownloadNum(0)
			let downList = fileStore.getDownList
			plus.downloader.enumerate((tasks) => {
				allFileList.forEach(i => {
					if (i.downType !== '已下载') {
						fileStore.addToDownloadNum(1)
					}
					// 异常中断
					if (['下载中'].includes(i.downType)) {
						let task = tasks.find(j => j.options.id === i.id)
						if (task) {
							i.downType = '已暂停'
						} else {
							i.downloadNum = 0
							i.downType = '未下载'
						}
					}
					if (['队列中'].includes(i.downType)) {
						if (!(downList.find(k => k.id === i.id))) {
							i.downloadNum = 0
							i.downType = '未下载'
						}
					}
				})
				uni.setStorageSync('allFileList', JSON.stringify(allFileList))
				resolve(allFileList)
			})
			// #endif

			// #ifdef H5
			resolve(allFileList)
			// #endif
		}
	})
}
