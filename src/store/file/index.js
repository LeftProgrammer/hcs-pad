/*
 * @Author: pengchun pengchun@example.com
 * @Date: 2024-01-26 15:38:20
 * @LastEditors: pengchun pengchun@example.com
 * @LastEditTime: 2024-02-05 16:30:56
 * @FilePath: \jmc-pad-vue3\src\store\file\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineStore } from 'pinia'

export const useFileStore = defineStore({
  id: 'app-file',
  state() {
    return {
	  engineeringData: {},
	  imgDownLoadList: [], // 缩略图下载分类队列
      downList: [], // 待下载队列
      toDownloadNum: 0, // 未下载数
      nowDownloadIndex: 0 // 当前进行的下载数
    }
  },
  getters: {
	getEngineeringData: state => state.getEngineeringData,
	getImgDownLoadList: state => state.imgDownLoadList,
    getToDownloadNum: state => state.toDownloadNum,
    getDownList: state => state.downList || [],
    getNowDownloadIndex: state => state.nowDownloadIndex
  },
  actions: {
		setEngineeringData(data) {
			this.engineeringData[data.key] = data.value
		},

		setImgDownLoadList(data) {
			this.imgDownLoadList = data
		},
		pushImgDownLoadList(data) {
			this.imgDownLoadList.push(data)
		},
		delImgDownLoadList(index) {
			this.imgDownLoadList.splice(index, 1)
		},

    	setAllDownList(data) {
			this.downList = data
		},
		setDownList({index, key, value}) {
			this.downList[index][key] = value
		},
		pushDownList(data) {
			this.downList.push(data)
		},
		delDownList(index) {
			this.downList.splice(index, 1)
		},

		
		setNowDownloadIndex(value) {
			this.nowDownloadIndex = value
		},
		addNowDownloadIndex(value) {
			this.nowDownloadIndex += value
		},
		subNowDownloadIndex(value) {
			this.nowDownloadIndex -= value
		},

		subToDownloadNum(value) {
			this.toDownloadNum -= value
		},
		setToDownloadNum(value) {
			this.toDownloadNum = value
		},
		addToDownloadNum(value) {
			this.toDownloadNum += value
		}
  },
})
