<template>
  <div >
    <b-form @submit.prevent="onSubmit">
      <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
        <b-form-input id="input-2"
        v-model="form.name"
        required placeholder="Enter name"></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-1" label="Email address:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group>
        <label for="text-password">Password</label>
        <b-input type="password"
        id="text-password"
        v-model="form.password"
        aria-describedby="password-help-block"></b-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: '',
        name: '',
        password: '',
      },
    };
  },
  methods: {
    onSubmit() {
      this.$store.dispatch('toRegister', { email: this.form.email, name: this.form.name, password: this.form.password });
      setTimeout(() => {
        this.$router.push('/');
      }, 300);
    },
  },
};
</script>
