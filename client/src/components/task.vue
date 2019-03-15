<template>
  <div class="task row border mb-4 bg-light">
    <div class="col-4">
      <h5 class="bg-info text-white border rounded mt-2">Task:</h5>
    </div>
    <div class="col-8"></div>
    <br>
    <h3 class="col-6 tasktitle">{{taskData.description}}</h3>
    <div class="dropdown col-6">
      <button type="button" @click="deleteTask" class="btn btn-outline-info bg-dark fas fa-trash-alt"></button>
      <button class="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
        aria-haspopup="true" aria-expanded="false">move to
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a v-for="list in lists" :value="list._id" class="dropdown-item" @click="moveTask(list._id)">{{list.title}}</a>
      </div>
    </div>
    <div class="col-12">
      <hr>
    </div>
    <h4 class="col-12 words text-info">Comments:</h4>
    <div class="col-12">
      <i class=" far fa-plus-square text-info bg-dark form-control border border-info plusstuff"
        @click="showAddComment = !showAddComment" v-if="!showAddComment"></i>
      <i class=" far fa-minus-square text-info bg-dark form-control border border-info createB"
        @click="showAddComment = !showAddComment" v-if="showAddComment"></i>
    </div>
    <div class="row">
      <form class="col-12 d-flex mt-2" @submit.prevent="addComment" v-if="showAddComment">
        <input type="text" placeholder="description" v-model="newComment.content" required>
        <button type="submit"
          class="far fa-plus-square text-info bg-dark form-control border border-info otherplus"></button>
      </form>
    </div>

    <h2 class="col-12" v-for="comment in taskData.comments">{{comment.content}}&nbsp
      <button type="button" @click="deleteComment(comment)"
        class="btn btn-outline-info bg-dark fas fa-trash-alt"></button>
    </h2>
  </div>
</template>

<script>
  export default {
    name: "task",
    props: ['taskData'],
    data() {
      return {
        showAddComment: false,
        newComment: {
          taskId: this.taskData._id,
          listId: this.taskData.listId
        }
      }
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
        this.$store.dispatch('deleteTask', this.taskData)
      },
      addComment() {
        //this.taskData.comment.push(this.newComment)
        this.$store.dispatch('addComment', this.newComment)
      },
      deleteComment(comment) {
        let payload = {
          taskId: this.taskData._id,
          commentId: comment._id,
          listId: this.taskData.listId
        }
        this.$store.dispatch('deleteComment', payload)
      }
    },

    components: {}
  }
</script>
<style scoped>
  .words {
    text-align: left;
    font-size: 18px;
  }

  .plusstuff {
    width: 18%;
    margin-right: auto;
    margin-bottom: 15px;
  }

  otherplus {
    width: fit-content;
  }

  h5 {
    text-align: left;

  }

  .tasktitle {
    color: black;
  }
</style>