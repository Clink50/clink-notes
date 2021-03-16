<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="email">Email Address</label>
        <input
          v-model="emailAddress"
          type="text"
          name="email"
          class="form-control"
          :class="{ 'is-invalid': submitted && !email }"
        />
        <div v-show="submitted && !email" class="invalid-feedback">Email is required</div>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          v-model="password"
          type="password"
          name="password"
          class="form-control"
          :class="{ 'is-invalid': submitted && !password }"
        />
        <div v-show="submitted && !password" class="invalid-feedback">Password is required</div>
      </div>
      <div class="form-group">
        <button class="btn btn-primary" type="submit">Login</button>
        <button class="btn btn-link">Register</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      emailAddress: 'clink1@gmail.com',
      password: 'test123',
      submitted: false,
    };
  },
  methods: {
    async onSubmit() {
      try {
        const loginRequest = {
          data: {
            emailAddress: this.emailAddress,
            password: this.password,
          },
        };

        await this.$auth.loginWith('local', loginRequest);
        this.$router.push('/');
      } catch (err) {
        console.log(err);
        this.$router.push('/login');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  margin: 1rem;
}
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;

  .form-group {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  button {
    cursor: pointer;
  }
}
</style>
