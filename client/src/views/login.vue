<template>
  <div>
    <div>
      <b-nav tabs>
        <b-nav-item active>
          <router-link to="/login">Login</router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link to="/register">Register</router-link>
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
