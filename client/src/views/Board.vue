<template>
  <div class="board">
    <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
      <i class="fas fa-chess text-white fa-3x chess"></i>
      <button type="button" @click="logOut" class="ml-auto navbar-brand btn btn-outline-info topButton">Logout</button>
    </nav>
    <nav class="navbar navbar-expand-lg fixed-top navbar-light bg-light bottomOne">
      <h2>{{board.title}}</h2>
    </nav>
    <h3 data-toggle="modal" :data-target="'#descriptMod' + board._id" class="mr-auto">{{board.description}}</h3>



    <!-- Modal -->
    <div class="modal fade" :id="'#descriptMod' + board._id" tabindex="-1" role="dialog"
      :aria-labelledby="'#descriptMod' + board._id" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            ...
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>


    <div class="container-fluid">
      <div class="row">
        <div class="col-12 d-flex justify-content-center coolform">
          <form @submit.prevent="addList">
            <input class="bg-light form-control border border-info text-dark mt-5 mb-2" type="text"
              placeholder="list name" v-model="newList.title" required>
            <div class="d-flex justify-content-center ">
              <button class="fas fa-plus text-info form-control border border-info bg-light createB"
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

  .coolform {
    margin-top: 83px;
  }

  form {
    width: 50%;
  }

  .bottomOne {
    margin-top: 64px;
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