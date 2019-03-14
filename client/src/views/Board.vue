<template>
  <div class="board">
    <nav class="navbar navbar-expand-lg sticky-top navbar-dark bg-dark">
      <i class="fas fa-chess text-white fa-3x chess"></i>
      <button type="button" @click="logOut" class="ml-auto navbar-brand btn btn-outline-info topButton">Logout</button>
    </nav>
    <h1>{{board.title}} Description: {{board.description}}</h1>
    <form @submit.prevent="addList">
      <input class="bg-light form-control border border-info text-dark" type="text" placeholder="title"
        v-model="newList.title" required>
      <button class="far fa-plus-square text-info" type="submit"></button>
    </form>
    <list v-for="list in lists" :listData='list'></list>
  </div>
  </div>
  </div>
</template>

<script>
  import List from '@/components/List.vue'
  export default {
    name: "board",
    props: ["boardId"],
    mounted() {

      this.$store.dispatch('getLists', this.boardId)
    },
    data() {
      return {
        newList: {
          title: "",
        }
      }
    },

    computed: {
      board() {
        return this.$store.state.boards.find(b => b._id == this.boardId) || { title: 'Loading...' }
      },
      lists() {
        return this.$store.state.lists
      }
    },
    methods: {
      addList() {
        this.newList.boardId = this.boardId
        this.$store.dispatch('addList', this.newList)
        this.newList = { title: "" };

      },
      logOut() {
        this.$store.dispatch('logOut')
      }
    },
    components: {
      List
    }

  };
</script>
<style>
  .card {
    width: min-content;
    height: max-content;
  }

  .navbar-brand {
    margin-right: 0rem;
  }

  .chess {
    z-index: 2;
    text-shadow: 6px 2px black;
  }
</style>