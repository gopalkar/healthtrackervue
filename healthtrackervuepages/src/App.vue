<template>
<!--  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>-->
  <div id="app">
    <AppNavbar />
    <router-view />
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue';
import AppNavbar from '@/components/Navbar.vue';

export default {
  name: 'App',
  components: {
    AppNavbar,
  },
};
</script>

<style>
#app {

}
</style>
