<template>
  <div class="board container-fluid">
    <div class="row">
      <div class="col-12">
        <h1>{{board.title}} Description: {{board.description}}</h1>
        <form @submit.prevent="addList">
          <input type="text" placeholder="title" v-model="newList.title" required>
          <button type="submit">Create List</button>
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
</style>