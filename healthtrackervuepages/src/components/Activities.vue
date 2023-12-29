<template>
    <b-container class="custom-container">
      <b-row class="justify-content-center" lg="10" md="6">
          <b-card title="" class="bg-light my-10">
              <b-card-header>
                <b-row>
                  <b-col class="col-6">
                    <b>Activities</b>
                  </b-col>
                  <b-col align="right">
                    <button rel="tooltip" title="Add"
                            class="btn btn-info btn-simple btn-link"
                            @click="hideForm =!hideForm">
                      <i class="fa fa-plus" aria-hidden="true"></i>
                    </button>
                  </b-col>
                </b-row>
              </b-card-header>
              <b-card-body :class="{ 'd-none': hideForm}">
                <b-form id="addActivity" v-on:submit.prevent="handleSubmit" v-on:reset="clearForm">
                  <b-row>
                    <b-col>
                      <b-form-group id="input-group-1" label="Date:" label-for="input-1" >
                        <b-form-input id="input-1" v-model="formData.started" type="datetime-local" placeholder="Activity Date" required />
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <b-form-group id="input-group-1" label="Description:" label-for="input-1" >
                        <b-form-input id="input-1" v-model="formData.description" type="text" placeholder="Description" required />
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <b-form-group id="input-group-1" label="Duration:(Mins)" label-for="input-1" >
                        <b-form-input id="input-1" v-model="formData.duration" type="number" placeholder="Duration" required />
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <b-form-group id="input-group-1" label="Calories:" label-for="input-1" >
                        <b-form-input id="input-1" v-model="formData.calories" type="number" placeholder="Calories" required />
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <p></p>
                  <b-button type="submit" variant="primary">{{addupdate}}</b-button>
                  <span class="spacer"></span>
                  <b-button type="reset" variant="danger">Clear</b-button>
                </b-form>
              </b-card-body>
            <b-list-group v-if="foundActivities" flush>
              <b-row><p></p></b-row>
              <b-row>
                <b-col lg="3">
                  <p>Activity Date</p>
                </b-col>
                <b-col lg="2">
                  <p>Description</p>
                </b-col>
                <b-col lg="2">
                  <p>Activity Duration</p>
                </b-col>
                <b-col lg="2">
                  <p>Calories</p>
                </b-col>
                <b-col lg="2">
                  <p>Actions</p>
                </b-col>
              </b-row>
              <b-list-group-item v-for="(activity,index) in activities" v-bind:key="index">
<!--                <div class="mr-auto p-2">
                  <span><a :href="`/users/${activity.id}`"> {{ activity.description }} {{ activity.duration }}</a></span>
                </div>-->
                <b-row>
                  <b-col lg="3">
                    <p>{{formattedDateTime(activity.started)}}</p>
                  </b-col>
                  <b-col lg="2">
                    <p>{{activity.description}}</p>
                  </b-col>
                  <b-col lg="2">
                    <p>{{activity.duration}}</p>
                  </b-col>
                  <b-col lg="2">
                    <p>{{activity.calories}}</p>
                  </b-col>
                  <b-col lg="2">
                    <button rel="tooltip" title="Update" @click="updateForm(activity)" class="btn btn-info btn-simple btn-link">
                      <i class="fa fa-pencil" aria-hidden="true"></i>
                    </button>
                    <button rel="tooltip" title="Delete" @click="deleteActivity(activity.id)" class="btn btn-info btn-simple btn-link">
                      <i class="fa fa-trash" aria-hidden="true"></i>
                    </button>
<!--                    <a :href="`/activity/${activity.id}`">
                      <button rel="tooltip" title="Update" class="btn btn-info btn-simple btn-link">
                        <i class="fa fa-pencil" aria-hidden="true"></i>
                      </button>
                    </a>
                    <a :href="`/activity/${activity.id}`">
                      <button rel="tooltip" title="Delete" class="btn btn-info btn-simple btn-link">
                        <i class="fa fa-trash" aria-hidden="true"></i>
                      </button>
                    </a>-->
                  </b-col>

                </b-row>
              </b-list-group-item>
            </b-list-group>
            <b-list-group v-if="!foundActivities" variant="info">{{actMessage}}</b-list-group>
          </b-card>
      </b-row>
    </b-container>
</template>

<script>

import axios from 'axios'
import moment from "moment/moment";
export default {
  name: 'htActivites',
  data() {
    return {
      activities: [],
      activity: '',
      user: [],
      formData: [],
      hideForm :true,
      addupdate: 'Add',
      activityId: 0,
      actMessage: '',
      foundActivities: false,
    };
  },
  computed: {
    userFound() {
      return this.$store.state.isAuthenticated;
    },
  },
  mounted() {
    this.user = this.$store.state.user
    // Fetch user details using the ID from the route params
    this.fetchActivities();
  },
/*  watch: {
    $route: 'fetchActivities',
  },*/
  methods: {
    async fetchActivities() {
      // Retrieve user ID from the route params
      //const apiUrl = `http://localhost:7000/`;
      const apiUrl = process.env.VUE_APP_API_URL;
      // Call your API with the user ID
      await axios.get(apiUrl + `api/activities/${this.user.id}`)
          .then(res => {
            this.activities = res.data
            this.foundActivities = true
          })
          .catch(error => {
            if (error.response.status === 404) {
              this.foundActivities = false
              this.activities = []
              this.actMessage = 'No Activities to report'
            }
            else {
              this.foundActivities = false
              this.activities = []
              this.actMessage = 'Error while fetching activities'
            }
          });
    },
    handleSubmit() {
      // Check the label of the submit button and perform actions accordingly
      if (this.addupdate === 'Add') {
        this.addActivity();
      } else if (this.addupdate === 'Update') {
        this.updateActivity();
      }
      // Add more conditions as needed
    },
    async addActivity() {
      // Retrieve user ID from the route params
      //const apiUrl = `http://localhost:7000/`;
      const apiUrl = process.env.VUE_APP_API_URL;
      // Call your API with the user ID
      await axios.post(apiUrl + `api/activities`,
          {
            description: this.formData.description,
            duration: this.formData.duration,
            calories: this.formData.calories,
            started: this.formData.started.toLocaleString(),
            userId: this.user.id
          })
          .then(res => {
            console.log(res.status)
            this.hideForm= true;
            this.clearForm()
            this.fetchActivities()
          })
          .catch(() => alert("Error while fetching activities"));
    },
    updateForm(activity) {
      if (this.hideForm === true) {
        this.formData.description = activity.description
        this.formData.duration = activity.duration
        this.formData.calories = activity.calories
        this.formData.started = this.formattedDateTime(activity.started)
        this.userId = activity.userId
        this.addupdate = 'Update'
        this.activityId = activity.id
        this.hideForm = false
      }
      else {
        this.clearForm()
        this.formData.description = activity.description
        this.formData.duration = activity.duration
        this.formData.calories = activity.calories
        this.formData.started = this.formattedDateTime(activity.started)
        this.userId = activity.userId
        this.addupdate = 'Update'
        this.activityId = activity.id
      }

    },
    async updateActivity() {
      // Retrieve user ID from the route params
      //const apiUrl = `http://localhost:7000/`;
      const apiUrl = process.env.VUE_APP_API_URL;
      // Call your API with the user ID
      await axios.patch(apiUrl + `api/activity/${this.activityId}`,
          {
            description: this.formData.description,
            duration: this.formData.duration,
            calories: this.formData.calories,
            started: this.unFormattedDateTime(this.formData.started.toLocaleString()),
            userId: this.user.id
          })
          .then(res => {
            console.log(res.status)
            this.hideForm= true;
            this.clearForm()
            this.fetchActivities()
          })
          .catch(() => alert("Error while fetching activities"));
    },
    async deleteActivity(id) {
      //const apiUrl = `http://localhost:7000/`;
      const apiUrl = process.env.VUE_APP_API_URL;
      const url = apiUrl + `api/activity/${id}`
      await axios.delete(url)
          .then(response => {
            console.log(response.status)
            this.clearForm()
            this.fetchActivities()
           })
          .catch(error => {
            console.log(error)
          })
    },

    clearForm() {
      this.formData = []
      this.addupdate = 'Add'
      this.activityId = 0
      //this.foundActivities = false
      this.actMessage = ''
    },

    formattedDateTime: function (activityDate) {
      const estDate = new Date(activityDate)
      const retDate = new Date(estDate.getTime() + estDate.getTimezoneOffset() * 60000);
      return moment(retDate).format('YYYY-MM-DD HH:mm:ss');
    },

    unFormattedDateTime (activityDate) {
      return moment(activityDate).format('YYYY-MM-DDTHH:mm:ss');
    },
  },
};
</script>

<style>
.custom-container {
  max-width: 1200px; /* Adjust the maximum width as needed */
  margin-right: auto;
  margin-left: auto;
}

.spacer {
  display: inline-block;
  width: 16px; /* Adjust the width as needed */
}
</style>