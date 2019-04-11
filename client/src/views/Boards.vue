<template>
  <div class="boards">
    <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
      <i class="fas fa-chess text-white fa-3x chess"></i>
      <button type="button" @click="logOut" class="ml-auto navbar-brand btn btn-outline-info topButton">Logout</button>
    </nav>
    <h1 class="topWords">CHECK</h1>
    <h1 class="mb-5">out your boards</h1>
    <div class="container-fluid">
      <div class="row">
        <div class="col-2"></div>
        <div class="col-8 d-flex justify-content-center">
          <form @submit.prevent="addBoard">
            <input class="bg-light form-control border border-info text-dark" type="text" placeholder="title"
              v-model="newBoard.title" required>
            <input class="bg-light form-control border border-info text-dark" type="text" placeholder="description"
              v-model="newBoard.description">
            <div class="d-flex justify-content-center">
              <button class=" click fas fa-plus text-info mt-3 form-control border border-info createB"
                type="submit"></button>
            </div>
          </form>
        </div>
        <div class="col-2"></div>
      </div>
      <div class="row">
        <div v-for="board in boards" :key="board._id" class="col-lg-4 col-md-6 col-12 d-flex cardstuff ">

          <div class="card bg-dark border border-light my-3">
            <i class="fas fa-chess-king text-white fa-3x kingT"></i>
            <div class="card-body">
              <router-link class="nameB" :to="{name: 'board', params: {boardId: board._id}}">{{board.title}}
              </router-link>
              <hr>
              <i @click="deleteBoard(board._id)" class="fas fa-trash-alt text-info"></i>
            </div>
          </div>
        </div>
        <!-- </div> -->
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
  h1 {
    text-align: center;
  }

  .chess {
    z-index: 2;
    text-shadow: 6px 2px black;
  }

  .boards {
    text-align: center;
  }

  .card {
    height: min-content;
    width: 75%;
  }

  .kingT {

    text-shadow: 4px 2px black;
    margin-top: 13px;

  }

  .nameB {
    font-size: 29px;
    color: white;
    font-weight: bolder;
    text-shadow: 4px 2px black;
  }



  form {
    width: 50%;
  }

  .cardstuff {
    justify-content: center;
  }

  .topWords {
    margin-top: 65px;
  }

  .createB {
    width: fit-content;
  }

  @media only screen and (max-width: 450px) {
    .cardstuff {
      align-items: center;
      flex-direction: column;
    }

    form {
      width: 100%;
    }
  }
</style>