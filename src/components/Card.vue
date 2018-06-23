<template>
  <div class="card">
    <span @click="edit(parseInt(card.status)-1)" v-if="card.status != '0'">
      <svg viewBox="4 4 16 16">
        <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"></path>
      </svg>
    </span>
    <div>
      <div>{{ card.name }}</div>
      <span @click="remove">
        <svg viewBox="2 2 20 20">
          <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"></path>
        </svg>
      </span>
    </div>
    <span @click="edit(parseInt(card.status)+1)" v-if="card.status != '3'">
      <svg viewBox="4 4 16 16">
        <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path>
      </svg>
    </span>
  </div>
</template>

<script>
  export default {
    props: ['card'],
    data() {
      return {}
    },
    methods: {
      remove: function() {
        this.$emit('remove', this.card);
      },
      edit: function(status) {
        this.card.status = status;
        this.$emit('edit', this.card);
      },
    },
    mounted() {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../assets/scss/settings';

  .card {
    width: 100%;
    word-wrap: break-word;
    color: $secondary-text-color;
    background-color: $primary-color-light;
    height: 100px;
    display: flex;
    * {
      transition: 0.1s all ease-out;
    }
    > span {
      flex: 0 0 #{$gutter * 2};
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      > svg {
        fill: $primary-color-light;
      }
      &:hover {
        background-color: $primary-color-dark;
        > svg {
          fill: $primary-color-text;
        }
      }
    }
    > div {
      flex: 1;
      text-align: center;
      display: flex;
      align-items: center;
      flex-direction: column;
      > div {
        flex: 1;
        display: flex;
        align-items: center;
      }
      span {
        margin: #{$gutter / 3} 0;
        cursor: pointer;
        width: 100%;
        height: 16px;
        > svg {
          fill: $primary-color-light;
        }
        &:hover {
          > svg {
            fill: $primary-color-dark;
          }
        }
      }
    }
  }
</style>
