<template>
  <div id="app">
    <header>
      <img src="./assets/logo.png">
      <nav>
        <router-link to="/">Home</router-link>
        <router-link v-if="!userLogged" to="/login">Login</router-link>
        <router-link v-if="!userLogged" to="/register">Register</router-link>
        <router-link v-if="userLogged" to="/squares">Squares</router-link>
        <span v-if="square">> {{ square.name }}</span>
      </nav>
      <div v-if="userLogged">Login as {{ userLogged.name }}, <a v-if="userLogged" @click.prevent="logout" href="#">logout</a>
      </div>
    </header>
    <router-view/>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        userLogged: null,
        square: null,
      }
    },
    name: 'App',
    methods: {
      login: function (user) {
        this.userLogged = user;
        this.$cookie.set('userLogged', JSON.stringify(user));
        this.$router.push('/');
      },
      logout: function () {
        this.userLogged = null;
        this.$cookie.delete('userLogged');
        this.$router.push('/');
      },
      bindUserlogged: function () {
        if (this.$cookie.get('userLogged')) {
          this.userLogged = JSON.parse(this.$cookie.get('userLogged'));
        }
      }
    },
    created() {
      this.bindUserlogged();
    },
    watch: {
      '$route'(to, from) {
        this.square = null;
      }
    }
  }
</script>

<style lang="scss">

  @import "assets/scss/settings";

  html, body {
    padding: 0;
    margin: 0;
  }

  input {
    margin-bottom: $gutter;
  }

  ul, ul li {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  svg {
    width: 16px;
    height: 16px;
    fill: $secondary-text-color;
  }

  #{$all-buttons} {
    background-color: $accent-color;
    color: white;
    border: none;
    text-transform: uppercase;
    font-size: 11px;
    cursor: pointer;
    @include padding(#{$gutter / 3} $gutter);
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: $primary-text-color;
    header {
      background-color: $primary-color;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      > img {
        max-width: 30px;
        margin: 0 $gutter;
        @include media($desktop){
          max-width: 100%;
        }
      }
      > nav {
        flex: 1;
        text-align: left;
        color: $primary-color-text;
        > a, > span {
          color: inherit;
          margin-right: $gutter;
        }
      }
      > div {
        color: $primary-color-text;
        margin-right: $gutter;
        > a {
          color: inherit;
        }
      }
    }
  }
</style>
