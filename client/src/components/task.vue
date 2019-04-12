<template>
  <div class="task row border mb-3 bg-light allTask">

    <br>
    <div class="custom-control custom-checkbox">
      <input type="checkbox" class="custom-control-input" id="${this._id}">
      <label class="custom-control-label" for="customCheck1"></label>
    </div>
    <h3 class="col-12 tasktitle " data-toggle="modal" :data-target="'#commentmodal' + taskData._id">
      {{taskData.description}}</h3>
    <!-- <div class="dropdown col-6"> -->
    <!-- <button type="button" @click="deleteTask" class="btn btn-outline-info bg-dark fas fa-trash-alt"></button> -->
    <!-- <button class="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" -->
    <!-- aria-haspopup="true" aria-expanded="false">move to -->
    <!-- </button> -->
    <!-- <div class="dropdown-menu" aria-labelledby="dropdownMenuButton"> -->
    <!-- <a v-for="list in lists" :value="list._id" class="dropdown-item" @click="moveTask(list._id)">{{list.title}}</a> -->
    <!-- </div> -->
    <!-- </div> -->
    <!-- Button trigger modal -->
    <!-- <i class="fas fa-plus text-info" data-toggle="modal" :data-target="'#commentmodal' + taskData._id"> -->
    <!-- </i> -->

    <!-- Modal -->
    <div class="modal fade" :id="'commentmodal' + taskData._id" tabindex="-1" role="dialog"
      :aria-labelledby="'commentmodal' + taskData._id" aria-hidden="true">
      <div class="modal-dialog modal-dialog-scrollable" role="document">
        <div class="modal-content">
          <div class="modal-header">

            <!-- <h5 @click="this.completed = !this.completed" v-if="completed" -->
            <!-- class="modal-title text-center far fa-check-square"> -->
            <!-- {{taskData.description}}</h5> -->
            <!-- <h5 @click="this.completed = !this.completed" v-if="!completed" -->
            <!-- class="modal-title text-center far fa-square">{{taskData.description}}</h5> -->
            <h5 class="modal-title text-center">{{taskData.description}}</h5>



            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <h4 class="col-10 words text-info"><i class="fas fa-chess-pawn"></i>Comments:</h4>
              <div class="col-2">
                <i class=" fas fa-plus text-info  plusstuff" @click="showAddComment = !showAddComment"
                  v-if="!showAddComment"></i>
                <i class=" fas fa-minus text-info  createB" @click="showAddComment = !showAddComment"
                  v-if="showAddComment"></i>
              </div>
            </div>
            <div class="row">
              <form class="col-12 d-flex mt-2" @submit.prevent="addComment" v-if="showAddComment">
                <input type="text" placeholder="description" v-model="newComment.content" required>
                <button type="submit" class="fas fa-plus text-info form-control otherplus"></button>
              </form>
            </div>
          </div>
          <h2 class="col-12 comwords" v-for="comment in taskData.comments">{{comment.content}}&nbsp
            <i @click="deleteComment(comment)" class="fas fa-trash-alt top comtrash text-info"></i>
          </h2>
          <div class="modal-footer">
            <div class="row"></div>
            <i @click="deleteTask" class="fas fa-trash-alt fa-2x text-info" data-dismiss="modal"></i>
            <button class="btn btn-outline-dark bg transparent dropdown-toggle" type="button" id="dropdownMenuButton"
              data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">move to
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a v-for="list in lists" :value="list._id" class="dropdown-item"
                @click="moveTask(list._id)">{{list.title}}</a>
            </div>
            <button type="button" class="btn btn-outline-dark bg transparent" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="col-12"> -->

    <!-- <hr> -->
    <!-- </div> -->
    <!-- <h4 class="col-12 words text-info"><i class="fas fa-chess-pawn"></i>Comments:</h4>
    <div class="col-12">
    <i class=" far fa-plus-square text-info bg-dark form-control border border-info plusstuff"
    @click="showAddComment = !showAddComment" v-if="!showAddComment"></i>
    <i class=" fas fa-minus text-info bg-dark form-control border border-info createB"
    @click="showAddComment = !showAddComment" v-if="showAddComment"></i>
    </div>
    <div class="row">
    <form class="col-12 d-flex mt-2" @submit.prevent="addComment" v-if="showAddComment">
    <input type="text" placeholder="description" v-model="newComment.content" required>
    <button type="submit"
    class="far fa-plus-square text-info bg-dark form-control border border-info otherplus"></button>
    </form>
    </div> -->

    <!-- <h2 class="col-12" v-for="comment in taskData.comments">{{comment.content}}&nbsp
    <button type="button" @click="deleteComment(comment)"
    class="btn btn-outline-info bg-dark fas fa-trash-alt"></button>
    </h2> -->
  </div>
</template>

<script>
  export default {
    name: "task",
    props: ['taskData'],
    data() {
      return {
        completed: false,
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
        this.$store.dispatch('addComment', this.newComment)
      },
      deleteComment(comment) {
        let payload = {
          taskId: this.taskData._id,
          commentId: comment._id,
          listId: this.taskData.listId
        }
        this.$store.dispatch('deleteComment', payload)
      },

    },

    components: {}
  }
</script>
<style scoped>
  .words {
    text-align: left;
    font-size: 25px;
  }

  .plusstuff {
    width: 18%;
    margin-right: auto;
    margin-bottom: 15px;
  }

  .comtrash {
    font-size: 15px;
  }

  .middleButton {
    color: black;
    background-color: white;
  }

  .bottomButton {
    color: black;
    background-color: white;
  }

  .comwords {
    background-color: #151515;
    color: white;
    border-radius: 7px;
    font-size: 18px;
  }

  .otherplus {
    width: fit-content;
  }

  .allTask {
    border-radius: 15px;
    margin-top: 11px;
  }

  .modal-footer>:not(:last-child) {
    margin-right: 2.25rem;
  }

  h5 {
    text-align: center;
    font-size: 25px;
    font-weight: bold;

  }

  .tasktitle {
    color: black;
    font-size: 25px;
  }
</style>