<template>
  <div>
    <b-container>
      <b-row class="justify-content-center">
        <b-col md="6">
          <b-card title="" class="my-3">
            <div class="card bg-light mb-3">
              <form class="form-group" @submit.prevent="addUser">
              <div class="card-header">
                <div class="row">
                  <div class="col-6"> User Profile </div>
                  <div class="col" align="right">
                    <button type="submit" rel="tooltip" title="Add"
                            class="btn btn-info btn-simple btn-link">
                      <i class="fa fa-floppy-o" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <form>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="input-user-name">Name</span>
                    </div>
                    <input type="text" class="form-control" v-model="user.name" name="name" placeholder="Name" required/>
                  </div>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="input-user-email">Email</span>
                    </div>
                    <input type="email" class="form-control" v-model="user.email" name="email" placeholder="Email" required/>
                  </div>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="input-user-email">Password</span>
                    </div>
                    <input type="password" class="form-control" v-model="password" name="password" placeholder="Password" required/>
                  </div>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="input-user-email">ConfirmPassword</span>
                    </div>
                    <input type="password" class="form-control" v-model="confPassword" name="confPassword" placeholder="ConfirmPassword" required/>
                    <p v-if="!passwordsMatch">Password not matching</p>
                  </div>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="input-user-gender">Gender</span>
                    </div>
                    <input type="text" class="form-control" v-model="user.gender" name="gender" placeholder="Gender" required/>
                  </div>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="input-user-birthdate">BirthDate</span>
                    </div>
                    <input type="date" class="form-control" v-model="user.birthDate" name="birthdate" placeholder="BirthDate"/>
                  </div>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="input-user-mobilenumber">MobileNumber</span>
                    </div>
                    <input type="text" class="form-control" v-model="user.mobileNumber" name="mobileNumber" placeholder="MobileNumber"/>
                  </div>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="input-user-dietpreferences">DietPreference</span>
                    </div>
                    <input type="text" class="form-control" v-model="user.dietPreferences" name="dietPreferences" placeholder="DietPreferences"/>
                  </div>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="input-user-height">Height</span>
                    </div>
                    <input type="number" class="form-control" v-model="user.height" name="height" placeholder="Height"/>
                  </div>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="input-user-weight">Weight</span>
                    </div>
                    <input type="number" class="form-control" v-model="user.weight" name="weight" placeholder="Weight"/>
                  </div>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="input-user-profession">Profession</span>
                    </div>
                    <input type="text" class="form-control" v-model="user.profession" name="profession" placeholder="Profession"/>
                  </div>
                </form>
              </div>
              </form>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>

import axios from 'axios'
export default {
  name: 'htUserSignUpPage',
  data() {
    return {
      user: [],
      password: '',
      confPassword: '',
    };
  },
  computed: {
    passwordsMatch() {
      return this.password === this.confPassword;
    },
  },
  mounted() {
  },
  methods: {
    async addUser() {
      //const apiUrl = `http://localhost:7000/`;
      const apiUrl = process.env.VUE_APP_API_URL;
      let url = apiUrl + `api/users/`
      await axios.post(url,
          {
            name: this.user.name,
            email: this.user.email,
            gender: this.user.gender,
            birthDate: this.user.birthDate.substring(0,10),
            mobileNumber: this.user.mobileNumber,
            dietPreferences: this.user.dietPreferences,
            height: this.user.height,
            weight: this.user.weight,
            profession: this.user.profession
          })
          .then(response => {
            console.log(response.status)
            this.user = response.data
          })
          .catch(error => {
            console.log(error)
          })
      url = apiUrl + `api/usercreds/`
      await axios.post(url,
          {
            userId: this.user.id,
            password: btoa(this.password)
          })
          .then(response => {
            console.log(response.status)
          })
          .catch(error => {
            console.log(error)
          })
      await this.$router.push('/')
    },
  },
};
</script>