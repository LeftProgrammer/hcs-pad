<template>
    <div class="container">
      <h1>H5 与 uni-app 通信示例</h1>
  
      <button @click="openSettings">打开 uni-app 设置页面</button>
  
      <p>设置结果：</p>
      <div>{{ settingsResult }}</div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        settingsResult: ''
      };
    },
    methods: {
      // 打开设置页面，向 uni-app 发送消息
      openSettings() {
        console.log('点击按钮跳转到 uni-app 设置页面');
        const message = {
          action: 'openSettings'
        };
  
        // 通过 postMessage 通知 uni-app 跳转到设置页面
        if (window.parent) {
          window.parent.postMessage(message, '*');
        } else if (window.webkit && window.webkit.messageHandlers) {
          window.webkit.messageHandlers.postMessage.postMessage(message); // iOS 上的 WebView 方式
        } else {
          console.log("无法发送消息，WebView 环境未检测到。");
        }
      },
  
      // 接收来自 uni-app 的消息
      handleMessage(event) {
        const message = event.data;
        if (message && message.action === 'updateSettingsResult') {
          this.settingsResult = '设置完成，结果为：' + message.data;
        }
      }
    },
    mounted() {
      // 页面加载完成后，监听 uni-app 发送的消息
      window.addEventListener('message', this.handleMessage);
    },
    beforeDestroy() {
      // 移除消息监听器，防止内存泄漏
      window.removeEventListener('message', this.handleMessage);
    }
  };
  </script>
  
  <style scoped>
  .container {
    padding: 20px;
  }
  button {
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
  }
  button:hover {
    background-color: #0056b3;
  }
  </style>
  