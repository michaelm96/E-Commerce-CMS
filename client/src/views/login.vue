<template>
  <div>
    <div>
      <b-nav tabs>
        <b-nav-item active>
          <router-link to="/login" class="log">Login</router-link>
        </b-nav-item>
        <b-nav-item class="registerTitle">
          <router-link to="/register" class="reg">Register</router-link>
        </b-nav-item>
      </b-nav>
    </div>
    <login-form/>
  </div>
</template>

<script>
import login from '../components/login.vue';

export default {
  name: 'login',
  components: {
    'login-form': login,
  },
};
</script>

<style scoped>
  .registerTitle{
    background-color: grey;
  }
  .reg{
    color: white;
    text-decoration: none;
  }
  .log{
    color: black;
    text-decoration: none;
  }
</style>
