<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  created () {
    console.log('current env:' + process.env.VUE_APP_MODE)
  }
}
</script>

<style lang="less">
</style>
