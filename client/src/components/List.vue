<template>
  <div class="row">
    <div class="col-12">
      <div class="list">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">List: {{listData.title}}</h5>
            <p class="card-text">
              <task v-for="task in tasks" :taskData='task'></task>
            </p>
            <button type="button" @click="deleteList" class="btn btn-danger">Delete List</button>
            <form @submit.prevent="addTask">
              <input type="text" placeholder="description" v-model="newTask.description" required>
              <button type="submit">Create task</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  import Task from '@/components/task.vue'
  export default {
    name: 'list',
    data() {
      return {
        newTask: {
          description: "",
          //listId: 3po45jsepe56jp6
        }
      }
    },
    mounted() {
      return this.$store.dispatch('getTasks', this.listData)
    },
    props: ['listData'],
    computed: {
      lists() {
        return this.$store.state.lists
      },
      tasks() {
        return this.$store.state.tasks[this.listData._id] || []
      }
    },
    methods: {
      deleteList() {
        this.$store.dispatch('deleteList', this.listData)
      },
      addTask() {
        this.newTask.listId = this.listData._id
        this.newTask.boardId = this.listData.boardId
        this.$store.dispatch("addTask", this.newTask)
      }
    },
    components: {
      Task
    }
  }
</script>

<style scoped>
</style>