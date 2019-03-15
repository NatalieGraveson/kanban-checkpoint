<template>
  <div class="login">
    <nav class="navbar navbar-expand-lg sticky-top navbar-dark bg-dark">
      <i class="fas fa-chess text-white fa-3x chess mr-auto"></i>
      <span class="navbar-text text-white">
        Checkmate
      </span>
    </nav>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">

          <h3>organize&nbsp<i class="fas fa-circle fa-xs dots"></i> strategize&nbsp<i
              class="fas fa-circle fa-xs dots"></i>
            conquer
          </h3>
        </div>
      </div>
      <form class="logform" v-if="loginForm" @submit.prevent="loginUser">
        <input class="bg-light form-control border border-info emailI" type="email" v-model="creds.email"
          placeholder="email">
        <input class="bg-light form-control border border-info" type="password" v-model="creds.password"
          placeholder="password">
        <button class="btn btn-outline-info bg-dark" type="submit">Login</button>
      </form>
      <form class="registerform" v-else @submit.prevent="register">
        <input class="bg-light form-control border border-info mb-2" type="text" v-model="newUser.name"
          placeholder="name">
        <input class="bg-light form-control border border-info mb-2" type="email" v-model="newUser.email"
          placeholder="email">
        <input class="bg-light form-control border border-info mb-2" type="password" v-model="newUser.password"
          placeholder="password">
        <button class="btn btn-outline-info bg-dark mb-2" type="submit">Create Account</button>
      </form>
      <div class="action" @click="loginForm = !loginForm">
        <p class="text-info bg-light" v-if="loginForm">No account? Click here to Register</p>
        <p class="text-info bg-light" v-else>Already have an account? Click here to Login</p>
      </div>
    </div>
  </div>
</template>

<script>
  import router from '@/router.js'
  export default {
    name: "login",
    data() {
      return {
        loginForm: true,
        creds: {
          email: "",
          password: ""
        },
        newUser: {
          email: "",
          password: "",
          name: ""
        }
      };
    },
    methods: {
      register() {
        this.$store.dispatch("register", this.newUser);
      },
      loginUser() {
        this.$store.dispatch("login", this.creds);
      }
    }
  };
</script>

<style scoped>
  .action {
    cursor: pointer;
  }

  .login {
    text-align: center;
  }

  .registerform {
    margin-top: 116px;
  }

  .Logform {
    margin-top: -14px;
  }

  .emailI {
    margin-bottom: 6px;
    margin-top: 126px
  }

  span {
    font-size: 25px;
    text-shadow: 3px 2px black;
  }

  h3 {
    margin-top: 61px;
    color: #343a40;
    font-weight: bolder;
    animation: fa-spin 2s ease-in-out;
    font-size: 24px;
  }

  button {
    margin-top: 18px;
    margin-bottom: 5px;
  }

  .dots {
    color: black;
    font-size: 13px;
  }

  .col-12 {
    height: 41px;
  }
</style>