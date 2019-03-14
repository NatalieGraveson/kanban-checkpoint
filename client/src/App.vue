<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'App',
    mounted() {
      //Authenticate on startup
      this.$store.dispatch('authenticate')
    }
  }
</script>

<style>
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    overflow-x: hidden;
    background-image: url('https://backgroundcheckall.com/wp-content/uploads/2017/12/chess-board-background-1.jpg');
    /* background-color: gray; */
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
    min-height: 100vh;
    align-content: flex-start;
    font-family: 'Corben', cursive;
  }

  .chess {
    z-index: 2;
    text-shadow: 6px 2px black;
  }
</style>