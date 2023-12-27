<template>
  <div >
    <b-container>
      <b-row class="justify-content-center">
        <b-col md="6">
          <b-card title="Activities Page" class="my-3">
            <b-card-text>
              This is the About Page.
            </b-card-text>
            <b-card-text>
              <ul>
                <li v-for="activity in activities" :key=activity.id>
                  {{activity.id}}: {{activity.description}} for {{activity.duration}} minutes
                </li>
              </ul>
            </b-card-text>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>

import axios from 'axios'
export default {
  name: 'htActivites',
  data() {
    return {
      activities: [],
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
    // Fetch user details using the ID from the route params
    this.fetchActivities();
  },
/*  watch: {
    $route: 'fetchActivities',
  },*/
  methods: {
    fetchActivities() {
      // Retrieve user ID from the route params
      const apiUrl = `http://localhost:7000/`;
      // Call your API with the user ID
      axios.get(apiUrl + `api/activities/${this.user.id}`)
          .then(res => {
            this.activities = res.data
          })
          .catch(() => alert("Error while fetching activities"));
    },
  },
};
</script>