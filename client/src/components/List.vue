<template>
  <div class="list col-12">
    <div class="card bg-dark border border-info my-3">
      <div class="card-body">
        <div class="col-12">
          <div class="row">
            <div class="col-6 topstuff">

              <h5 class="card-title text-white">List:</h5>
            </div>
            <div class="col-6 topstuff text-right">

              <i @click="deleteList" class=" fas fa-trash-alt text-white trashit"></i>
            </div>
          </div>
        </div>
        <h2 class="text-white">{{listData.title}}</h2>
        <p class="card-text">
          <task v-for="task in tasks" :taskData='task'></task>
        </p>
        <form @submit.prevent="addTask">
          <input type="text" placeholder="Task..." v-model="newTask.description" required>
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
  h5 {
    text-align: left;

  }

  h2 {
    font-size: 250%;
    text-shadow: 4px 2px black;
  }

  .topstuff {
    margin-top: -10px;

  }
</style>