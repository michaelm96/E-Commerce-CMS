<template>
  <div>
    <div>
      <b-nav tabs>
        <b-nav-item class="loginTitle">
          <router-link to="/login" class="log">Login</router-link>
        </b-nav-item>
        <b-nav-item active>
          <router-link to="/register" class="reg">Register</router-link>
        </b-nav-item>
      </b-nav>
    </div>
    <register-form/>
  </div>
</template>

<script>
import register from '../components/register.vue';

export default {
  name: 'register',
  components: {
    'register-form': register,
  },
};
</script>

<style scoped>
  .loginTitle{
    background-color: grey;
  }
  .log{
    color: white;
    text-decoration: none;
  }
  .reg{
    color: black;
    text-decoration: none;
  }
</style>
