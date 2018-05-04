<template>
  <div class="squares">
    <h1>Squares</h1>
    <button v-if="!showNewSquare" @click="showNewSquare = true">Add new Square</button>
    <form v-if="showNewSquare" @submit.prevent="saveNewSquare">
      <label for="name">Name</label><br>
      <input type="text" v-model="square.name" id="name" maxlength="99" required><br>
      <button @click.prevent="showNewSquare = false">Close</button>
      <button>Create Square</button>
    </form>
    <ul v-if="squares">
      <li v-for="square in squares">
        <router-link :to="{ name: 'SquareCard', params: { id: square._id }}">{{ square.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'Square',
    data() {
      return {
        showNewSquare: false,
        squares: null,
        square: {
          name: ''
        },
      }
    },
    methods: {
      saveNewSquare() {
        this.$http.post('http://35.231.32.198:8080/' + this.$parent.userLogged._id + '/squares', {
          name: this.square.name,
        }).then((ret) => {
          if (ret.body) {
            this.squares.push(ret.body);
            this.showNewSquare = false;
            this.square.name = '';
          }
        });
      },
      getSquares() {
        this.$http.get('http://35.231.32.198:8080/' + this.$parent.userLogged._id + '/squares').then((ret) => {
          if (ret.body) {
            this.squares = ret.body;
          }
        });
      }
    },
    mounted() {
      if (!this.$parent.userLogged) {
        this.$parent.$router.push('/');
      }

      this.getSquares();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../assets/scss/settings';

  .squares{
    ul {
      display: flex;
      align-items: normal;
      justify-content: space-evenly;
      flex-wrap: wrap;
      margin-top: #{$gutter * 3};
      li {
        background-color: $accent-color;
        color: $primary-color-text;
        margin: #{$gutter / 3};
        padding: #{$gutter / 3};
        width: 100px;
          height: 100px;
        overflow: hidden;
        word-wrap: break-word;
        word-break: break-all;
        > a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          color: inherit;
          text-decoration: none;
          font-size: 16px;
        }
      }
    }
  }
</style>
