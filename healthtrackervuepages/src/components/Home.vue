<template>
  <div>
    <b-container>
      <b-row class="justify-content-center">
        <b-col md="6">
          <b-card title="Welcome to the Health Tracker Application" class="my-3">
            <b-card-text>
              As per your current BMI, your recommended idle daily calorie limit is
              <b>{{dailyCalories}}</b>
            </b-card-text>
          </b-card>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="5">
          <b-card title="Recent Activities" class="my-3">
            <b-card-img src='https://www.cdc.gov/chronicdisease/resources/infographic/images/activity/150-minutes.PNG?_=62507' width="200" height="300"></b-card-img>
            <b-card-text>
              <p></p>
              <ul>
                <li v-for="activity in activities" :key=activity.id>
                  <b>{{formattedDateTime(activity.started)}}:</b> {{activity.description}} for {{activity.duration}} minutes
                </li>
              </ul>
            </b-card-text>
          </b-card>
        </b-col>
        <b-col md="5">
          <b-card title="Latest Measurement" class="my-3">
            <b-card-img src='https://www.shutterstock.com/image-vector/male-size-chart-anatomy-human-600nw-1772389046.jpg' width="200" height="300"></b-card-img>
            <b-card-text>
              <div class="row">
                <div class="column-gap-1">
                  <p><b>Measured Date:</b> {{ this.measurement.measuredDate }}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-4">
                  <p><b>Weight:</b> {{this.measurement.weight}}</p>
                </div>
                <div class="col-md-4">
                  <p><b>Chest:</b> {{this.measurement.chest}}</p>
                </div>
                <div class="col-md-4">
                  <p><b>Neck:</b> {{this.measurement.neck}}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-4">
                  <p><b>Waist:</b> {{this.measurement.abdomen}}</p>
                </div>
                <div class="col-md-4">
                  <p><b>Hip:</b> {{this.measurement.waist}}</p>
                </div>
                <div class="col-md-4">
                  <p><b>HighHip:</b> {{this.measurement.lowerWaist}}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-4">
                  <p><b>Bicep:</b> {{this.measurement.bicep}}</p>
                </div>
                <div class="col-md-4">
                  <p><b>Thigh:</b> {{this.measurement.thigh}}</p>
                </div>
                <div class="col-md-4">
                  <p><b>Calves:</b> {{this.measurement.calves}}</p>
                </div>
              </div>
            </b-card-text>
          </b-card>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="10">
          <b-card title="Nutrition Trend" class="my-3">
            <div class="row no-gutters">
            <div class="col-md-4">
              <b-card-img src='https://media.istockphoto.com/id/146807105/photo/food-pyramid-pie-chart.jpg?s=612x612&w=0&k=20&c=SX0hFBaED3Wwi0G2pLfhsYN1GRjlyK8wzqHf-qUyJOk=' width="200" height="300"></b-card-img>
            </div>
            <div class="col-md-6">
            <b-card-text>
              <p></p>
              <div v-for="(group, key) in groupedData" :key="key">
                <h3>{{ key }}</h3>
                <ul>
                    Total Calories - {{ group[0].total }}
                </ul>
              </div>
            </b-card-text>
            </div>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
import moment from 'moment';
export default {
  name: 'htHome',
  data() {
    return {
      user: [],
      activities: [],
      dailyCalories: 0,
      measurements: [],
      measurement: '',
      nutritions: [],
    };
  },
  computed: {
    groupedData() {
      // Group the data by the 'category' property
      const grouped = this.nutritions.reduce((result, item) => {
        const key = item.macroDate.substring(0,10);
        if (!result[key]) {
          result[key] = [];
        }
        result[key].push(item);
        return result;
      }, {});

      // Calculate the sum of the 'value' property within each group
      Object.keys(grouped).forEach((key) => {
        grouped[key].forEach((item) => {
          item.total = grouped[key].reduce((sum, currentItem) => sum + currentItem.calories, 0);
        });
      });

      return grouped;
    },
  },
  mounted() {
    this.user = this.$store.state.user
    this.user.birthDate = this.user.birthDate.substring(0,10)
    const birthdate = new Date(this.user.birthDate)
    const today = new Date();
    const age = today.getFullYear() - birthdate.getFullYear();
    if (this.user.gender === 'Male') {
      this.dailyCalories = Math.ceil(66.47 + (6.24 * this.user.weight) + (12.77 * this.user.height) - (6.755 * age))
    }
    else {
      this.dailyCalories = Math.ceil(655.1 + (4.35 * this.user.weight) + (4.7 * this.user.height) - (4.7 * age))
    }
    this.fetchActivities();
    this.fetchMeasurements();
    this.fetchNutritions();
  },
  methods: {
    async fetchActivities() {
      // Retrieve user ID from the route params
      //const apiUrl = `http://localhost:7000/`;
      const apiUrl = process.env.VUE_APP_API_URL;
      // Call your API with the user ID
      await axios.get(apiUrl + `api/activities/${this.user.id}`)
          .then(res => {
            this.activities = res.data
          })
          .catch(() => alert("Error while fetching activities"));
    },
    async fetchMeasurements() {
      const apiUrl = process.env.VUE_APP_API_URL;
      let today = new Date()
      let enddate = moment(today).format('YYYY-MM-DDTHH:mm:ss')
      let startdate = new Date(today.getFullYear() - 2, today.getMonth(), today.getDate());
      startdate = moment(startdate).format('YYYY-MM-DDTHH:mm:ss')
      // Call your API with the user ID
      await axios.get(apiUrl + `api/measurements/${this.user.id}?start-date=${startdate}&end-date=${enddate}`)
          .then(res => {
            this.measurements = res.data
            this.measurement = this.measurements[0]
            this.measurement.measuredDate = this.measurement.measuredDate.substring(0,10)
          })
          .catch(() => alert("Error while fetching measurements"));
    },
    async fetchNutritions() {
      const apiUrl = process.env.VUE_APP_API_URL;
      let today = new Date()
      let enddate = moment(today).format('YYYY-MM-DDTHH:mm:ss')
      let startdate = new Date(today.getFullYear() - 2, today.getMonth(), today.getDate());
      startdate = moment(startdate).format('YYYY-MM-DDTHH:mm:ss')
      // Call your API with the user ID
      await axios.get(apiUrl + `api/nutritions/${this.user.id}?start-date=${startdate}&end-date=${enddate}`)
          .then(res => {
            this.nutritions = res.data
          })
          .catch(() => alert("Error while fetching nutritions"));
    },
    formattedDateTime: function (activityDate) {
      return moment(activityDate).format('YYYY-MM-DD HH:mm:ss');
    }
  },
};
</script>
