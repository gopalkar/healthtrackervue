<template>
    <b-container class="custom-container">
      <b-row class="justify-content-center" lg="10" md="6">
          <b-card title="" class="bg-light my-10">
              <b-card-header>
                <b-row>
                  <b-col class="col-6">
                    <b>Nutritions</b>
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
                <b-form id="addNutrition" v-on:submit.prevent="handleSubmit" v-on:reset="clearForm">
                  <b-row lg="4">
                    <b-input-group size="sm" class="mb-3" prepend="Search Nutrient" >
                      <b-form-input id="input-1" v-model="formData.searchNutrient" type="text" placeholder="Search Nutrient"  />
                      <b-input-group-append>
                        <b-button rel="tooltip" title="Search" @click="searchNutrient(formData.searchNutrient)" class="btn btn-info btn-simple btn-link" >
                          <i class="fa fa-search" aria-hidden="true"></i>
                        </b-button>
                      </b-input-group-append>
                    </b-input-group>
                  </b-row>
                  <b-row>
                    <b-col>
                      <b-form-group id="input-group-1" label="Meal Time:" label-for="input-1" >
                        <b-form-input id="input-1" v-model="formData.macroDate" type="datetime-local" placeholder="Macro Date" required />
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <b-form-group id="input-group-1" label="Meal Period:" label-for="input-1" >
                        <b-form-select v-model="formData.partOfDay" :options="options" required/>
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <b-form-group id="input-group-1" label="Food Name:" label-for="input-1" >
                        <b-form-input id="input-1" v-model="formData.foodName" type="text" placeholder="Food Name" required />
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <b-form-group id="input-group-1" label="Calories:" label-for="input-1" >
                        <b-form-input id="input-1" v-model="formData.calories" type="number" step="0.01" placeholder="Calories" required />
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      <b-form-group id="input-group-1" label="Cholesterol:" label-for="input-1" >
                        <b-form-input id="input-1" v-model="formData.cholesterol" type="number" step="0.01" placeholder="Cholesterol" required />
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <b-form-group id="input-group-1" label="Protein:" label-for="input-1" >
                        <b-form-input id="input-1" v-model="formData.protein" type="number" step="0.01" placeholder="Protein" required />
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <b-form-group id="input-group-1" label="Fat:" label-for="input-1" >
                        <b-form-input id="input-1" v-model="formData.fat" type="number" step="0.01" placeholder="Fat" required />
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <b-form-group id="input-group-1" label="Fiber:" label-for="input-1" >
                        <b-form-input id="input-1" v-model="formData.fiber" type="number" step="0.01" placeholder="Fiber" required />
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <p></p>
                  <b-button type="submit" variant="primary">{{addupdate}}</b-button>
                  <span class="spacer"></span>
                  <b-button type="reset" variant="danger">Clear</b-button>
                </b-form>
              </b-card-body>
            <b-list-group v-if="foundNutritions" flush>
              <b-row><p></p></b-row>
              <b-row>
                <b-col lg="2">
                  <p>Meal Time</p>
                </b-col>
                <b-col lg="1">
                  <p>Meal Period</p>
                </b-col>
                <b-col lg="2">
                  <p>Food Name</p>
                </b-col>
                <b-col lg="1">
                  <p>Calories</p>
                </b-col>
                <b-col lg="1">
                  <p>Cholestrl</p>
                </b-col>
                <b-col lg="1">
                  <p>Protein</p>
                </b-col>
                <b-col lg="1">
                  <p>Fat</p>
                </b-col>
                <b-col lg="1">
                  <p>Fiber</p>
                </b-col>
                <b-col lg="2">
                  <p>Actions</p>
                </b-col>
              </b-row>
              <b-list-group-item v-for="(nutrition,index) in nutritions" v-bind:key="index">
<!--                <div class="mr-auto p-2">
                  <span><a :href="`/users/${nutrition.id}`"> {{ nutrition.description }} {{ nutrition.duration }}</a></span>
                </div>-->
                <b-row>
                  <b-col lg="2">
                    <p>{{formattedDateTime(nutrition.macroDate)}}</p>
                  </b-col>
                  <b-col lg="1">
                    <p>{{nutrition.partOfDay}}</p>
                  </b-col>
                  <b-col lg="2">
                    <p>{{nutrition.foodName}}</p>
                  </b-col>
                  <b-col lg="1">
                    <p>{{nutrition.calories}}</p>
                  </b-col>
                  <b-col lg="1">
                    <p>{{nutrition.cholesterol}}</p>
                  </b-col>
                  <b-col lg="1">
                    <p>{{nutrition.protein}}</p>
                  </b-col>
                  <b-col lg="1">
                    <p>{{nutrition.fat}}</p>
                  </b-col>
                  <b-col lg="1">
                    <p>{{nutrition.fiber}}</p>
                  </b-col>
                  <b-col lg="2">
                    <button rel="tooltip" title="Update" @click="updateForm(nutrition)" class="btn btn-info btn-simple btn-link">
                      <i class="fa fa-pencil" aria-hidden="true"></i>
                    </button>
                    <button rel="tooltip" title="Delete" @click="deleteNutrition(nutrition.id)" class="btn btn-info btn-simple btn-link">
                      <i class="fa fa-trash" aria-hidden="true"></i>
                    </button>
<!--                    <a :href="`/nutrition/${nutrition.id}`">
                      <button rel="tooltip" title="Update" class="btn btn-info btn-simple btn-link">
                        <i class="fa fa-pencil" aria-hidden="true"></i>
                      </button>
                    </a>
                    <a :href="`/nutrition/${nutrition.id}`">
                      <button rel="tooltip" title="Delete" class="btn btn-info btn-simple btn-link">
                        <i class="fa fa-trash" aria-hidden="true"></i>
                      </button>
                    </a>-->
                  </b-col>

                </b-row>
              </b-list-group-item>
            </b-list-group>
            <b-list-group v-if="!foundNutritions" variant="info">{{nutMessage}}</b-list-group>
          </b-card>
      </b-row>
    </b-container>
</template>

<script>

import axios from 'axios'
import moment from "moment/moment";
export default {
  name: 'htNutritions',
  data() {
    return {
      nutritions: [],
      nutrition: '',
      foodNutrient: '',
      user: [],
      formData: [],
      hideForm :true,
      addupdate: 'Add',
      nutritionId: 0,
      nutMessage: '',
      foundNutritions: false,
      options: [
        { value: null, text: 'Select' },
        { value: 'Breakfast', text: 'Breakfast' },
        { value: 'Lunch', text: 'Lunch' },
        { value: 'Dinner', text: 'Dinner' },
        { value: 'Snack', text: 'Snack' },
      ],
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
    this.fetchNutritions();
  },
/*  watch: {
    $route: 'fetchNutritions',
  },*/
  methods: {
    async fetchNutritions() {
      // Retrieve user ID from the route params
      //const apiUrl = `http://localhost:7000/`;
      const apiUrl = process.env.VUE_APP_API_URL;
      // Call your API with the user ID
      let today = new Date()
      let enddate = moment(today).format('YYYY-MM-DDTHH:mm:ss')
      let startdate = new Date(today.getFullYear() - 2, today.getMonth(), today.getDate());
      startdate = moment(startdate).format('YYYY-MM-DDTHH:mm:ss')
      // Call your API with the user ID
      await axios.get(apiUrl + `api/nutritions/${this.user.id}?start-date=${startdate}&end-date=${enddate}`)
          .then(res => {
            this.nutritions = res.data
            this.foundNutritions = true
          })
          .catch(error => {
            if (error.response.status === 404) {
              this.foundNutritions = false
              this.nutritions = []
              this.nutMessage = 'No Nutritions to report'
            }
            else {
              this.foundNutritions = false
              this.nutritions = []
              this.nutMessage = 'Error while fetching nutritions'
            }
          });
    },

    handleSubmit() {
      // Check the label of the submit button and perform actions accordingly
      if (this.addupdate === 'Add') {
        this.addNutrition();
      } else if (this.addupdate === 'Update') {
        this.updateNutrition();
      }
      // Add more conditions as needed
    },

    async addNutrition() {
      // Retrieve user ID from the route params
      //const apiUrl = `http://localhost:7000/`;
      const apiUrl = process.env.VUE_APP_API_URL;
      // Call your API with the user ID
      await axios.post(apiUrl + `api/nutritions`,
          {
            partOfDay: this.formData.partOfDay,
            foodName: this.formData.foodName,
            calories: this.formData.calories,
            cholesterol: this.formData.cholesterol,
            protein: this.formData.protein,
            fat: this.formData.fat,
            fiber: this.formData.fiber,
            macroDate: this.unFormattedDateTime(this.formData.macroDate.toLocaleString()),
            userId: this.user.id
          })
          .then(res => {
            console.log(res.status)
            this.hideForm= true;
            this.clearForm()
            this.fetchNutritions()
          })
          .catch(() => alert("Error while fetching nutritions"));
    },

    updateForm(nutrition) {
      if (this.hideForm === true) {
        this.formData.partOfDay = nutrition.partOfDay
        this.formData.foodName = nutrition.foodName
        this.formData.calories = nutrition.calories
        this.formData.cholesterol = nutrition.cholesterol
        this.formData.protein = nutrition.protein
        this.formData.fat = nutrition.fat
        this.formData.fiber = nutrition.fiber
        this.formData.macroDate = this.formattedDateTime(nutrition.macroDate)
        this.userId = nutrition.userId
        this.addupdate = 'Update'
        this.nutritionId = nutrition.id
        this.hideForm = false
      }
      else {
        this.clearForm()
        this.formData.partOfDay = nutrition.partOfDay
        this.formData.foodName = nutrition.foodName
        this.formData.calories = nutrition.calories
        this.formData.cholesterol = nutrition.cholesterol
        this.formData.protein = nutrition.protein
        this.formData.fat = nutrition.fat
        this.formData.fiber = nutrition.fiber
        this.formData.macroDate = this.formattedDateTime(nutrition.macroDate)
        this.userId = nutrition.userId
        this.addupdate = 'Update'
        this.nutritionId = nutrition.id
      }
    },

    async updateNutrition() {
      // Retrieve user ID from the route params
      //const apiUrl = `http://localhost:7000/`;
      const apiUrl = process.env.VUE_APP_API_URL;
      // Call your API with the user ID
      await axios.patch(apiUrl + `api/nutrition/${this.nutritionId}`,
          {
            partOfDay: this.formData.partOfDay,
            foodName: this.formData.foodName,
            calories: this.formData.calories,
            cholesterol: this.formData.cholesterol,
            protein: this.formData.protein,
            fat: this.formData.fat,
            fiber: this.formData.fiber,
            macroDate: this.unFormattedDateTime(this.formData.macroDate.toLocaleString()),
            userId: this.user.id
          })
          .then(res => {
            console.log(res.status)
            this.hideForm= true;
            this.clearForm()
            this.fetchNutritions()
          })
          .catch(() => alert("Error while fetching nutritions"));
    },

    async deleteNutrition(id) {
      //const apiUrl = `http://localhost:7000/`;
      const apiUrl = process.env.VUE_APP_API_URL;
      const url = apiUrl + `api/nutrition/${id}`
      await axios.delete(url)
          .then(response => {
            console.log(response.status)
            this.clearForm()
            this.fetchNutritions()
           })
          .catch(error => {
            console.log(error)
          })
    },

    async searchNutrient(searchQuery) {
      console.log(searchQuery)
      const apiUrl = process.env.VUE_APP_API_URL;
      await axios.get(apiUrl + `api/nutrition/search?searchQuery=${searchQuery}`)
          .then(res => {
            this.foodNutrient = res.data
            console.log(this.foodNutrient)
            console.log(res.data)
            this.clearForm()
            this.formData.searchNutrient = ''
            this.formData.foodName = searchQuery
            this.formData.calories = res.data.enerc_KCAL.toFixed(2)
            this.formData.cholesterol = res.data.chocdf.toFixed(2)
            this.formData.protein = res.data.procnt.toFixed(2)
            this.formData.fat = res.data.fat.toFixed(2)
            this.formData.fiber = res.data.fibtg.toFixed(2)
          })
          .catch(error => {
              console.log(error.message)
          });
    },
    clearForm() {
      this.formData = []
      this.addupdate = 'Add'
      this.nutritionId = 0
      //this.foundNutritions = false
      this.nutMessage = ''
    },

    formattedDateTime: function (nutritionDate) {
      const estDate = new Date(nutritionDate)
      const retDate = new Date(estDate.getTime() + estDate.getTimezoneOffset() * 60000);
      return moment(retDate).format('YYYY-MM-DD HH:mm:ss');
    },

    unFormattedDateTime (nutritionDate) {
      return moment(nutritionDate).format('YYYY-MM-DDTHH:mm:ss');
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