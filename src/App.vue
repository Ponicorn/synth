<template>
  <div id="app">
    <piano />
  </div>
</template>

<script>
import Piano from '@/components/Piano'

export default {
  name: 'app',
  components: {
    Piano
  }
}
</script>

<style lang="scss">

* {
  padding: 0;
  margin: 0;
}

html, body, #app {
  height: 100%;
  width: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #3FC380;
  color: #22313F;
}

#app {
  text-align: center;
}
</style>
