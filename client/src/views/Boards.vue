<template>
  <div class="boards">
    <nav class="navbar navbar-expand-lg sticky-top navbar-dark bg-dark">
      <i class="fas fa-chess text-white fa-3x chess"></i>
      <button type="button" @click="logOut" class="ml-auto navbar-brand btn btn-outline-info topButton">Logout</button>
    </nav>
    <h1>CHECK</h1>
    <h1>out your boards</h1>
    <div class="container-fluid">
      <form @submit.prevent="addBoard">
        <input class="bg-light form-control border border-info text-white" type="text" placeholder="title"
          v-model="newBoard.title" required>
        <input class="bg-light form-control border border-info" type="text" placeholder="description"
          v-model="newBoard.description">
        <button class="bg-light form-control border border-info createB" type="submit">Create Board</button>
      </form>
      <div v-for="board in boards" :key="board._id">
        <router-link :to="{name: 'board', params: {boardId: board._id}}">{{board.title}}</router-link>
        <button class="btn btn-outline-info bg-dark" @click="deleteBoard(board._id)">DELETE BOARD</button>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: "boards",
    created() {
      //blocks users not logged in
      if (!this.$store.state.user._id) {
        this.$router.push({ name: "login" });
      }
    },
    mounted() {
      this.$store.dispatch("getBoards");
    },
    data() {
      return {
        newBoard: {
          title: "",
          description: ""
        }
      };
    },
    computed: {
      boards() {
        return this.$store.state.boards;
      }
    },
    methods: {
      addBoard() {
        this.$store.dispatch("addBoard", this.newBoard);
        this.newBoard = { title: "", description: "" };
      },
      deleteBoard(boardId) {
        this.$store.dispatch("deleteBoard", boardId);
      },
      logOut() {
        this.$store.dispatch('logOut')
      }
    }
  };
</script>

<style scoped>
  .chess {
    z-index: 2;
    text-shadow: 6px 2px black;
  }

  .boards {
    text-align: center;
  }

  .createB {}
</style>