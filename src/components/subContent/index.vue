<template>
	<view class="sub-content">
		<sub-navbar :subMenuList="subMenuList" @childClick="handleChildClick" :active="active"></sub-navbar>
		<view class="engineering-content">
			<view class="engineering-scroll">
				<z-paging ref="paging" :fixed="false" v-model="list" @query="queryList" :refresher-enabled="false">
					<file-card v-for="item in list" :key="item.id" :cardData="item" @previewFile="previewFile(item)"></file-card>
				</z-paging>
			</view>
		</view>
	</view>
</template>

<script>
	import SubNavbar from '@/components/subNavbar/index.vue'
    import FileCard from '@/components/fileCard/index.vue'
	import store from '@/store/index.js'
	import { previewFile } from '@/utils//utils/index'
	export default {
        name: 'SubContent',
        components: {
            SubNavbar,
			FileCard
		},
		props: {
            // 当前一级菜单id
            currentMenuId: {
                type: String,
                default: ''
            }
        },
		data() {
			return {
				previewFile,
				active: 0,
				subMenuList: [],
				dataList: [],
				list: [],
				secondNavObj: {}, // 选中二级菜单数据-用于请求页面列表
			}
		},
		computed: {
			fileStore() {
				return store.useFileStore()
			},
			imgDownLoadList() {
				return this.fileStore.imgDownLoadList
			}
		},
        watch: {
            currentMenuId(newVal) {
				// uni.showLoading({
				// 	title: '加载中'
				// });
				this.active = 0
				this.getSubPageData(newVal)
				this.getData()
				this.$refs.paging.reload()
				
				setTimeout(() => {
					uni.hideLoading()
				}, 300)
			}
        },
        created() {},
		methods: {
			// 获取页面内容
			getSubPageData(currentMenuId) {
				const menuList = JSON.parse(uni.getStorageSync('menuList') || '[]') || []
				if (menuList.length > 0) {
					const records = (menuList.find(v => v['id'] === currentMenuId) || {})['children']
					console.error('records===>', records)
					records.sort((a, b) =>{ 
						return a.code - b.code
					})
					this.subMenuList = [{
							name: '全部',
							pid: currentMenuId,
							id: '',
						},
						...records
					]
					this.secondNavObj = this.subMenuList[0]
				}
			},
			// 本地分页
			queryList(pageNo,pageSize) {
				pageSize += 6 // 处理首页加载数据不够的问题
				let list = []
				list = this.dataList.slice((pageNo - 1) * pageSize, pageNo * pageSize)
				this.$refs.paging.complete(list);
            },
			// 获取列表数据
			getData() {
				// const keyName = `${this.secondNavObj.pid}_${this.secondNavObj.id || 0}`
				// TODO 缓存数据
				let allFileList = JSON.parse(uni.getStorageSync('allFileList') || '[]') || []
				if (allFileList.length > 0) {
					this.dataList = allFileList.filter(v => v['memuId'] === this.secondNavObj['pid'] && (this.secondNavObj['id'] ? v['directoryId'] === this.secondNavObj['id'] : true))
				} else {
					this.dataList = []
				}
			},
			// 点选二级菜单
			handleChildClick(index) {
				uni.showLoading({
					title: '加载中'
				});

				this.active = index
				this.dataList = []
				this.secondNavObj = this.subMenuList[index]
				this.getData()
				this.$refs.paging.reload();

				setTimeout(() => {
					uni.hideLoading()
				}, 300)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.sub-content {
		padding-top: 69rpx;
	}
	.engineering-content {
		background-color: #F2F3F5;
		padding: 10rpx 8rpx;
		height: calc(100vh - 69rpx);
		overflow: auto;

		.engineering-scroll {
			height: 100%;
		}
		::v-deep .zp-l-text-rpx {
			font-size: 12rpx;
		}
		::v-deep .zp-main-title-rpx {
			font-size: 12rpx;
		}
		::v-deep .zp-l-container-rpx {
			height: 20rpx;
		}
	}
</style>