<template>
  <div class="task">
    <h3>{{taskData.description}}</h3>
    <div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
        aria-haspopup="true" aria-expanded="false">
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a v-for="list in lists" :value="list._id" class="dropdown-item" @click="moveTask(list._id)">{{list.title}}</a>
      </div>
    </div>
    <button type="button" @click="deleteTask" class="btn btn-outline-danger">remove</button>
  </div>
</template>

<script>
  export default {
    name: "task",
    props: ['taskData'],
    data() {
      return {}
    },
    computed: {
      lists() {
        return this.$store.state.lists
      },
    },
    methods: {
      moveTask(newId) {
        this.taskData.oldListId = this.taskData.listId
        this.taskData.listId = newId
        return this.$store.dispatch('moveTask', this.taskData)
      },
      deleteTask() {

      }
    },
    components: {}
  }
</script>