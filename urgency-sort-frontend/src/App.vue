<template>
  <div id="app">
    <Nav/>
    <router-view/>
  </div>
</template>

<script>
import Nav from './components/Nav';

export default {
  name: 'App',
  components: {
    Nav,
  },
};
</script>

<style lang='scss'>
@import '~@/styles/custom-bootstrap';
</style>
