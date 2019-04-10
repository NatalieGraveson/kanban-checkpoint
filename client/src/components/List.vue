<template>
  <div class="list col-12 col-md-4 d-flex">
    <div class="card bg-dark border border-info my-3">
      <div class="card-body">

        <div class="row">
          <div class="col-8 topstuff">

            <h5 class="card-title text-white"><i class="fas fa-chess-queen"></i>List</h5>
          </div>
          <div class="col-4 topstuff text-right">

            <i @click="deleteList" class="fas fa-trash-alt text-white trashit"></i>
          </div>
        </div>

        <div class="row">
          <div class="col-10">
            <h2 class="text-white">{{listData.title}}</h2>
          </div>
          <div class="col-2">
            <i class=" fas fa-plus text-info" @click="showAddTask = !showAddTask" v-if="!showAddTask"></i>
            <i class=" fas fa-minus text-info" @click="showAddTask = !showAddTask" v-if="showAddTask"></i>
          </div>
        </div>
        <hr>
        <!-- <h5 class="bg-info text-white border rounded mt-2"><i class="fas fa-chess-knight"></i>Task:</h5> -->
        <!-- <i class=" fas fa-plus text-info" @click="showAddTask = !showAddTask" v-if="!showAddTask"></i> -->
        <!-- <i class=" fas fa-minus text-info" @click="showAddTask = !showAddTask" v-if="showAddTask"></i> -->
        <form class="d-flex flex-column justify-content-center align-items-center w-100" @submit.prevent="addTask"
          v-if="showAddTask">
          <input type="text" placeholder="Task..." v-model="newTask.description" required>
          <button type="submit" class="btn btn-outline-info">Create task</button>
        </form>
        <p class="card-text">
          <task v-for="task in tasks" :taskData='task'></task>
        </p>

        <!-- Modal -->
        <!-- <div class="modal fade" :id="'task-modal' + listData._id" tabindex=" -1" role="dialog" -->
        <!-- :aria-labelledby="'task-modal' + listData._id" aria-hidden="true"> -->
        <!-- <div class="modal-dialog modal-dialog-scrollable" role="document"> -->
        <!-- <div class="modal-content"> -->
        <!-- <div class="modal-header"> -->
        <!-- <h5 class="modal-title">{{listData.title}}</h5> -->
        <!-- <button type="button" class="close" data-dismiss="modal" aria-label="Close"> -->
        <!-- <span aria-hidden="true">&times;</span> -->
        <!-- </button> -->
        <!-- </div> -->
        <!-- <div class="modal-body"> -->
        <!--  -->
        <!-- <task v-for="task in tasks" :taskData='task'></task> -->
        <!-- </div> -->
        <!-- <div class="modal-footer"> -->
        <!-- <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> -->
        <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
        <!-- </div> -->
        <!-- </div> -->
        <!-- </div> -->
      </div>

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
        showAddTask: false,
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
      // lists() {
      //   return this.$store.state.lists
      // },
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
    font-size: 171%;
    text-shadow: 4px 2px black;
    text-align: left;
  }

  .card {
    width: fit-content;
  }

  .topstuff {
    margin-top: -10px;

  }

  .card {
    width: 100%;
  }

  @media only screen and (max-width: 450px) {
    .list {
      flex-direction: column;
      align-items: center;

    }

  }
</style>