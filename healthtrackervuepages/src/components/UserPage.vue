<template>
  <div>
    <b-container>
      <b-row class="justify-content-center">
        <b-col md="6">
          <b-card title="" class="my-3">
            <div class="card bg-light mb-3" v-if="userFound">
              <div class="card-header">
                <div class="row">
                  <div class="col-6"> User Profile </div>
                  <div class="col" align="right">
                    <button rel="tooltip" title="Update"
                            class="btn btn-info btn-simple btn-link"
                            @click="updateUser()">
                      <i class="fa fa-floppy-o" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <form>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="input-user-id">User ID</span>
                    </div>
                    <input type="number" class="form-control" v-model="user.id" name="userid" readonly placeholder="Id"/>
                  </div>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="input-user-name">Name</span>
                    </div>
                    <input type="text" class="form-control" v-model="user.name" name="name" placeholder="Name"/>
                  </div>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="input-user-email">Email</span>
                    </div>
                    <input type="email" class="form-control" v-model="user.email" name="email" placeholder="Email"/>
                  </div>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="input-user-gender">Gender</span>
                    </div>
                    <input type="text" class="form-control" v-model="user.gender" name="gender" placeholder="Gender"/>
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
  name: 'htUserPage',
  data() {
    return {
      user: [],
    };
  },
  computed: {
    userFound() {
      return this.$store.state.isAuthenticated;
    },
  },
  mounted() {
    this.user = this.$store.state.user
    this.user.birthDate = this.user.birthDate.substring(0,10)
    console.log('StoredUser: ' + this.user.id)
  },
  methods: {
    updateUser: function () {
      //const apiUrl = `http://localhost:7000/`;
      const apiUrl = process.env.VUE_APP_API_URL;
      const userId = this.user.id;
      const url = apiUrl + `api/users/${userId}`
      axios.patch(url,
          {
            name: this.user.name,
            email: this.user.email,
            gender: this.user.gender,
            birthDate: this.user.birthDate,
            mobileNumber: this.user.mobileNumber,
            dietPreferences: this.user.dietPreferences,
            height: this.user.height,
            weight: this.user.weight,
            profession: this.user.profession
          })
          .then(response => {
            this.$store.dispatch('loginUser', this.user );
            console.log(response.status)
          })
          .catch(error => {
            console.log(error)
          })
    },
  },
};
</script>