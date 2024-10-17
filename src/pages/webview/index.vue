<template>
  <view class="container">
    <web-view 
      id="webview" 
      :src="viewProps.src"
      @message="onMessageFromH5"
       @onPostMessage="onMessageFromH5"
      >
    </web-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      viewProps: {
        // src: 'http://127.0.0.1:8080/runtime/vue3/page/index.html',
        src: 'http://192.168.70.53:8080/test.html'
        // src: 'http://192.168.70.53:1996/#/pages/test/index'
      },
      childrenPage: null
    }
  },
  onLoad(params) {
    const { flag } = params;
    this.viewProps.src = `http://192.168.70.53:8080/test.html?flag=${flag}`
  },
  
  methods: {
    // 接收来自 H5 的消息
    onMessageFromH5(event) {
      console.log('接收来自 H5 的消息', event);

      const {  
          detail: { data: [{ action, callBackFn }] },  
      } = event; 
      if (action === 'openSettings') {
        const pages = getCurrentPages();   
        console.log('pages ', pages[pages.length - 1].$getAppWebview())
        const childrenPage = pages[pages.length - 1].$getAppWebview().children()[0];  
        childrenPage.evalJS(`${callBackFn}('123123')`)  
        // 跳转到 uni-app 设置页面
        uni.navigateTo({
          url: '/pages/mine/index', // 跳转到设置页面
          success: () => {
            console.log('已跳转到设置页面');
            
          }
        });
      }
    }
  }
}
</script>

<style>
.container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
