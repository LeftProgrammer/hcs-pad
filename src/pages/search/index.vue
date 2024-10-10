<template>
	<view class="search-page">
		<BaseNavbar title="搜索"></BaseNavbar>
		<view class="search-bar">
			<uv-input class="search-view-input" placeholder="请输入关键词搜索" prefixIcon="search"
				prefixIconStyle="font-size: 22px;color: #909399" type="text" shape="circle"
				clearable v-model="keyword" confirm-type="search" @confirm="search">
				<template v-slot:suffix>
					<uv-button @tap="search" text="搜 索" type="primary"
						shape="circle"></uv-button>
				</template>
			</uv-input>
		</view>
		<view class="search-results">
			<view v-if="list.length === 0" class="no-results">暂无搜索结果</view>
			<view v-else>
				<view class="search-tips">
					<text class="search-highlight">{{ keyword }}</text>
					共有{{ list.length || 0 }}个内容
				</view>
				<view class="cardList">
					<file-card
						v-for="(item, index) in list" :key="index"
						:card-data="item" @previewFile="previewFile(item)"
					></file-card>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import BaseNavbar from '@/components/baseNavbar/index.vue'
	import FileCard from '@/components/fileCard/index.vue'
	import { previewFile } from '@/utils/utils/index.js'
	export default {
		components: {
			FileCard,
			BaseNavbar
		},
		data() {
			return {
				previewFile,
				keyword: '', // 搜索关键词
				list: [], // 搜索结果
				allFileList: []
			}
		},
		onLoad() {
			this.allFileList = JSON.parse(uni.getStorageSync('allFileList') || '[]');
			console.log('this.allFileList====', this.allFileList);
		},
		methods: {
			getTableData() {
				this.list = this.allFileList.filter(item => {
					return (this.keyword && item['title'].includes(this.keyword))
				})
				console.log('list==========', list)
			},
			search() {
				this.list = []
				this.getTableData()
			}
		}
	}
</script>

<style lang="scss" scoped>
.search-page {
	background-color: #F2F3F5;
	min-height: 100vh;
	.search-bar {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 63rpx 18rpx 18rpx 18rpx;
		position: relative;
		.search-bar-icon {
			background-image: url('@/static/icon-search.png');
			background-size: 100% 100%;
			width: 9rpx;
			height: 9rpx;
			position: absolute;
			left: 10rpx;
			top: 10rpx;
		}
		.search-input {
			font-size: 11rpx;
			flex: 1;
			height: 29rpx;
			padding: 0 28rpx;
			background-color: #fff;
			// border: 1px solid #ccc;
			border-radius: 20rpx;
		}
	  
		.search-btn {
			font-size: 11rpx;
			margin-left: 5rpx;
			line-height: 29px;
			color: #0C0C0C;
			border: none;
			background-color: transparent;
			&::after {
				border: none;
			}
		}
	}	
	.search-results {
		margin-top: 30px;
		padding: 0 9rpx;
		.no-results {
			text-align: center;
			color: #999;
			font-size: 11rpx;
		}
		.search-tips {
			color: #666;
			font-size: 11rpx;
			font-weight: bold;
			margin: 8rpx 9rpx;
			.search-highlight {
				color: #1690FF;
			}
		}
	}
}
</style>