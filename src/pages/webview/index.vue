<template>
  <web-view class="h-full" :src="viewProps.src"></web-view>
</template>

<script>
export default {
  data() {
    return {
      viewProps: {
        src: 'http://127.0.0.1:8080/runtime/vue3/page/index.html',
      },
    }
  },
  onLoad(params) {
    if (params.title) {
      uni.setNavigationBarTitle({
        title: params.title,
      })
    }
    // this.viewProps = params
  },
}
</script>

<style></style>
