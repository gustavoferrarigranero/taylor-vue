<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="login" class="login__box">
      <label for="email">Email:</label>
      <br>
      <input v-model="user.email" type="text" name="email" id="email">
      <br>
      <label for="password">Password:</label>
      <br>
      <input v-model="user.password" type="password" name="password" id="password">
      <br><br>
      <button>Login</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'Login',
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
        this.$http.post('https://172.17.0.3:8080/users/login', {
          email: this.user.email,
          password: this.user.password
        }).then(ret => {
          if (ret.body) {
            this.user = ret.body;
            this.$parent.login(this.user);
          }
        });
        return false
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
