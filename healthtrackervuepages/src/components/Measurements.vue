<template>
    <b-container class="custom-container">
          <b-card title="" class="bg-light w-100">
              <b-card-header >
                <b-row>
                  <b-col class="col-6">
                    <b>Measurements</b>
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
              <b-card-body :class="{ 'd-none': hideForm}" >
                <b-form id="addMeasurement" v-on:submit.prevent="handleSubmit" v-on:reset="clearForm">
                  <b-row>
                    <b-col>
                      <b-form-group id="input-group-1" label="Date:" label-for="input-1" >
                        <b-form-input id="input-1" v-model="formData.measuredDate" type="datetime-local" step="0.01" placeholder="Measurement Date" required />
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <b-form-group id="input-group-1" label="Weight(lb):" label-for="input-1" >
                        <b-form-input id="input-1" v-model="formData.weight" type="number" step="0.01" placeholder="Weight" required />
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <b-form-group id="input-group-1" label="Chest(in)" label-for="input-1" >
                        <b-form-input id="input-1" v-model="formData.chest" type="number" step="0.01" placeholder="Chest" required />
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <b-form-group id="input-group-1" label="Neck(in):" label-for="input-1" >
                        <b-form-input id="input-1" v-model="formData.neck" type="number" step="0.01" placeholder="Neck" required />
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <b-form-group id="input-group-1" label="Bicep(in):" label-for="input-1" >
                        <b-form-input id="input-1" v-model="formData.bicep" type="number" step="0.01" placeholder="Bicep" required />
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <p></p>
                  <b-row>
                    <b-col>
                      <b-form-group id="input-group-1" label="Waist(in):" label-for="input-1" >
                        <b-form-input id="input-1" v-model="formData.abdomen" type="number" step="0.01" placeholder="Waist" required />
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <b-form-group id="input-group-1" label="HighHip(in):" label-for="input-1" >
                        <b-form-input id="input-1" v-model="formData.waist" type="number" step="0.01" placeholder="HighHip" required />
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <b-form-group id="input-group-1" label="Hip(in):" label-for="input-1" >
                        <b-form-input id="input-1" v-model="formData.lowerWaist" type="number" step="0.01" placeholder="Hip" required />
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <b-form-group id="input-group-1" label="Thigh(in):" label-for="input-1" >
                        <b-form-input id="input-1" v-model="formData.thigh" type="number" step="0.01" placeholder="Thigh" required />
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <b-form-group id="input-group-1" label="Calves(in):" label-for="input-1" >
                        <b-form-input id="input-1" v-model="formData.calves" type="number" step="0.01" placeholder="Calves" required />
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <p></p>
                  <b-button type="submit" variant="primary">{{addupdate}}</b-button>
                  <span class="spacer"></span>
                  <b-button type="reset" variant="danger">Clear</b-button>
                </b-form>
              </b-card-body>
            <b-list-group v-if="foundMeasurements" flush>
              <b-row><p></p></b-row>
              <b-row lg="1">
                <b-col lg="2">
                  <p>Measured Date</p>
                </b-col>
                <b-col lg="1">
                  <p>Weight</p>
                </b-col>
                <b-col lg="1">
                  <p>Chest</p>
                </b-col>
                <b-col lg="1">
                  <p>Neck</p>
                </b-col>
                <b-col lg="1">
                  <p>Bicep</p>
                </b-col>
                <b-col lg="1">
                  <p>Waist</p>
                </b-col>
                <b-col lg="1">
                  <p>HighHip</p>
                </b-col>
                <b-col lg="1">
                  <p>Hip</p>
                </b-col>
                <b-col lg="1">
                  <p>Thigh</p>
                </b-col>
                <b-col lg="1">
                  <p>Calves</p>
                </b-col>
                <b-col lg="1">
                  <p>Actions</p>
                </b-col>
              </b-row>
              <b-list-group-item v-for="(measurement,index) in measurements" v-bind:key="index">
<!--                <div class="mr-auto p-2">
                  <span><a :href="`/users/${measurement.id}`"> {{ measurement.description }} {{ measurement.duration }}</a></span>
                </div>-->
                <b-row>
                  <b-col lg="2">
                    <p>{{formattedDateTime(measurement.measuredDate)}}</p>
                  </b-col>
                  <b-col lg="1">
                    <p>{{measurement.weight}}</p>
                  </b-col>
                  <b-col lg="1">
                    <p>{{measurement.chest}}</p>
                  </b-col>
                  <b-col lg="1">
                    <p>{{measurement.neck}}</p>
                  </b-col>
                  <b-col lg="1">
                    <p>{{measurement.bicep}}</p>
                  </b-col>
                  <b-col lg="1">
                    <p>{{measurement.abdomen}}</p>
                  </b-col>
                  <b-col lg="1">
                    <p>{{measurement.waist}}</p>
                  </b-col>
                  <b-col lg="1">
                    <p>{{measurement.lowerWaist}}</p>
                  </b-col>
                  <b-col lg="1">
                    <p>{{measurement.thigh}}</p>
                  </b-col>
                  <b-col lg="1">
                    <p>{{measurement.calves}}</p>
                  </b-col>
                  <b-col lg="1">
                    <button rel="tooltip" title="Update" @click="updateForm(measurement)" class="btn btn-info btn-simple btn-link">
                      <i class="fa fa-pencil" aria-hidden="true"></i>
                    </button>
                    <button rel="tooltip" title="Delete" @click="deleteMeasurement(measurement.id)" class="btn btn-info btn-simple btn-link">
                      <i class="fa fa-trash" aria-hidden="true"></i>
                    </button>
<!--                    <a :href="`/measurement/${measurement.id}`">
                      <button rel="tooltip" title="Update" class="btn btn-info btn-simple btn-link">
                        <i class="fa fa-pencil" aria-hidden="true"></i>
                      </button>
                    </a>
                    <a :href="`/measurement/${measurement.id}`">
                      <button rel="tooltip" title="Delete" class="btn btn-info btn-simple btn-link">
                        <i class="fa fa-trash" aria-hidden="true"></i>
                      </button>
                    </a>-->
                  </b-col>

                </b-row>
              </b-list-group-item>
            </b-list-group>
            <b-list-group v-if="!foundMeasurements" variant="info">{{mesMessage}}</b-list-group>
          </b-card>
    </b-container>
</template>

<script>

import axios from 'axios'
import moment from "moment/moment";
export default {
  name: 'htMeasurementsPage',
  data() {
    return {
      measurements: [],
      measurement: '',
      user: [],
      formData: [],
      hideForm :true,
      addupdate: 'Add',
      measurementId: 0,
      mesMessage: '',
      foundMeasurements: false,
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
    this.fetchMeasurements();
  },
/*  watch: {
    $route: 'fetchMeasurements',
  },*/
  methods: {
    async fetchMeasurements() {
      // Retrieve user ID from the route params
      //const apiUrl = `http://localhost:7000/`;
      const apiUrl = process.env.VUE_APP_API_URL;
      let today = new Date()
      let enddate = moment(today).format('YYYY-MM-DDTHH:mm:ss')
      let startdate = new Date(today.getFullYear() - 2, today.getMonth(), today.getDate());
      startdate = moment(startdate).format('YYYY-MM-DDTHH:mm:ss')
      // Call your API with the user ID
      await axios.get(apiUrl + `api/measurements/${this.user.id}?start-date=${startdate}&end-date=${enddate}`)
          .then(res => {
            this.measurements = res.data
            this.foundMeasurements = true
          })
          .catch(error => {
            if (error.response.status === 404) {
              this.measurements = []
              this.foundMeasurements = false
              this.mesMessage = 'No Measurements to report'
            }
            else {
              this.measurements = []
              this.foundMeasurements = false
              this.mesMessage = 'Error while fetching measurements'
            }
          });
    },
    handleSubmit() {
      // Check the label of the submit button and perform actions accordingly
      if (this.addupdate === 'Add') {
        this.addMeasurement();
      } else if (this.addupdate === 'Update') {
        this.updateMeasurement();
      }
      // Add more conditions as needed
    },
    async addMeasurement() {
      // Retrieve user ID from the route params
      //const apiUrl = `http://localhost:7000/`;
      const apiUrl = process.env.VUE_APP_API_URL;
      // Call your API with the user ID
      await axios.post(apiUrl + `api/measurements`,
          {
            weight: this.formData.weight,
            chest: this.formData.chest,
            bicep: this.formData.bicep,
            neck: this.formData.neck,
            abdomen: this.formData.abdomen,
            waist: this.formData.waist,
            lowerWaist: this.formData.lowerWaist,
            thigh: this.formData.thigh,
            calves: this.formData.calves,
            measuredDate: this.formData.measuredDate.toLocaleString(),
            userId: this.user.id
          })
          .then(res => {
            console.log(res.status)
            this.hideForm= true;
            this.clearForm()
            this.fetchMeasurements()
          })
          .catch(() => alert("Error while fetching measurements"));
    },
    updateForm(measurement) {
      if (this.hideForm === true) {
        this.formData.weight = measurement.weight
        this.formData.chest = measurement.chest
        this.formData.bicep = measurement.bicep
        this.formData.neck = measurement.neck
        this.formData.abdomen = measurement.abdomen
        this.formData.waist = measurement.waist
        this.formData.lowerWaist = measurement.lowerWaist
        this.formData.thigh = measurement.thigh
        this.formData.calves = measurement.calves
        this.formData.measuredDate = this.formattedDateTime(measurement.measuredDate)
        this.userId = measurement.userId
        this.addupdate = 'Update'
        this.measurementId = measurement.id
        this.hideForm = false
      }
      else {
        this.clearForm()
        this.formData.weight = measurement.weight
        this.formData.chest = measurement.chest
        this.formData.bicep = measurement.bicep
        this.formData.neck = measurement.neck
        this.formData.abdomen = measurement.abdomen
        this.formData.waist = measurement.waist
        this.formData.lowerWaist = measurement.lowerWaist
        this.formData.thigh = measurement.thigh
        this.formData.calves = measurement.calves
        this.formData.measuredDate = this.formattedDateTime(measurement.measuredDate)
        this.userId = measurement.userId
        this.addupdate = 'Update'
        this.measurementId = measurement.id
      }

    },
    async updateMeasurement() {
      // Retrieve user ID from the route params
      //const apiUrl = `http://localhost:7000/`;
      const apiUrl = process.env.VUE_APP_API_URL;
      // Call your API with the user ID
      await axios.patch(apiUrl + `api/measurement/${this.measurementId}`,
          {
            weight: this.formData.weight,
            chest: this.formData.chest,
            bicep: this.formData.bicep,
            neck: this.formData.neck,
            abdomen: this.formData.abdomen,
            waist: this.formData.waist,
            lowerWaist: this.formData.lowerWaist,
            thigh: this.formData.thigh,
            calves: this.formData.calves,
            measuredDate: this.unFormattedDateTime(this.formData.measuredDate.toLocaleString()),
            userId: this.user.id
          })
          .then(res => {
            console.log(res.status)
            this.hideForm= true;
            this.clearForm()
            this.fetchMeasurements()
          })
          .catch(() => alert("Error while fetching measurements"));
    },
    async deleteMeasurement(id) {
      //const apiUrl = `http://localhost:7000/`;
      const apiUrl = process.env.VUE_APP_API_URL;
      const url = apiUrl + `api/measurement/${id}`
      await axios.delete(url)
          .then(response => {
            console.log(response.status)
            this.clearForm()
            this.fetchMeasurements()
           })
          .catch(error => {
            console.log(error)
          })
    },

    clearForm() {
      this.formData = []
      this.addupdate = 'Add'
      this.measurementId = 0
      //this.foundMeasurements = false
      this.mesMessage = ''
    },

    formattedDateTime: function (measurementDate) {
      const estDate = new Date(measurementDate)
      const retDate = new Date(estDate.getTime() + estDate.getTimezoneOffset() * 60000);
      return moment(retDate).format('YYYY-MM-DD HH:mm:ss');
    },

    unFormattedDateTime (measurementDate) {
      return moment(measurementDate).format('YYYY-MM-DDTHH:mm:ss');
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