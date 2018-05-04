<template>
  <div>
    <br>
    <br>
    <button v-if="!showNewCard" @click="showNewCard = true">Add new card</button>
    <form v-if="showNewCard" @submit.prevent="saveNewCard">
      <label for="name">Name</label><br>
      <input type="text" v-model="card.name" id="name" maxlength="99" required><br>
      <label for="status">Name</label><br>
      <select v-model="card.status" id="status">
        <option value="0">Backlog</option>
        <option value="1">To</option>
        <option value="2">Doing</option>
        <option value="3">Do</option>
      </select>
      <br>
      <br>
      <button @click.prevent="showNewCard = false">Close</button>
      <button>Create Card</button>
    </form>
    <div class="squares">
      <ul v-if="backlog.length">
        <li>Backlog</li>
        <li v-for="card in backlog">
            <Card v-on:remove="removeCard" v-on:edit="editCard" :card="card"></Card>
        </li>
      </ul>
      <ul>
        <li>To</li>
        <li v-for="card in cardsTo">
            <Card v-on:remove="removeCard" v-on:edit="editCard" :card="card"></Card>
        </li>
      </ul>
      <ul>
        <li>Doing</li>
        <li v-for="card in cardsDoing">
            <Card v-on:remove="removeCard" v-on:edit="editCard" :card="card"></Card>
        </li>
      </ul>
      <ul>
        <li>Do</li>
        <li v-for="card in cardsDo">
            <Card v-on:remove="removeCard" v-on:edit="editCard" :card="card"></Card>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SquareCard',
    data() {
      return {
        showNewCard: false,
        card: {
          name: null,
          status: 0,
          square_id: null,
        },
        cards: [],
        backlog: [],
        cardsTo: [],
        cardsDoing: [],
        cardsDo: [],
      }
    },
    methods: {
      getCards() {
        this.$http.get('https://172.17.0.3:8080/squares/' + this.$route.params.id + '/cards').then((ret) => {
          if (ret.body) {
            this.cards = ret.body;
          }
        });
      },
      getSquare() {
        this.$http.get('https://172.17.0.3:8080/squares/' + this.$route.params.id).then((ret) => {
          if (ret.body) {
            this.$parent.square = ret.body;
          }
        });
      },
      arrangeCards(cards) {
        this.backlog = [];
        this.cardsTo = [];
        this.cardsDoing = [];
        this.cardsDo = [];
        cards.filter(function (card) {
          switch (parseInt(card.status)) {
            case 0:
              this.backlog.push(card);
              break;
            case 1:
              this.cardsTo.push(card);
              break;
            case 2:
              this.cardsDoing.push(card);
              break;
            case 3:
              this.cardsDo.push(card);
              break;
          }
        }, this);
      },
      saveNewCard(){
        this.$http.post('https://172.17.0.3:8080/squares/' + this.$route.params.id + '/cards', this.card).then((ret) => {
          if (ret.body) {
            this.cards.push(ret.body);
            this.card = {
              name: null,
              status: 0,
              square_id: null,
            };
            this.showNewCard = false;
          }
        });
      },
      removeCard(card){
        this.$http.delete('https://172.17.0.3:8080/cards/' + card._id).then((ret) => {
          if (ret.body) {
            this.cards = this.cards.filter(function (card) {
              return card._id != this._id;
            }, card);
          }
        });
      },
      editCard(card){
        this.$http.put('https://172.17.0.3:8080/cards/' + card._id, card).then((ret) => {
          if (ret.body) {
            this.cards = this.cards.filter(function (card) {
              return card._id == this._id ? this : card;
            }, card);
          }
        });
      },
    },
    mounted() {
      if (!this.$parent.userLogged) {
        this.$parent.$router.push('/');
      }

      this.getSquare();
      this.getCards();
    },
    watch: {
      cards: function (cards) {
        this.arrangeCards(cards);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../assets/scss/settings';
  .squares {
    display: flex;
    flex-direction: row;
    ul {
      flex: 1;
      margin-top: #{$gutter * 3};
      margin-right: #{$gutter / 3};
      &:last-of-type {
        margin-right: 0;
      }
      li {
        width: 100%;
        display: flex;
        align-items: center;
        margin-top: #{$gutter / 3};
        overflow: hidden;
        &:first-of-type{
          margin-top: 0;
          background-color: $primary-color-dark;
          color: $accent-color;
          justify-content: center;
          font-weight: bold;
          text-transform: uppercase;
          height: 35px;
        }
      }
    }
  }
</style>
