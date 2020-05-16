<template>
  <div class="nav">
    <b-sidebar class="bgColor" id="sidebar-1" title="M96" shadow>
        <div class="listRoute">
            <router-link to="/add">Add</router-link>
            <hr>
            <router-link to="/">Product</router-link>
            <hr>
            <router-link to="/banner">Banner</router-link>
            <hr>
            <a href="" @click.prevent="logout">Logout</a>
        </div>
    </b-sidebar>
    <div class="bar">
      <b-button v-b-toggle.sidebar-1 class="sidebar">Menu</b-button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'navbar',
  data() {
    return {
      sidebarShow: false,
    };
  },
  methods: {
    showSide() {
      this.sidebarShow = !this.sidebarShow;
    },
    logout() {
      localStorage.removeItem('access_token');
      this.$store.state.access_token = null;
      this.$store.state.isLoggedIn = false;
      this.$router.push('/login');
    },
  },
  component: {
  },
};
</script>

<style scoped>
.drop {
  position: relative;
  margin-left: 57rem;
}

.bar {
  display: inline-flex;
}

.listRoute{
    margin-left: 1rem;
    text-decoration: none;
}
#sidebar-1{
  background-color: red;
}
</style>
