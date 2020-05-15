<template>
  <div>
    <div>
      <b-nav tabs>
        <b-nav-item>
          <router-link to="/login">Login</router-link>
        </b-nav-item>
        <b-nav-item active>
          <router-link to="/register">Register</router-link>
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
