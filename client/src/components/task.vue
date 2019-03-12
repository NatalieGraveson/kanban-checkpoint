<template>
  <div class="task">
    <h3>{{taskData.description}}</h3>
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
      tasks() {
        return this.$store.state.task

      },
    },
    methods: {},
    components: {}
  }
</script>