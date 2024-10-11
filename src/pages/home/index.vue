<template>
	<view class="home-page">
	  <!-- Loading Page Component -->
	  <uv-loading-page :loading="pageLoading" loading-text="资源加载中..." font-size="12rpx"></uv-loading-page>
	  
	  <!-- Navigation Bar Component -->
	  <home-navbar ref="homeNavbar" :menuList="menuList" @changeMenu="handleChangeMenu"></home-navbar>
	  <view style="margin-top: 120px; height: 70%;">
		<!-- <iframe src="http://127.0.0.1:8080/runtime/vue3/page/index.html" frameborder="0" width="100%" height="100%"></iframe> -->
		<web-view class="h-full" src="http://127.0.0.1:8080/runtime/vue3/page/index.html"></web-view>
	</view>
	  <!-- <web-view class="h-full" src="http://127.0.0.1:8080/runtime/vue3/page/index.html"></web-view> -->
	  <!-- Dynamic Content Components -->
	  <!-- <home-content v-show="showComponent === 'HomeContent'" :scrollTop="scrollTop" :currentMenuId="currentMenuId"></home-content> -->
	</view>
  </template>
  
  <script>
  import HomeNavbar from "@/components/homeNavbar/index.vue";
  import HomeContent from "@/components/homeContent/index.vue";
  import { handleGetMenuList, getAllFileList, getNetworkStatus } from '@/utils/utils/index';
  
  export default {
	components: {
	  HomeNavbar,
	  HomeContent,
	},
	data() {
	  return {
		pageLoading: false, // 页面加载状态
		menuList: [], // 所有菜单列表
		showComponent: 'HomeContent', // 当前显示的组件
		currentMenuId: '', // 当前选中的菜单ID
		scrollTop: 0 // 页面滚动位置
	  };
	},
	async onLoad() {
		console.error('home-onLoad===>');
		await this.loadData();
	},
	async onShow() {
	  console.error('home-onShow===>');
	//   await this.loadData()
	  this.setCurrentMenuId();
	},
	methods: {
	  // 加载数据的方法
	  async loadData() {
		try {
			const res = await getNetworkStatus();
			console.error('getNetworkStatus===>', res);
			this.pageLoading = true;
			const networkStatus = !['none'].includes(res);
			
			// 获取菜单和所有文件
			await Promise.all([
			handleGetMenuList({ networkStatus }),
			getAllFileList({ networkStatus })
			]);
			this.setCurrentMenuId();
			
			setTimeout(() => {
				this.pageLoading = false;
			}, 300);
		} catch (error) {
			console.error('Error in loadData:', error);
			this.pageLoading = false;
		}
		},
	  // 设置当前菜单ID
	  setCurrentMenuId() {
		this.menuList = JSON.parse(uni.getStorageSync('menuList') || '[]') || [];
		if (!this.currentMenuId && this.menuList.length > 0) {
		  this.currentMenuId = this.menuList[0]['id'];
		}
	  },
	  // 菜单切换处理
	  handleChangeMenu(item) {
		uni.showLoading({
		  title: '加载中'
		});
		this.showComponent = item.name === '首页' ? 'HomeContent' : 'SubContent';
		this.currentMenuId = item.id;
	  }
	},
	onPageScroll(e) {
	  this.scrollTop = e.scrollTop;
	}
  };
  </script>
  
  <style lang="scss" scoped>
  .home-page {
	position: relative;
	height: 100vh;
  }
  </style>
  