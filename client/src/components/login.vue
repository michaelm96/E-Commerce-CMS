<template>
  <div>
    <b-alert show variant="danger" v-if="errMsg">{{ this.errMsg.message }}</b-alert>
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
      errMsg: '',
    };
  },
  methods: {
    async onSubmit() {
      await this.$store.dispatch('getAccessToken', {
        email: this.email,
        password: this.password,
      });
      if (this.$store.state.errMsg) {
        this.errMsg = this.$store.state.errMsg;
      }
      this.$router.push('/');
    },
  },
};
</script>
