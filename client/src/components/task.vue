<template>
  <div class="task">
    <h3>{{taskData.description}}</h3>
    <form @submit.prevent="addComment">
      <input type="text" placeholder="description" v-model="newComment.content" required>
      <button type="submit">Create comment</button>
    </form>

    <h2 v-for="comment in taskData.comments">{{comment.content}}<button type="button" @click="deleteComment(comment)"
        class="btn btn-outline-danger">remove</button>
    </h2>
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
      return {
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