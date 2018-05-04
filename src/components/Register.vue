<template>
  <div class="register">
    <h1>Register</h1>
    <form @submit.prevent="login" class="register__box">
      <label for="name">Name:</label>
      <br>
      <input v-model="user.name" type="text" name="name" id="name" required>
      <br>
      <label for="email">Email:</label>
      <br>
      <input v-model="user.email" type="email" name="email" id="email" required>
      <br>
      <label for="password">Password:</label>
      <br>
      <input v-model="user.password" type="password" name="password" id="password" required>
      <br><br>
      <button>Login</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'Register',
    data() {
      return {
        user: {
          name: '',
          email: '',
          password: ''
        }
      }
    },
    methods: {
      login: function () {
        this.$http.post('http://35.231.32.198:8080/users', {
          name: this.user.name,
          email: this.user.email,
          password: this.user.password
        }).then(ret => {
          if (ret.body) {
            this.user = ret.body;
            this.$parent.login(this.user);
          }
        });
      }
    },
    created() {
      if(this.$parent.userLogged){
        this.$parent.$router.push('/');
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../assets/scss/settings';
</style>
