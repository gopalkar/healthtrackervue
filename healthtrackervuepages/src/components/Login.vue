<template>
  <div>
    <b-container>
      <b-row class="justify-content-center">
        <b-col md="6">
          <b-card title="" class="my-3" align="center">
            <div v-if="!loggedIn" class="login-card">
              <div class="container">
                <div class="row">
                    <h3>Sign In</h3>
                    <form class="form-group" @submit.prevent="doLogin">
                      <input type="email" v-model="username" class="form-control" placeholder="UserName" id="username" required><p></p>
                      <input type="password" v-model="password"  class="form-control" placeholder="Password" id="password" required><p></p>
                      <input type="submit" class="btn btn-primary"><p></p>
                      <div v-if="loginFailed">
                        <p>{{message}}</p>
                      </div>
                      <p>Don't have an account? <router-link to="/signup" >Sign up here</router-link>
                      </p>
                      <p><router-link to="/forgotpwd" >Forgot your password?</router-link></p>
                    </form>
                </div>
              </div>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>

//import axios from 'axios'
import axios from "axios";

export default {
  name: 'htLogin',
  data() {
    return {
      username: '',
      password: '',
      userFound: false,
      loggedIn: false,
      loginFailed: false,
      user: '',
      userCred: '',
      message:'',
    };
  },
  /*mounted() {
    // Fetch user details using the ID from the route params
    this.fetchLogin();
  },*/
/*  watch: {
    $route: 'fetchLogin',
  },*/
  methods: {
    doLogin: function () {
/*      this.userFound = false
      this.loggedIn = false
      this.loginFailed = false
      this.user = ''
      this.userCred = ''*/
      console.log(`Logging in with: ${this.username} and ${this.password}`);
      this.fetchLogin(this.username, this.password)
    },
    async fetchLogin (username, password) {

      const apiUrl = `http://localhost:7000/`;
      // Call your API with the user ID
      await axios.get(apiUrl + `api/users/email/${username}`)
          .then(res => {
            console.log('userName' + username)
            this.userFound = true
            this.user = res.data
          })
          .catch(() => {
            //alert("Error while fetching User")
            console.log('Error while fetching User')
          });
      console.log('finding userCred: ' + this.user.id + 'userFound' + this.userFound)
      if (this.userFound === true) {
        console.log('finding userCred: ' + this.user.id)
        await axios.get(apiUrl + `api/usercreds/${this.user.id}`)
            .then(res => {
              this.userCred = res.data
            })
            .catch(() => {
              console.log('Error while fetching UserCred')
            });
        console.log('UserCred'+atob(this.userCred.password))
        if (atob(this.userCred.password) === password) {
          this.loggedIn = true
          // Update the user in the Vuex store
          await this.$store.dispatch('authenticateUser', true);
          await this.$store.dispatch('loginUser', this.user );
          await this.$router.push({ name: 'homepage' });
        }
        else
          this.loginFailed = true
          this.message = 'Login Failed, try again'
      }
      else {
        this.loginFailed = true
        this.message = 'User Account Not found'
      }
    }
  },
};
</script>