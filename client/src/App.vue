<template>
  <div id="app" class="container">
    <h1 class="brand">M96 CMS</h1>
    <navbar id="nav" v-if="this.$store.state.isLoggedIn" />
    <router-view></router-view>
  </div>
</template>

<script>
import navbar from './components/navbar.vue';

export default {
  name: 'app',
  data() {
    return {
      loggedIn: this.$store.state.isLoggedIn,
    };
  },
  components: {
    navbar,
  },
  created() {
    this.$store.dispatch('loggedIn');
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.brand {
  text-align: center;
  font-family: 'Cantata One', serif;
  font-weight: 700px;
  background-color: floralwhite;
  border-radius: 0 0 2rem 2rem;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.liNav {
  list-style: none;
}

.liNav a {
  color: #42b983;
}
</style>
