<template>
  <div class="board">
    <nav class="navbar navbar-expand-lg sticky-top navbar-dark bg-dark">
      <i class="fas fa-chess text-white fa-3x chess"></i>
      <button type="button" @click="logOut" class="ml-auto navbar-brand btn btn-outline-info topButton">Logout</button>
    </nav>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <h1>board:</h1>
          <h1 class=" text-info bg-dark">{{board.title}}</h1>
          <h1>Description:</h1>
          <h1 class="text-info bg-dark">{{board.description}}</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-12 d-flex justify-content-center">
          <form @submit.prevent="addList">
            <input class="bg-light form-control border border-info text-dark mt-5" type="text" placeholder="list name"
              v-model="newList.title" required>
            <div class="d-flex justify-content-center ">
              <button class="far fa-plus-square text-info bg-dark form-control border border-info createB"
                type="submit"></button>
            </div>
          </form>
        </div>
      </div>
      <div class="row">
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

  .board {
    text-align: center;
  }

  .navbar-brand {
    margin-right: 0rem;
  }

  .chess {
    z-index: 2;
    text-shadow: 6px 2px black;
  }

  .createB {
    width: fit-content;
  }

  form {
    width: 50%;
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

  h1 {
    text-align: left;
    font-size: 25px;
  }
</style>