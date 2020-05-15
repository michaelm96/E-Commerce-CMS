<template>
  <div>
    <b-form @submit.prevent="onSubmit">
      <b-form-group id="input-group-1" label="Email address:" label-for="input-1">
        <b-form-input id="input-1" v-model="email"
        type="email" placeholder="Enter email"></b-form-input>
      </b-form-group>

      <b-form-group>
        <label for="text-password">Password</label>
        <b-input
          type="password"
          id="text-password"
          aria-describedby="password-help-block"
          v-model="password"
        ></b-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    onSubmit() {
      if (
        this.email !== undefined
        && this.email !== ''
        && this.password !== undefined
        && this.password !== ''
      ) {
        this.$store.dispatch('getAccessToken', {
          email: this.email,
          password: this.password,
        });
        setTimeout(() => {
          this.$router.push('/');
        }, 300);
      }
    },
  },
};
</script>
